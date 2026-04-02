import { Client, Databases, Storage, Account } from 'appwrite';

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID || '6866aa970031dffbf81b';

// Export these for use in components/api
export const DATABASE_ID = '6872c4370036255a902b';
export const PAGES_COLLECTION_ID = 'unfurling-pages';
export const IMAGES_BUCKET_ID = 'unfurling-images';

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

export default client;
