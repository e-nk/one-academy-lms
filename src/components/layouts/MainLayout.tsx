import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';


interface MainLayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const MainLayout = ({ children, fullWidth = false }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow relative">
        {/* Main content with no fixed padding - will be controlled by Container */}
        <div className={`${fullWidth ? 'w-full' : ''}`}>
          {children}
        </div>
      </main>
      <Footer />
      
      {/* Add the Social Sidebar component here */}
    </div>
  );
};

export default MainLayout;