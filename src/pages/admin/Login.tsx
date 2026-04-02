import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../../lib/appwrite';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if they are already signed in
    account.get().then(() => {
      navigate('/admin/dashboard');
    }).catch(() => {
      // Not signed in, do nothing
    });
  }, [navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create session
      await account.createEmailPasswordSession(email, password);
      // Navigate to dashboard
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Login error', err);
      if (err.message && err.message.includes('session is active')) {
        navigate('/admin/dashboard');
      } else {
        setError(err.message || 'Failed to login. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sage-200 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-sage-100 w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center text-white font-heading font-bold text-2xl mx-auto mb-4">
            UL
          </div>
          <h1 className="text-3xl font-heading font-bold text-sage-900 mb-2">Editor Portal</h1>
          <p className="text-sage-700">Sign in to manage site content.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2" htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-sage-300 focus:outline-none focus:border-lavender-400 focus:ring-1 focus:ring-lavender-400 transition-colors bg-sage-50"
              placeholder="admin@unfurlinglittles.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2" htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-sage-300 focus:outline-none focus:border-lavender-400 focus:ring-1 focus:ring-lavender-400 transition-colors bg-sage-50"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`btn-lavender w-full mt-4 text-base py-3 ${loading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  );
};
