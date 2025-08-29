import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { PageType } from '@/types';

interface TopNavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

// Top Navigation Component
export const TopNavigation: React.FC<TopNavigationProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Project Communication Hub</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`hover:text-blue-200 transition-colors ${currentPage === 'dashboard' ? 'text-blue-200' : ''}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => onNavigate('timeline')}
            className={`hover:text-blue-200 transition-colors ${currentPage === 'timeline' ? 'text-blue-200' : ''}`}
          >
            Timeline
          </button>
          <button 
            onClick={() => onNavigate('table')}
            className={`hover:text-blue-200 transition-colors ${currentPage === 'table' ? 'text-blue-200' : ''}`}
          >
            Table
          </button>
          <button 
            onClick={() => onNavigate('drafting')}
            className={`hover:text-blue-200 transition-colors ${currentPage === 'drafting' ? 'text-blue-200' : ''}`}
          >
            Drafting
          </button>
        </div>
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <button onClick={() => onNavigate('dashboard')} className="block py-2 hover:text-blue-200">Dashboard</button>
          <button onClick={() => onNavigate('timeline')} className="block py-2 hover:text-blue-200">Timeline</button>
          <button onClick={() => onNavigate('table')} className="block py-2 hover:text-blue-200">Table</button>
          <button onClick={() => onNavigate('drafting')} className="block py-2 hover:text-blue-200">Drafting</button>
        </div>
      )}
    </nav>
  );
};