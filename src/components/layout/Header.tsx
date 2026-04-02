import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-sage-200/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50 relative">
            {/* Placeholder for real logo */}
            <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center text-white font-heading font-bold text-xl">
              UL
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-none text-charcoal tracking-wide uppercase">
                Unfurling Littles
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/services" className="nav-link">Services</Link>
            
            <div className="relative group">
              <button className="nav-link flex items-center gap-1">
                About Us <FiChevronDown />
              </button>
              <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left translate-y-2 group-hover:translate-y-0">
                <Link to="/meet-the-team" className="dropdown-item">Meet the Team</Link>
                <Link to="/trauma-aba" className="dropdown-item">Trauma + ABA</Link>
                <Link to="/our-space" className="dropdown-item">Our Space</Link>
              </div>
            </div>

            <Link to="/faq" className="nav-link">FAQ</Link>

            <div className="relative group">
              <button className="nav-link flex items-center gap-1">
                More <FiChevronDown />
              </button>
              <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left translate-y-2 group-hover:translate-y-0">
                <Link to="/resources" className="dropdown-item">Resources</Link>
                <Link to="/podcasts" className="dropdown-item">Podcasts</Link>
                <a href="https://example.com/shop" target="_blank" rel="noopener noreferrer" className="dropdown-item">Shop</a>
                <a href="https://example.com/courses" target="_blank" rel="noopener noreferrer" className="dropdown-item">Courses</a>
              </div>
            </div>

            <a href="#inquiry" className="btn-sage ml-4">
              Inquiry Form
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 text-charcoal p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`fixed inset-0 bg-sage-50 z-40 flex flex-col pt-24 px-6 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 text-xl font-heading">
          <Link to="/" className="text-charcoal border-b border-sage-200 pb-2">Home</Link>
          <Link to="/services" className="text-charcoal border-b border-sage-200 pb-2">Services</Link>
          
          <div className="flex flex-col gap-4 pl-4 border-l-2 border-sage-300 ml-2">
            <span className="text-sm font-bold text-sage-600 uppercase tracking-wider">About Us</span>
            <Link to="/meet-the-team" className="text-charcoal">Meet the Team</Link>
            <Link to="/trauma-aba" className="text-charcoal">Trauma + ABA</Link>
            <Link to="/our-space" className="text-charcoal">Our Space</Link>
          </div>
          
          <Link to="/faq" className="text-charcoal border-b border-sage-200 pb-2">FAQ</Link>
          
          <div className="flex flex-col gap-4 pl-4 border-l-2 border-sage-300 ml-2">
            <span className="text-sm font-bold text-sage-600 uppercase tracking-wider">More</span>
            <Link to="/resources" className="text-charcoal">Resources</Link>
            <Link to="/podcasts" className="text-charcoal">Podcasts</Link>
            <a href="https://example.com/shop" target="_blank" rel="noopener noreferrer" className="text-charcoal">Shop</a>
            <a href="https://example.com/courses" target="_blank" rel="noopener noreferrer" className="text-charcoal">Courses</a>
          </div>
          
          <a href="#inquiry" className="btn-sage text-center mt-4 text-base">
            Inquiry Form
          </a>
        </div>
      </div>
    </header>
  );
};
