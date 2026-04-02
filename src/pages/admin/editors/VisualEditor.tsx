import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Puck, Data } from '@puckeditor/core';
import { config } from '../../../lib/puck.config';
import { ContentAPI } from '../../../api/content';
import { useContent } from '../../../hooks/useContent';
import '@puckeditor/core/dist/index.css';

export const VisualEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { content, refreshContent } = useContent();

  const [initialData, setInitialData] = useState<Data | null>(null);

  useEffect(() => {
    if (slug && content) {
      // If content[slug] exists, load it. Otherwise pass empty puck obj with slug as title.
      if (content[slug]) {
        setInitialData(content[slug]);
      } else {
        setInitialData({
          content: [],
          root: { props: { title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') } }
        });
      }
    }
  }, [slug, content]);

  const handlePublish = async (data: Data) => {
    if (!slug) return;
    try {
      await ContentAPI.upsertContent(slug, data);
      await refreshContent();
      alert('Page Published Successfully!');
      navigate('/admin/dashboard/pages');
    } catch (e) {
      alert('Failed to publish. Check console.');
      console.error(e);
    }
  };

  if (!initialData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-sage-50">
        <div className="animate-pulse w-16 h-16 border-4 border-sage-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden w-full h-full max-w-[100vw]">
      <Puck
        config={config}
        data={initialData}
        onPublish={handlePublish}
        headerTitle={`Editing Page: /${slug === 'home' ? '' : slug}`}
        headerPath={slug === 'home' ? '/' : `/${slug}`}
        overrides={{
          headerActions: ({ children }) => (
            <>
              <button 
                onClick={() => navigate('/admin/dashboard/pages')}
                className="px-4 py-2 text-sm font-medium text-sage-600 hover:text-charcoal bg-sage-50 hover:bg-sage-100 rounded-lg transition-colors border border-sage-200 mr-2"
              >
                Back to Dashboard
              </button>
              {children}
            </>
          ),
        }}
      />
    </div>
  );
};
