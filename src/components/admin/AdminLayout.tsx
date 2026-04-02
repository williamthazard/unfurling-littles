import { useState, useMemo } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { account } from '../../lib/appwrite';
import { useContent } from '../../hooks/useContent';
import { 
  FiHome, 
  FiBriefcase, 
  FiHelpCircle, 
  FiUsers, 
  FiSun, 
  FiMap, 
  FiFileText, 
  FiHeadphones, 
  FiSettings, 
  FiLogOut,
  FiGlobe,
  FiPlus,
  FiCompass,
  FiSmile,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';

const iconMap: Record<string, any> = {
  FiHome,
  FiBriefcase,
  FiHelpCircle,
  FiUsers,
  FiSun,
  FiMap,
  FiFileText,
  FiHeadphones,
  FiSettings,
  FiGlobe,
  FiCompass,
  FiSmile
};

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { content } = useContent();
  const [expandedCollections, setExpandedCollections] = useState<Record<string, boolean>>({ 'meet-the-team': true });
  const [isSeeding, setIsSeeding] = useState(false);
  const [showSeedConfirm, setShowSeedConfirm] = useState(false);

  const toggleCollection = (id: string) => {
    setExpandedCollections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      navigate('/admin');
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  // Group nav items into hierarchical collections
  const groupedNav = useMemo(() => {
    if (!content) return [];

    const items: any[] = [];
    const collections: Record<string, any[]> = {};

    // Filter out siteConfig and internal puck pages
    const pageKeys = Object.keys(content).filter(k => k !== 'siteConfig' && !k.startsWith('puck/'));

    const uniqueMap: Record<string, any> = {};

    pageKeys.forEach(slug => {
      const pageData = (content as any)[slug];
      // Strip 'pages.' prefix if it exists for grouping purposes
      const displaySlug = slug.startsWith('pages.') ? slug.slice(6).toLowerCase() : slug.toLowerCase();
      
      const title = pageData?.root?.props?.title || displaySlug;
      const iconName = pageData?.root?.props?.icon || (displaySlug === 'home' ? 'FiHome' : 'FiFileText');
      const Icon = iconMap[iconName] || FiFileText;

      const item = {
        id: slug,
        displaySlug,
        name: title,
        path: `/admin/editor/${slug}`,
        icon: Icon,
        isHome: displaySlug === 'home',
        isLegacy: slug.startsWith('pages.')
      };

      // De-duplicate: prefer the one that is NOT legacy (without pages. prefix)
      if (!uniqueMap[displaySlug] || (uniqueMap[displaySlug].isLegacy && !item.isLegacy)) {
        uniqueMap[displaySlug] = item;
      }
    });

    // Re-structure with de-duplicated items
    Object.values(uniqueMap).forEach((item: any) => {
      if (item.displaySlug.includes('/')) {
        const [parent] = item.displaySlug.split('/');
        if (!collections[parent]) collections[parent] = [];
        collections[parent].push(item);
      } else {
        items.push(item);
      }
    });

    const finalNav: any[] = [];
    items.sort((a, b) => {
      if (a.isHome) return -1;
      if (b.isHome) return 1;
      return a.name.localeCompare(b.name);
    });

    items.forEach(item => {
      if (collections[item.displaySlug]) {
        finalNav.push({
          ...item,
          isCollection: true,
          children: collections[item.displaySlug]
        });
        delete collections[item.displaySlug];
      } else {
        finalNav.push(item);
      }
    });

    Object.keys(collections).forEach(parentSlug => {
      finalNav.push({
        id: parentSlug,
        displaySlug: parentSlug,
        name: parentSlug.charAt(0).toUpperCase() + parentSlug.slice(1).replace(/-/g, ' '),
        icon: FiCompass,
        isCollection: true,
        children: collections[parentSlug]
      });
    });

    return finalNav;
  }, [content]);

  const cleanLegacyData = async () => {
    if (!content) return;
    if (!window.confirm("This will permanently delete duplicate pages with the 'pages.' prefix. Continue?")) return;

    const { ContentAPI } = await import('../../api/content');
    const pageKeys = Object.keys(content).filter(k => k.startsWith('pages.'));
    
    let count = 0;
    for (const key of pageKeys) {
      try {
        await ContentAPI.deleteContent(key);
        count++;
      } catch (e) {
        console.error(`Failed to delete ${key}`, e);
      }
    }
    
    alert(`Cleaned up ${count} legacy entries.`);
    window.location.reload();
  };

  const staticNavItems = [
    { name: 'All Pages', path: '/admin/dashboard/pages', icon: FiGlobe },
    { name: 'Site Settings', path: '/admin/dashboard/settings', icon: FiSettings },
  ];

  return (
    <div className="flex h-screen bg-sage-50 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white flex flex-col flex-shrink-0 lg:overflow-hidden overflow-y-auto">
        <div className="h-20 px-6 border-b border-sage-800 flex items-center gap-3">
           <div className="w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center text-white font-heading font-bold text-sm">UL</div>
           <span className="font-heading font-semibold uppercase tracking-wider text-sm">CMS Portal</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2 sidebar-nav">
          <div className="flex items-center justify-between mb-2 ml-2 pr-2">
            <span className="text-xs uppercase tracking-widest text-sage-600 font-bold">Pages</span>
            <Link to="/admin/dashboard/pages?new=true" title="New Page" className="text-sage-400 hover:text-white transition-colors">
              <FiPlus size={16} />
            </Link>
          </div>
          
          <Link 
            to="/admin/dashboard/pages"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium ${
              location.pathname === '/admin/dashboard/pages' && !location.search.includes('new=true')
                ? 'bg-sage-600 text-white shadow-sm' 
                : 'text-sage-400 hover:bg-sage-800 hover:text-white'
            }`}
          >
            <FiGlobe size={18} />
            All Pages
          </Link>

          <div className="h-px bg-sage-800 my-2 mx-2 opacity-50"></div>

          {groupedNav.map((item) => {
            const Icon = item.icon;
            
            if (item.isCollection) {
              const isExpanded = expandedCollections[item.displaySlug];
              return (
                <div key={item.id} className="flex flex-col gap-1">
                  <button
                    onClick={() => toggleCollection(item.displaySlug)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg text-sage-400 hover:bg-sage-800 hover:text-white transition-colors text-sm font-medium group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {isExpanded ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                  </button>
                  
                  {isExpanded && (
                    <div className="flex flex-col gap-1 ml-4 border-l border-sage-800 pl-4 py-1">
                      {item.path && (
                        <Link 
                          to={item.path}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                            location.pathname === item.path 
                              ? 'bg-sage-700 text-white' 
                              : 'text-sage-500 hover:text-white hover:bg-sage-800'
                          }`}
                        >
                          Collection Home
                        </Link>
                      )}
                      {item.children.map((child: any) => (
                        <Link 
                          key={child.id} 
                          to={child.path}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                            location.pathname === child.path 
                              ? 'bg-sage-700 text-white' 
                              : 'text-sage-500 hover:text-white hover:bg-sage-800'
                          }`}
                        >
                          {child.name.replace(`${item.name} - `, '')}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link 
                key={item.id} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium ${
                  location.pathname === item.path 
                    ? 'bg-sage-600 text-white shadow-sm' 
                    : 'text-sage-400 hover:bg-sage-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}

          <div className="h-px bg-sage-800 my-2 mx-2 opacity-50"></div>
          
          {staticNavItems.map(item => (
            <Link 
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium ${
                location.pathname === item.path
                  ? 'bg-sage-600 text-white shadow-sm' 
                  : 'text-sage-400 hover:bg-sage-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sage-800 flex flex-col gap-2">
          {showSeedConfirm ? (
            <div className="p-3 bg-gold-400/10 border border-gold-400/20 rounded-lg mb-2">
              <p className="text-[10px] text-gold-400 font-bold mb-2 uppercase tracking-wide">Confirm Overwrite Seed?</p>
              <div className="flex gap-2">
                <button 
                  onClick={async (e) => {
                    e.stopPropagation();
                    setShowSeedConfirm(false);
                    setIsSeeding(true);
                    try {
                      const { ContentAPI } = await import('../../api/content');
                      await ContentAPI.seedDefaultContent();
                      alert("Base content seeded successfully.");
                      window.location.reload();
                    } catch (e) {
                      alert("Failed to seed content. Check console.");
                      console.error(e);
                      setIsSeeding(false);
                    }
                  }}
                  className="flex-1 px-2 py-1.5 bg-gold-400 text-charcoal text-[10px] font-bold rounded hover:bg-gold-300 transition-colors"
                >
                  Confirm
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowSeedConfirm(false); }}
                  className="flex-1 px-2 py-1.5 bg-sage-800 text-sage-400 text-[10px] font-bold rounded hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
               onClick={(e) => { e.stopPropagation(); setShowSeedConfirm(true); }}
               disabled={isSeeding}
               className="flex items-center justify-center gap-2 w-full px-4 py-2 text-xs font-bold bg-gold-400/10 text-gold-400 border border-gold-400/20 rounded-lg hover:bg-gold-400 hover:text-charcoal transition-all mb-2 disabled:opacity-50"
            >
              {isSeeding ? "Seeding..." : "Force Seed Base Data"}
            </button>
          )}

          <button 
             onClick={cleanLegacyData}
             className="flex items-center justify-center gap-2 w-full px-4 py-2 text-xs font-bold bg-lavender-500/10 text-lavender-500 border border-lavender-500/20 rounded-lg hover:bg-lavender-500 hover:text-white transition-all"
          >
            Clean Legacy Data
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sage-400 hover:text-red-400 hover:bg-sage-800 rounded-lg transition-colors text-sm font-medium"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-cream">
        <header className="h-20 bg-white border-b border-sage-200 flex items-center justify-between px-8 flex-shrink-0 shadow-sm">
          <h2 className="text-xl font-heading font-bold text-sage-900">
            {staticNavItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <Link to="/" target="_blank" className="bg-lavender-500 text-white text-xs px-4 py-2 rounded-lg opacity-80 hover:opacity-100 flex items-center gap-2">
              View Public Site
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

    </div>
  );
};
