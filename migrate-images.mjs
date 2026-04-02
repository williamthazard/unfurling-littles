import dotenv from 'dotenv';
dotenv.config();

const ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID || '6866aa970031dffbf81b';
const API_KEY = process.env.APPWRITE_API_KEY;
const BUCKET_ID = 'unfurling-images';

if (!API_KEY) {
  console.error('❌ Error: APPWRITE_API_KEY is not defined in .env');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const storage = new Storage(client);

async function downloadImage(url, index) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });

    if (!response.ok) {
       console.log(`Failed to d/l ${url}: ${response.statusText}`);
       return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Determine extension from content-type or URL
    const contentType = response.headers.get('content-type') || '';
    let ext = 'jpg';
    if (contentType.includes('png')) ext = 'png';
    else if (contentType.includes('webp')) ext = 'webp';
    else if (contentType.includes('avif')) ext = 'avif';

    return { buffer, extension: ext, name: `image_${index}_${Date.now()}` };
  } catch (err) {
    console.error(`Error downloading ${url}:`, err);
    return null;
  }
}

async function migrate() {
  console.log("Checking storage bucket...");
  try {
    await storage.getBucket(BUCKET_ID);
    console.log("✅ Bucket exists.");
  } catch (err) {
    if (err.code === 404) {
      console.log("Bucket not found, creating it...");
      // Import Permission and Role dynamically or statically
      const { Permission, Role } = await import('node-appwrite');
      await storage.createBucket(
        BUCKET_ID,
        'Unfurling Images',
        [
          Permission.read(Role.any()),
          Permission.create(Role.any()),
          Permission.update(Role.any()),
          Permission.delete(Role.any())
        ],
        false, true, undefined, ['jpg', 'png', 'webp', 'jpeg', 'avif', 'gif']
      );
      console.log("✅ Bucket created.");
    } else {
      console.error("Error accessing bucket:", err);
      return;
    }
  }

  const contentPath = 'src/data/defaultContent.ts';
  let content = fs.readFileSync(contentPath, 'utf8');

  // Find all wixstatic URLs
  const urlRegex = /https:\/\/static\.wixstatic\.com\/media\/[^"'\s]+/g;
  const matches = [...new Set(content.match(urlRegex) || [])];
  
  console.log(`Found ${matches.length} unique Wix URLs to migrate.`);

  let index = 0;
  for (const url of matches) {
    index++;
    console.log(`[${index}/${matches.length}] Processing: ${url}`);
    
    // Download
    const imgData = await downloadImage(url, index);
    if (!imgData) continue;

    // Upload to Appwrite
    try {
      // InputFile.fromBuffer expects Buffer natively in JS
      const file = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        InputFile.fromBuffer(imgData.buffer, `${imgData.name}.${imgData.extension}`)
      );
      
      // Get preview URL
      const appwriteUrl = `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`;
      
      // Replace exactly in string
      content = content.replaceAll(url, appwriteUrl);
      console.log(`   -> Uploaded to Appwrite: ${file.$id}`);
      
    } catch (err) {
      console.error(`   -> Appwrite upload failed:`, err.message);
    }
  }

  // Save back to file
  fs.writeFileSync(contentPath, content);
  console.log('\n✅ defaultContent.ts has been updated with Appwrite native URLs!');
}

migrate().catch(console.error);
