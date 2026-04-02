import { useParams, Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { FiArrowLeft, FiLoader } from 'react-icons/fi';
import { Render } from '@puckeditor/core';
import { config } from '../lib/puck.config';
import '@puckeditor/core/dist/index.css';

export const TeamBio = () => {
  const { slug } = useParams();
  const { content, loading } = useContent();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FiLoader className="animate-spin text-sage-500" size={40} />
      </div>
    );
  }

  // 1. Check if there's a dedicated Puck page for this team member
  const memberSlug = `meet-the-team/${slug}`;
  const memberPageData = content[memberSlug];

  if (memberPageData && memberPageData.content && memberPageData.content.length > 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
           <Link 
            to="/meet-the-team" 
            className="inline-flex items-center gap-2 text-sage-400 hover:text-sage-900 transition-colors font-medium mb-12"
          >
            <FiArrowLeft size={18} /> Back to Team
          </Link>
          <Render config={config} data={memberPageData} />
        </div>
      </div>
    );
  }

  // 2. Fallback to extracting from the main 'meet-the-team' grid (legacy/placeholder)
  const teamPageData = content['meet-the-team'];
  let bioMember: any = null;
  let sectionTitle = '';

  if (teamPageData && teamPageData.content) {
    for (const block of teamPageData.content) {
      if (block.type === 'TeamDepartment' && block.props.members) {
        const member = block.props.members.find((m: any) => m.slug === slug);
        if (member) {
          bioMember = member;
          sectionTitle = block.props.departmentTitle;
          break;
        }
      }
    }
  }

  if (!bioMember) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-heading font-bold text-sage-900 mb-4">Member Profile Coming Soon</h2>
        <p className="mb-8 text-sage-600">We're still unfurling their full biography.</p>
        <Link to="/meet-the-team" className="btn-sage">Return to Team Page</Link>
      </div>
    );
  }

  // Render the default "Subdirectory" Bio layout
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-5xl">
      <Link 
        to="/meet-the-team" 
        className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-900 transition-colors font-medium mb-12"
      >
        <FiArrowLeft size={20} /> Back to Meet the Team
      </Link>

      <div className="flex flex-col md:flex-row gap-12 md:gap-20">
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-[4rem] rounded-tl-xl overflow-hidden shadow-xl border-4 border-sage-100 bg-sage-50 mb-8 relative">
            {bioMember.image && (
               <img 
                 referrerPolicy="no-referrer"
                 src={bioMember.image} 
                 alt={bioMember.name} 
                 className="w-full h-full object-cover object-center transition-transform duration-500"
                 style={{
                   transform: `scale(${(bioMember.zoom || 100) / 100})`,
                   objectPosition: `center ${bioMember.focusY || 50}%`
                 }}
               />
            )}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gold-400 rounded-bl-full opacity-20"></div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-charcoal mb-2">{bioMember.name}</h1>
          <p className="text-sage-700 font-bold uppercase tracking-wider text-sm mb-2">{bioMember.title}</p>
          <span className="inline-block px-3 py-1 bg-lavender-100 text-lavender-500 rounded-full text-xs font-semibold tracking-wide uppercase">
            {sectionTitle || "Team Member"}
          </span>
        </div>

        <div className="w-full md:w-2/3">
          <div className="prose prose-sage lg:prose-lg max-w-none text-charcoal">
            {bioMember.bio ? bioMember.bio.split('\n\n').map((p: string, i: number) => (
              <p key={i} className="mb-6 leading-loose">{p}</p>
            )) : <p>Bio coming soon...</p>}
          </div>
          <div className="mt-16 pt-8 border-t border-sage-200">
            <a href="https://www.unfurlinglittles.com/contact" className="btn-gold font-bold hover:shadow-lg inline-block">
              Inquiry Form
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
