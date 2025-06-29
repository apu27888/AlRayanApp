import React from 'react';
import { Menu, UserCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="bg-white shadow-md flex justify-between items-center p-4">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden text-gray-700 hover:text-gray-900"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <p className="text-md text-gray-600 hidden sm:block">Welcome, Inzamam Opu!</p>
        <UserCircle size={32} className="text-gray-600" />
      </div>
    </header>
  );
};

export default Header;