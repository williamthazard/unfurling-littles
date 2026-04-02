import { ContentAPI } from './src/api/content';

async function run() {
  console.log('Forcing override of Appwrite content...');
  try {
    await ContentAPI.seedDefaultContent();
    console.log('Done!');
  } catch (err) {
    console.error(err);
  }
}

run();
