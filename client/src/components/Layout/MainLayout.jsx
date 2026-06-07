import { useState } from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen font-sans bg-white text-[#111111] overflow-hidden">
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/20 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div className={`fixed inset-y-0 left-0 z-30 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </div>
      <main className="flex flex-col flex-1 min-w-0 overflow-hidden bg-white">
        <header className="flex items-center justify-between px-4 py-3 border-b border-[#e5e7eb] md:hidden">
          <span className="text-lg font-semibold tracking-tight text-[#111111]">Daily Journal</span>
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="p-2 -mr-2 text-[#6b7280] hover:text-[#111111] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">
          <div className="w-full h-full px-4 py-8 md:px-8 md:py-12">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;