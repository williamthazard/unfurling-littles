import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-sage-600 text-white mt-auto py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center text-white font-heading font-bold text-lg">
                UL
              </div>
              <span className="font-heading font-bold text-lg uppercase tracking-wide text-white">
                Unfurling Littles
              </span>
            </Link>
            <p className="text-sm text-sage-100 mt-2 max-w-xs">
              Creating a Culture of Acceptance through neurodiversity-affirming care for children and families.
            </p>
          </div>

          {/* Links & Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-lg uppercase tracking-wide text-sage-100">Contact Us</h4>
            <div className="flex flex-col gap-2 text-sm text-sage-100">
              <p>Email: <a href="mailto:hello@unfurlinglittles.com" className="hover:text-gold-300 transition-colors">hello@unfurlinglittles.com</a></p>
              <p>Location: Serving Philadelphia, PA and surrounding areas.</p>
              <div className="mt-4 flex flex-col items-start gap-2">
                <a href="#inquiry" className="btn-gold border border-gold-400">
                  Fill out our Inquiry Form
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-semibold text-lg uppercase tracking-wide text-sage-100">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-sage-100">
              <Link to="/services" className="hover:text-gold-300 transition-colors">Services</Link>
              <Link to="/faq" className="hover:text-gold-300 transition-colors">FAQ</Link>
              <Link to="/meet-the-team" className="hover:text-gold-300 transition-colors">Meet the Team</Link>
              <Link to="/resources" className="hover:text-gold-300 transition-colors">Free Resources</Link>
              <Link to="/admin" className="hover:text-gold-300 transition-colors text-xs opacity-50 pt-4">Admin Console</Link>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-sage-500 flex flex-col md:flex-row justify-between items-center text-xs text-sage-200">
          <p>&copy; {new Date().getFullYear()} Unfurling Littles. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
