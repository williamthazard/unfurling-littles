import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './components/admin/AdminLayout';
import { AuthGuard } from './components/admin/AuthGuard';
import { Login } from './pages/admin/Login';

import { DynamicPage } from './pages/DynamicPage';
import { TeamBio } from './pages/TeamBio';
import { PagesList } from './pages/admin/PagesList';
import { VisualEditor } from './pages/admin/editors/VisualEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DynamicPage />} />
          <Route path="/meet-the-team/:slug" element={<TeamBio />} />
          <Route path="/:slug" element={<DynamicPage />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        
        <Route path="/admin/editor/:slug" element={
          <AuthGuard>
            <VisualEditor />
          </AuthGuard>
        } />
        
        <Route path="/admin/dashboard" element={
          <AuthGuard>
            <AdminLayout />
          </AuthGuard>
        }>
          <Route index element={<Navigate to="pages" />} />
          <Route path="pages" element={<PagesList />} />
          
          {/* Direct editor shortcuts from sidebar */}
          <Route path="services" element={<Navigate to="/admin/editor/services" />} />
          <Route path="faq" element={<Navigate to="/admin/editor/faq" />} />
          <Route path="team" element={<Navigate to="/admin/editor/meet-the-team" />} />
          <Route path="trauma" element={<Navigate to="/admin/editor/trauma-aba" />} />
          <Route path="space" element={<Navigate to="/admin/editor/our-space" />} />
          <Route path="resources" element={<Navigate to="/admin/editor/resources" />} />
          <Route path="podcasts" element={<Navigate to="/admin/editor/podcasts" />} />
          <Route path="settings" element={<Navigate to="/admin/editor/siteConfig" />} />
          
          <Route path="*" element={<div className="p-8 bg-white rounded-xl shadow-sm"><p className="text-sage-500">Editor module coming soon.</p></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
