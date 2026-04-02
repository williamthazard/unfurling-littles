import dotenv from 'dotenv';
dotenv.config();

const ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID || '6866aa970031dffbf81b';
const API_KEY = process.env.APPWRITE_API_KEY;

const DATABASE_ID = '6872c4370036255a902b';
const PAGES_COLLECTION_ID = 'unfurling-pages';

if (!API_KEY) {
  console.error('❌ Error: APPWRITE_API_KEY is not defined in .env');
  process.exit(1);
}

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);
const databases = new Databases(client);

async function convertToPuck() {
  const docs = await databases.listDocuments(DATABASE_ID, PAGES_COLLECTION_ID, [Query.limit(100)]);
  
  const contentMap: Record<string, any> = {};
  for (const d of docs.documents) {
    if (d.pageId.startsWith('pages.')) {
      contentMap[d.pageId.replace('pages.', '')] = JSON.parse(d.content);
    }
  }

  // Generate Home Puck Data
  if (contentMap.home) {
    const homePuck = {
      content: [
        {
          type: "Hero",
          props: {
            id: "hero-1",
            heading: contentMap.home.heading,
            body: contentMap.home.body,
            ctaText: contentMap.home.ctaText,
            ctaUrl: contentMap.home.ctaUrl,
            heroImage: contentMap.home.heroImage
          }
        },
        {
          type: "Banner",
          props: {
            id: "banner-1",
            title: "Neurodiversity-Affirming Care",
            body: "At Unfurling Littles, we reject compliance-based models in favor of deep connection and understanding. Your child's unique way of experiencing the world is something to be celebrated, supported, and understood.",
            bgColor: "bg-sage-100"
          }
        }
      ],
      root: { props: { title: "Home" } }
    };
    await upsertDocument('home', homePuck);
  }

  // Generate Services Puck Data
  if (contentMap.services) {
    const sPuck = {
      content: [
        {
          type: "ServicesGrid",
          props: {
            id: "services-1",
            introText: contentMap.services.introText,
            items: contentMap.services.items.map((i: any) => ({
              title: i.title,
              description: i.description,
              imageUrl: i.imageUrl
            }))
          }
        }
      ],
      root: { props: { title: "Services" } }
    };
    await upsertDocument('services', sPuck);
  }

  // Generate Team Puck Data
  if (contentMap.team) {
    const tPuck = {
      content: [
        {
          type: "Banner",
          props: {
            id: "banner-team",
            title: "Meet The Team",
            body: "Our multidisciplinary team of clinicians...",
            bgColor: "bg-white"
          }
        },
        ...contentMap.team.sections.map((sec: any, i: number) => ({
          type: "TeamDepartment",
          props: {
            id: `dept-${i}`,
            departmentTitle: sec.title,
            members: sec.members.map((m: any) => ({
              name: m.name,
              title: m.title,
              bio: m.bio,
              image: m.image
            }))
          }
        }))
      ],
      root: { props: { title: "Meet The Team" } }
    };
    await upsertDocument('meet-the-team', tPuck);
  }

  // Delete old docs
  for (const d of docs.documents) {
    if (d.pageId.startsWith('pages.')) {
      await databases.deleteDocument(DATABASE_ID, PAGES_COLLECTION_ID, d.$id);
    }
  }

  console.log("Migration complete!");
}

async function upsertDocument(slug: string, puckData: any) {
  const existing = await databases.listDocuments(DATABASE_ID, PAGES_COLLECTION_ID, [Query.equal('pageId', slug)]);
  if (existing.documents.length > 0) {
    await databases.updateDocument(DATABASE_ID, PAGES_COLLECTION_ID, existing.documents[0].$id, {
      content: JSON.stringify(puckData)
    });
  } else {
    await databases.createDocument(DATABASE_ID, PAGES_COLLECTION_ID, ID.unique(), {
      pageId: slug,
      content: JSON.stringify(puckData)
    });
  }
}

convertToPuck().catch(console.error);
