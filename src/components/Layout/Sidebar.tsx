import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  FileSignature, 
  Users, 
  CheckSquare, 
  TrendingUp, 
  Warehouse, 
  History, 
  FileText, 
  Factory as FactoryIcon, 
  PlayCircle, 
  ChevronDown,
  ClipboardList 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  path: string;
  icon: any;
  label: string;
  children?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'order-management': false,
    'stock': true
  });

  const navItems: NavItem[] = [
    { path: '/', icon: BarChart3, label: 'Dashboard' },
    { 
      path: 'order-management',
      icon: Package,
      label: 'Order Management',
      children: [
        { path: '/orders', icon: Package, label: 'Order' },
        { path: '/order-introduction', icon: FileSignature, label: 'Order Intro' },
        { path: '/program-plan', icon: CheckSquare, label: 'Plan' },
        { path: '/order-progress', icon: TrendingUp, label: 'Tracking' },
        { path: '/execution', icon: PlayCircle, label: 'Execution' },
        { path: '/statement', icon: ClipboardList, label: 'Statement' },
      ]
    },
    { path: '/requisition', icon: FileText, label: 'Requisition' },
    { path: '/financial-statement', icon: TrendingUp, label: 'Financial Statement' },
    { path: '/attendance', icon: Users, label: 'Attendance' },
    { path: '/people', icon: Users, label: 'People' },
    {
      path: 'stock',
      icon: Warehouse,
      label: 'Stock',
      children: [
        { path: '/stock', icon: Warehouse, label: 'Stock Control' },
        { path: '/stock-ledger', icon: History, label: 'Stock Ledger' },
        { path: '/data-stock', icon: Warehouse, label: 'Data Stock' },
      ]
    },
    { path: '/reporting', icon: FileText, label: 'Reporting' },
  ];

  const toggleMenu = (path: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const renderNavItem = (item: NavItem) => {
    if (item.children) {
      return (
        <div key={item.path} className="space-y-1">
          <button
            onClick={() => toggleMenu(item.path)}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded transition duration-200 
              ${expandedMenus[item.path] ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
          >
            <div className="flex items-center space-x-3">
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`transform transition-transform duration-200 ${expandedMenus[item.path] ? 'rotate-180' : ''}`}
            />
          </button>
          
          {expandedMenus[item.path] && (
            <div className="ml-4 pl-4 border-l border-gray-700 space-y-1">
              {item.children.map(child => (
                <NavLink
                  key={child.path}
                  to={child.path}
                  onClick={() => onClose()}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-2 rounded transition duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-blue-600 hover:text-white'
                    }`
                  }
                >
                  <child.icon size={18} />
                  <span>{child.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => onClose()}
        className={({ isActive }) =>
          `flex items-center space-x-3 px-4 py-2.5 rounded transition duration-200 ${
            isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-blue-600 hover:text-white'
          }`
        }
      >
        <item.icon size={20} />
        <span>{item.label}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center space-x-2 px-4 py-4">
          <FactoryIcon className="text-2xl" />
          <span className="text-xl font-bold">Space Kahaf ERP</span>
        </div>

        <nav className="mt-8 space-y-2 px-2">
          {navItems.map(renderNavItem)}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;