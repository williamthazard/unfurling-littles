// Setup script for Appwrite backend
// Run with: node setup-appwrite.mjs

import dotenv from 'dotenv';
dotenv.config();

const ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID || '6866aa970031dffbf81b';
const API_KEY = process.env.APPWRITE_API_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'UnfurlingAdmin2024!';

const DATABASE_ID = '6872c4370036255a902b';

if (!API_KEY) {
  console.error('❌ Error: APPWRITE_API_KEY is not defined in .env');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);

async function setup() {
  console.log('Setting up Appwrite backend for Unfurling Littles...\n');

  // 1. Create collection for site content (single document per page)
  try {
    const col = await databases.createCollection(
      DATABASE_ID,
      'unfurling-pages',
      'Unfurling Pages',
      [
        'read("any")',
        'create("users")',
        'update("users")',
        'delete("users")',
      ],
      false // documentSecurity
    );
    console.log('✅ Created collection: Unfurling Pages', col.$id);
  } catch (e) {
    if (e.code === 409) console.log('⏭️  Collection unfurling-pages already exists');
    else throw e;
  }

  // Add attributes to the pages collection
  const pageAttributes = [
    { key: 'pageId', type: 'string', size: 50, required: true },
    { key: 'content', type: 'string', size: 1000000, required: true }, // JSON blob
    { key: 'updatedAt', type: 'string', size: 50, required: false },
  ];

  for (const attr of pageAttributes) {
    try {
      await databases.createStringAttribute(
        DATABASE_ID,
        'unfurling-pages',
        attr.key,
        attr.size,
        attr.required,
      );
      console.log(`✅ Created attribute: ${attr.key}`);
    } catch (e) {
      if (e.code === 409) console.log(`⏭️  Attribute ${attr.key} already exists`);
      else console.log(`⚠️  Error creating attribute ${attr.key}:`, e.message);
    }
  }

  // Create index on pageId for quick lookups
  try {
    await databases.createIndex(
      DATABASE_ID,
      'unfurling-pages',
      'idx_pageId',
      'key',
      ['pageId'],
      ['asc'],
    );
    console.log('✅ Created index: idx_pageId');
  } catch (e) {
    if (e.code === 409) console.log('⏭️  Index idx_pageId already exists');
    else console.log('⚠️  Error creating index:', e.message);
  }

  // 2. Create storage bucket for images
  try {
    const bucket = await storage.createBucket(
      'unfurling-images',
      'Unfurling Images',
      [
        'read("any")',
        'create("users")',
        'update("users")',
        'delete("users")',
      ],
      false, // fileSecurity
      undefined, // enabled
      30 * 1024 * 1024, // 30MB max file size
      ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'],
    );
    console.log('✅ Created storage bucket: Unfurling Images', bucket.$id);
  } catch (e) {
    if (e.code === 409) console.log('⏭️  Storage bucket unfurling-images already exists');
    else throw e;
  }

  // 3. Create admin user
  try {
    const adminUser = await users.create(
      ID.unique(),
      'admin@unfurlinglittles.com',
      undefined, // phone
      'UnfurlingAdmin2024!',
      'Admin'
    );
    console.log('✅ Created admin user:', adminUser.$id, adminUser.email);

    // Add admin label
    await users.updateLabels(adminUser.$id, ['admin']);
    console.log('✅ Added admin label to user');
  } catch (e) {
    if (e.code === 409) {
      console.log('⏭️  Admin user already exists');
    } else if (e.code === 401 || e.code === 403) {
      console.log('⚠️  Could not create Admin user automatically (API Key lacks users.write permission).');
      console.log('   Please create the user "admin@unfurlinglittles.com" manually in the Appwrite Auth dashboard!');
    } else {
      console.log('⚠️  Error creating admin user:', e.message);
    }
  }

  console.log('\n✅ Setup complete!');
  console.log('\nAdmin credentials:');
  console.log('  Email: admin@unfurlinglittles.com');
  console.log(`  Password: ${ADMIN_PASSWORD}`);
  console.log('\nAppwrite Config:');
  console.log(`  Endpoint: ${ENDPOINT}`);
  console.log(`  Project ID: ${PROJECT_ID}`);
  console.log(`  Database ID: ${DATABASE_ID}`);
  console.log('  Pages Collection ID: unfurling-pages');
  console.log('  Images Bucket ID: unfurling-images');
}

setup().catch(console.error);
