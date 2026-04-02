import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { account } from '../../lib/appwrite';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await account.get();
        setIsAuthenticated(!!session);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sage-200">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-sage-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sage-600 font-heading">Verifying identity...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
