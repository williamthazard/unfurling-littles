import { useParams } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { Render } from '@puckeditor/core';
import { config } from '../lib/puck.config';
import '@puckeditor/core/dist/index.css';

export const DynamicPage = () => {
  const { slug } = useParams();
  const { content, loading } = useContent();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-sage-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sage-600 font-heading">Loading Page...</p>
        </div>
      </div>
    );
  }

  // Fallback to "home" if undefined slug
  const activeSlug = slug || 'home';
  
  // The content object contains { 'home': {...}, 'services': {...} }
  const pageData = content[activeSlug];

  if (!pageData) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-heading mb-4 text-sage-900 mt-20">404 - Page Not Found</h1>
        <p className="text-sage-700">The url path "/{activeSlug}" does not exist.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in w-full overflow-x-hidden">
      <Render config={config} data={pageData} />
    </div>
  );
};
