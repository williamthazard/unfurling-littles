import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentAPI } from '../api/content';
import { defaultContent } from '../data/defaultContent';

export type ContentContextType = {
  content: any;
  loading: boolean;
  error: Error | null;
  refreshContent: () => Promise<void>;
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [content, setContent] = useState<any>(defaultContent.pages || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadContent = async () => {
    try {
      setLoading(true);
      const appwriteContent = await ContentAPI.fetchAllContent();
      
      if (!appwriteContent || Object.keys(appwriteContent).length === 0) {
        // DB is empty, optionally we can seed it right here
        await ContentAPI.seedDefaultContent();
        // Since seedDefaultContent takes time, we'll just fall back to local defaults for initial render
        setContent(defaultContent.pages || {});
      } else {
        // Just use the flat slug mapping directly!
        setContent(appwriteContent);
      }
    } catch (err: any) {
      console.error('Failed to load content from Appwrite:', err);
      setError(err);
      // Fallback to defaults
      setContent(defaultContent.pages || {});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, error, refreshContent: loadContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
