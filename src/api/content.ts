import { ID, Query } from 'appwrite';
import { databases, DATABASE_ID, PAGES_COLLECTION_ID } from '../lib/appwrite';
import { defaultContent } from '../data/defaultContent';

export const ContentAPI = {
  /**
   * Fetch all content chunks from Appwrite.
   */
  async fetchAllContent() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PAGES_COLLECTION_ID,
        [Query.limit(100)]
      );

      // Reconstruct the full content object
      if (response.documents.length === 0) {
        return null;
      }

      const contentObj: any = {};
      response.documents.forEach((doc: any) => {
        try {
          contentObj[doc.pageId] = JSON.parse(doc.content);
        } catch (e) {
          console.error(`Failed to parse content for ${doc.pageId}`);
        }
      });

      return contentObj;
    } catch (error) {
      console.error('Error fetching content:', error);
      throw error;
    }
  },

  /**
   * Seed the default content to Appwrite (flattens structure to key-value docs).
   */
  async seedDefaultContent() {
    try {
      console.log('Seeding default content to Appwrite...');
      for (const [key, value] of Object.entries(defaultContent.pages || {})) {
        await this.upsertContent(key, value);
      }
      console.log('Seeding complete.');
    } catch (error) {
      console.error('Error seeding default content:', error);
      throw error;
    }
  },

  /**
   * Insert or update a specific chunk of content.
   * `pageId` should be the dot-separated path, e.g., "pages.home" or "siteConfig".
   */
  async upsertContent(pageId: string, contentValue: any) {
    try {
      // Check if document exists
      const existing = await databases.listDocuments(
        DATABASE_ID,
        PAGES_COLLECTION_ID,
        [Query.equal('pageId', pageId)]
      );

      const contentString = JSON.stringify(contentValue);

      if (existing.documents.length > 0) {
        // Update document
        const docId = existing.documents[0].$id;
        return await databases.updateDocument(
          DATABASE_ID,
          PAGES_COLLECTION_ID,
          docId,
          {
            content: contentString,
            updatedAt: new Date().toISOString()
          }
        );
      } else {
        // Create document
        return await databases.createDocument(
          DATABASE_ID,
          PAGES_COLLECTION_ID,
          ID.unique(),
          {
            pageId,
            content: contentString,
            updatedAt: new Date().toISOString()
          }
        );
      }
    } catch (error) {
      console.error(`Error saving content for ${pageId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a specific chunk of content.
   */
  async deleteContent(pageId: string) {
    try {
      const existing = await databases.listDocuments(
        DATABASE_ID,
        PAGES_COLLECTION_ID,
        [Query.equal('pageId', pageId)]
      );

      if (existing.documents.length > 0) {
        const docId = existing.documents[0].$id;
        return await databases.deleteDocument(
          DATABASE_ID,
          PAGES_COLLECTION_ID,
          docId
        );
      }
    } catch (error) {
      console.error(`Error deleting content for ${pageId}:`, error);
      throw error;
    }
  }
};
