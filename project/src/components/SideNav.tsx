import React from 'react';
import { Menu, Home, Book, HelpCircle } from 'lucide-react';

const SideNav: React.FC = () => {
  return (
    <nav className="bg-white shadow-md flex flex-col items-center py-4 gap-6">
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <Menu className="w-6 h-6" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <Home className="w-6 h-6" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <Book className="w-6 h-6" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <HelpCircle className="w-6 h-6" />
      </button>
    </nav>
  );
};

export default SideNav;