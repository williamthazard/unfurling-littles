import { useState, useEffect } from 'react';
import { useContent } from '../../hooks/useContent';
import { ContentAPI } from '../../api/content';
import { Link, useSearchParams } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiGlobe, FiX, FiCheck, FiSettings, FiFileText, FiHome, FiBriefcase, FiHelpCircle, FiUsers, FiSun, FiMap, FiHeadphones, FiCompass, FiSmile, FiChevronRight, FiPlusSquare } from 'react-icons/fi';

const iconOptions = [
  { label: "Globe", value: "FiGlobe", Icon: FiGlobe },
  { label: "Home", value: "FiHome", Icon: FiHome },
  { label: "Briefcase", value: "FiBriefcase", Icon: FiBriefcase },
  { label: "Help", value: "FiHelpCircle", Icon: FiHelpCircle },
  { label: "Users", value: "FiUsers", Icon: FiUsers },
  { label: "Sun", value: "FiSun", Icon: FiSun },
  { label: "Map", value: "FiMap", Icon: FiMap },
  { label: "File", value: "FiFileText", Icon: FiFileText },
  { label: "Headphones", value: "FiHeadphones", Icon: FiHeadphones },
  { label: "Settings", value: "FiSettings", Icon: FiSettings },
  { label: "Compass", value: "FiCompass", Icon: FiCompass },
  { label: "Smile", value: "FiSmile", Icon: FiSmile },
];

const iconMap: Record<string, any> = {
  FiGlobe, FiHome, FiBriefcase, FiHelpCircle, FiUsers, FiSun, FiMap, FiFileText, FiHeadphones, FiSettings, FiCompass, FiSmile
};

export const PagesList = () => {
  const { content, refreshContent } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentDir, setCurrentDir] = useState<string | null>(null); // null for root
  const [pages, setPages] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newSlug, setNewSlug] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newIcon, setNewIcon] = useState('FiFileText');
  
  // Metadata editing state
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: '', slug: '', icon: '' });

  // Handle ?new=true from sidebar
  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      setIsCreating(true);
      // Remove the param so it doesn't stay open on refreshes
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('new');
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams]);

  useEffect(() => {
    if (content) {
      const allEntries = Object.entries(content)
        .filter(([slug]) => slug !== 'siteConfig' && !slug.startsWith('puck/'));

      const uniqueMap: Record<string, any> = {};
      const childCounts: Record<string, number> = {};

      // First pass: consolidate documents and count sub-pages
      allEntries.forEach(([slug, data]: [string, any]) => {
        const displaySlug = slug.startsWith('pages.') ? slug.slice(6).toLowerCase() : slug.toLowerCase();
        
        // Count as a child if it has a slash
        if (displaySlug.includes('/')) {
          const [parent] = displaySlug.split('/');
          childCounts[parent] = (childCounts[parent] || 0) + 1;
        }

        const item = {
           slug: slug,
           displaySlug,
           title: data?.root?.props?.title || displaySlug,
           icon: data?.root?.props?.icon,
           isLegacy: slug.startsWith('pages.')
        };

        // De-duplicate legacy vs clean
        if (!uniqueMap[displaySlug] || (uniqueMap[displaySlug].isLegacy && !item.isLegacy)) {
          uniqueMap[displaySlug] = item;
        }
      });

      const finalItems: any[] = [];
      const identifiedFolders = new Set<string>();

      // Ensure all folders are identified properly (even if they have no root page document)
      Object.keys(childCounts).forEach(parent => identifiedFolders.add(parent));

      if (!currentDir) {
        // Root level: Merge pages and folders
        const processedRootSlugs = new Set<string>();

        // 1. Process folders first
        Array.from(identifiedFolders).sort().forEach(folderSlug => {
           const existingPage = uniqueMap[folderSlug];
           finalItems.push({
             slug: existingPage?.slug || folderSlug,
             displaySlug: folderSlug,
             title: existingPage?.title || folderSlug.charAt(0).toUpperCase() + folderSlug.slice(1).replace(/-/g, ' '),
             type: 'folder',
             icon: existingPage?.icon,
             hasPageData: !!existingPage
           });
           processedRootSlugs.add(folderSlug);
        });

        // 2. Add standalone pages (not folders)
        Object.values(uniqueMap)
          .filter((item: any) => !item.displaySlug.includes('/') && !processedRootSlugs.has(item.displaySlug))
          .forEach((item: any) => {
            finalItems.push({ ...item, type: 'page' });
          });
      } else {
        // Inside a directory: only show children of that directory
        Object.values(uniqueMap)
          .filter((item: any) => {
            const parts = item.displaySlug.split('/');
            return parts.length > 1 && parts[0] === currentDir;
          })
          .forEach((item: any) => {
             finalItems.push({ ...item, type: 'page' });
          });
      }

      // Final sort: Home Page at top, then alphabetical
      finalItems.sort((a, b) => {
        if (a.displaySlug === 'home') return -1;
        if (b.displaySlug === 'home') return 1;
        return a.displaySlug.localeCompare(b.displaySlug);
      });

      setPages(finalItems);
    }
  }, [content, currentDir]);

  const handleCreate = async () => {
    // Combine currentDir if we are inside a folder
    let fullSlug = newSlug.toLowerCase().replace(/[^a-z0-9/]+/g, '-').replace(/(^-|-$)/g, '');
    if (currentDir && !fullSlug.startsWith(currentDir + '/')) {
      fullSlug = `${currentDir}/${fullSlug}`;
    }

    if (!fullSlug) return;
    
    const newData = {
      content: [],
      root: { 
        props: { 
          title: newTitle || newSlug,
          icon: newIcon
        } 
      }
    };

    try {
      await ContentAPI.upsertContent(fullSlug, newData);
      await refreshContent();
      setIsCreating(false);
      setNewSlug('');
      setNewTitle('');
      setNewIcon('FiFileText');
    } catch(e) {
      alert("Failed to create page");
    }
  };

  const handleStartEdit = (page: any) => {
    setEditingSlug(page.slug);
    setEditData({
      title: page.title,
      slug: page.slug,
      icon: page.icon || 'FiFileText'
    });
  };

  const handleCreateSubpage = (parentSlug: string) => {
    setNewSlug(`${parentSlug}/`);
    setIsCreating(true);
    setNewTitle('');
    // Optionally scroll to top or focus input
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveEdit = async () => {
    if (!editingSlug) return;
    
    try {
      const oldData = (content as any)[editingSlug];
      const newData = {
        ...oldData,
        root: {
          ...oldData.root,
          props: {
            ...oldData.root?.props,
            title: editData.title,
            icon: editData.icon
          }
        }
      };

      await ContentAPI.upsertContent(editingSlug, newData);
      await refreshContent();
      setEditingSlug(null);
    } catch (e) {
      alert("Failed to save changes");
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm(`Are you sure you want to completely delete the page "${slug}"? This cannot be undone.`)) return;
    
    try {
      await ContentAPI.deleteContent(slug);
      await refreshContent();
    } catch (e) {
      console.error(e);
      alert('Failed to delete page.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-sage-200 overflow-hidden min-h-[600px] flex flex-col">
      <div className="p-6 border-b border-sage-100 flex justify-between items-center bg-sage-50/50">
        <div>
          <h2 className="text-2xl font-heading font-bold text-charcoal flex items-center gap-2">
            {currentDir ? (
              <button 
                onClick={() => setCurrentDir(null)}
                className="text-sage-400 hover:text-sage-600 transition-colors flex items-center gap-2"
              >
                All Pages <FiChevronRight size={16} />
                <span className="text-charcoal">{currentDir.charAt(0).toUpperCase() + currentDir.slice(1)}</span>
              </button>
            ) : "All Pages"}
          </h2>
          <p className="text-sage-600 text-sm mt-1">
            {currentDir ? `Managing pages within the "${currentDir}" collection.` : "Manage all dynamic pages and collections."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isCreating && (
            <button 
              onClick={() => setIsCreating(false)}
              className="flex items-center gap-2 px-6 py-2 bg-sage-100 text-sage-600 rounded-lg text-sm font-medium hover:bg-sage-200 transition-colors"
            >
              <FiX /> Cancel
            </button>
          )}
        </div>
      </div>

      {isCreating && (
        <div className="p-6 border-b border-sage-100 bg-sage-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-charcoal mb-1">Page Title</label>
              <input 
                type="text" 
                value={newTitle}
                placeholder="e.g. Services"
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-sage-300 bg-white" 
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-charcoal mb-1">URL Slug {currentDir && `(under ${currentDir}/)`}</label>
              <input 
                type="text" 
                value={newSlug}
                placeholder="e.g. services"
                onChange={e => setNewSlug(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-sage-300 bg-white" 
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-charcoal mb-1">Icon</label>
                <select 
                  value={newIcon}
                  onChange={e => setNewIcon(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-sage-300 bg-white"
                >
                  {iconOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <button 
                onClick={handleCreate}
                className="px-6 py-2 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors h-[42px] mt-auto"
              >
                Create
              </button>
            </div>
          </div>
          <p className="text-[10px] text-sage-500 font-medium italic flex items-center gap-1.5 px-1">
            <FiCompass size={12} /> <strong>Pro-tip:</strong> Use a slash in the slug (like <code className="bg-sage-200 px-1 rounded text-sage-700">team/maggie</code>) to automatically create a collection folder.
          </p>
        </div>
      )}

      <div className="flex-1">
        <ul className="divide-y divide-sage-100">
          {pages.map((item) => {
            if (item.type === 'folder') {
              const isEditing = editingSlug === item.slug;
              const FolderIcon = iconMap[item.icon || ''] || FiCompass;

              return (
                <li key={item.slug} className="p-4 md:p-6 hover:bg-sage-50 transition-colors group">
                  <div className="flex flex-row items-center justify-between gap-3 overflow-hidden">
                    <button 
                      onClick={() => setCurrentDir(item.slug)}
                      className="flex items-center gap-3 flex-1 group text-left min-w-0"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gold-100 flex items-center justify-center text-gold-600 flex-shrink-0">
                        <FolderIcon size={18} className="md:size-5" />
                      </div>
                      <div className="min-w-0 overflow-hidden">
                        <h3 className="font-bold text-charcoal group-hover:text-gold-600 transition-colors truncate text-sm md:text-base">{item.title}</h3>
                        <p className="text-[10px] text-sage-500 uppercase tracking-widest font-bold mt-0.5 flex items-center gap-2">
                           Collection {item.hasPageData && <span className="bg-sage-200/50 text-sage-600 text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider hidden sm:inline">Overview</span>}
                        </p>
                      </div>
                      <FiChevronRight className="ml-1 text-sage-300 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </button>
                    
                    <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleCreateSubpage(item.displaySlug); }}
                        className="p-1.5 md:p-2 text-gold-600 hover:bg-gold-50 rounded-lg transition-colors flex items-center gap-1.5 text-[10px] font-bold"
                        title="Add Page to Collection"
                      >
                        <FiPlusSquare size={18} /> <span className="hidden lg:inline">Add Page</span>
                      </button>

                      {item.hasPageData && (
                        <>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleStartEdit(item); }}
                            className="p-1.5 text-sage-400 hover:text-sage-600 hover:bg-sage-100 rounded-lg transition-colors"
                            title="Edit Info"
                          >
                            <FiSettings size={18} />
                          </button>
                          <Link 
                            to={`/admin/editor/${item.slug}`} 
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-2 py-1.5 border border-sage-300 text-sage-700 rounded-lg text-sm font-medium hover:bg-white hover:shadow-sm transition-all whitespace-nowrap"
                            title="Edit Home Page Content"
                          >
                            <FiEdit2 size={14} /> <span className="hidden lg:inline text-xs">Edit Page</span>
                          </Link>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDelete(item.slug); }}
                            className="p-1.5 text-sage-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Collection Root"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            }

            const isEditing = editingSlug === item.slug;
            const PageIcon = iconMap[item.icon || 'FiFileText'] || FiFileText;

            return (
              <li key={item.slug} className="p-4 md:p-6 hover:bg-sage-50/50 transition-colors group">
                <div className="flex flex-row items-center justify-between gap-3 overflow-hidden">
                  <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-sage-100 flex items-center justify-center text-sage-600 flex-shrink-0">
                      {isEditing ? (
                        <select 
                          value={editData.icon}
                          onChange={e => setEditData({...editData, icon: e.target.value})}
                          className="bg-transparent border-none focus:ring-0 p-0 w-6 h-6 flex items-center justify-center"
                        >
                          {iconOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                      ) : <PageIcon size={18} className="md:size-5" />}
                    </div>
                    
                    {isEditing ? (
                      <div className="flex items-center flex-1 min-w-0">
                        <input 
                          type="text" 
                          value={editData.title}
                          onChange={e => setEditData({...editData, title: e.target.value})}
                          className="font-bold text-charcoal bg-white border border-sage-200 px-2 py-1 rounded text-sm w-full"
                        />
                      </div>
                    ) : (
                      <div className="overflow-hidden min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-charcoal truncate text-sm md:text-base leading-tight">{item.title}</h3>
                          {item.displaySlug === 'home' && <span className="bg-gold-400/20 text-gold-600 text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex-shrink-0">Site Home</span>}
                        </div>
                        <a href={`/${item.slug === 'home' ? '' : item.slug}`} target="_blank" rel="noreferrer" className="text-[10px] md:text-xs text-sage-500 hover:text-lavender-500 transition-colors truncate block">
                           /{item.slug === 'home' ? '' : item.slug}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 md:gap-2 flex-shrink-0 h-10">
                    {isEditing ? (
                      <>
                        <button onClick={handleSaveEdit} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <FiCheck size={18} />
                        </button>
                        <button onClick={() => setEditingSlug(null)} className="p-1.5 text-sage-400 hover:bg-sage-100 rounded-lg transition-colors">
                          <FiX size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleCreateSubpage(item.displaySlug)}
                          className="p-1.5 md:p-2 text-gold-600 hover:bg-gold-50 rounded-lg transition-colors flex items-center gap-1.5 text-[10px] font-bold"
                          title="Add Sub-page"
                        >
                          <FiPlusSquare size={18} /> <span className="hidden lg:inline uppercase">Sub-page</span>
                        </button>
                        <button 
                          onClick={() => handleStartEdit(item)}
                          className="p-1.5 md:p-2 text-sage-400 hover:text-sage-600 hover:bg-sage-100 rounded-lg transition-colors"
                          title="Edit Info"
                        >
                          <FiSettings size={18} />
                        </button>
                        <Link 
                          to={`/admin/editor/${item.slug}`} 
                          className="flex items-center gap-1.5 px-2 py-1.5 border border-sage-300 text-sage-700 rounded-lg text-[10px] md:text-sm font-medium hover:bg-white hover:shadow-sm transition-all whitespace-nowrap"
                          title="Open Builder"
                        >
                          <FiEdit2 size={14} /> <span className="hidden lg:inline">Builder</span>
                        </Link>
                        <button 
                          onClick={() => handleDelete(item.slug)}
                          className="p-1.5 md:p-2 text-sage-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Page"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
          {pages.length === 0 && (
             <div className="p-12 text-center text-sage-500 font-medium">
               This folder is empty. Click "New Page" to add something!
             </div>
          )}
        </ul>
      </div>
    </div>
  );
};
