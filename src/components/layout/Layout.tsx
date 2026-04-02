import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-sage-200 font-sans text-charcoal">
      <Header />
      <main className="flex-grow scroll-smooth mt-20 md:mt-24 w-full h-full pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
