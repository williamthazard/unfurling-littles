import dotenv from 'dotenv';
dotenv.config();
import { Client, Storage } from 'node-appwrite';

const ENDPOINT = process.env.VITE_APPWRITE_ENDPOINT || 'https://nyc.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.VITE_APPWRITE_PROJECT_ID || '6866aa970031dffbf81b';
const API_KEY = process.env.APPWRITE_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: APPWRITE_API_KEY is not defined in .env');
  process.exit(1);
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);
const storage = new Storage(client);
storage.listBuckets().then(res => {
  console.log("Buckets:", res.buckets.map(b => b.$id));
}).catch(console.error);
