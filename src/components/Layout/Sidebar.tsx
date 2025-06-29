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
  ClipboardList,
  DollarSign,
  CreditCard,
  Receipt,
  Calculator,
  Banknote,
  Building,
  UserCheck,
  PieChart,
  Activity,
  Shield,
  Database,
  Settings,
  Clock,
  Calendar,
  Award,
  Layers,
  Briefcase,
  Box,
  Search,
  AlertTriangle,
  Eye,
  CheckCircle,
  FileCheck,
  Scale,
  Gavel
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
    'stock': true,
    'finance': false,
    'production-performance': false,
    'hrm': false,
    'extra': false,
    'extra-inventory': false,
    'extra-audit': false
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
    { 
      path: 'finance',
      icon: DollarSign,
      label: 'Finance',
      children: [
        { path: '/finance?tab=dashboard', icon: BarChart3, label: 'Dashboard' },
        { path: '/finance?tab=general-ledger', icon: FileText, label: 'General Ledger' },
        { path: '/finance?tab=accounts-payable', icon: CreditCard, label: 'Accounts Payable' },
        { path: '/finance?tab=accounts-receivable', icon: Receipt, label: 'Accounts Receivable' },
        { path: '/finance?tab=order-costing', icon: Calculator, label: 'অর্ডার কস্টিং' },
        { path: '/finance?tab=cash-bank', icon: Banknote, label: 'ক্যাশ ও ব্যাংক' },
        { path: '/finance?tab=fixed-assets', icon: Building, label: 'Fixed Assets' },
        { path: '/finance?tab=payroll', icon: UserCheck, label: 'পেরোল' },
        { path: '/finance?tab=reporting', icon: PieChart, label: 'রিপোর্টিং' },
      ]
    },
    { 
      path: 'production-performance',
      icon: Activity,
      label: 'Production & Performance',
      children: [
        { path: '/production-performance?tab=dashboard', icon: BarChart3, label: 'ড্যাশবোর্ড' },
        { path: '/production-performance?tab=order-tracking', icon: TrendingUp, label: 'অর্ডার ট্র্যাকিং' },
        { path: '/production-performance?tab=line-performance', icon: Activity, label: 'লাইন পারফরম্যান্স' },
        { path: '/production-performance?tab=quality-control', icon: Shield, label: 'কোয়ালিটি কন্ট্রোল' },
        { path: '/production-performance?tab=data-entry', icon: Database, label: 'ডেটা এন্ট্রি' },
        { path: '/production-performance?tab=reports', icon: FileText, label: 'রিপোর্ট' },
        { path: '/production-performance?tab=settings', icon: Settings, label: 'সেটিংস' },
      ]
    },
    { 
      path: 'hrm',
      icon: Users,
      label: 'HRM',
      children: [
        { path: '/hrm?tab=dashboard', icon: BarChart3, label: 'ড্যাশবোর্ড' },
        { path: '/hrm?tab=attendance', icon: Clock, label: 'হাজিরা' },
        { path: '/hrm?tab=payroll', icon: DollarSign, label: 'বেতন ব্যবস্থাপনা' },
        { path: '/hrm?tab=employees', icon: Users, label: 'কর্মচারী তথ্য' },
        { path: '/hrm?tab=leave-management', icon: Calendar, label: 'ছুটি ব্যবস্থাপনা' },
        { path: '/hrm?tab=performance', icon: Award, label: 'কর্মক্ষমতা মূল্যায়ন' },
        { path: '/hrm?tab=reports', icon: FileText, label: 'রিপোর্ট' },
        { path: '/hrm?tab=settings', icon: Settings, label: 'সেটিংস' },
      ]
    },
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
    { 
      path: 'extra',
      icon: Layers,
      label: 'Extra',
      children: [
        { path: '/extra?tab=dashboard', icon: BarChart3, label: 'ড্যাশবোর্ড' },
        { path: '/extra?tab=company-profile', icon: Building, label: 'কোম্পানি প্রোফাইল' },
        { path: '/extra?tab=compliance', icon: Shield, label: 'কমপ্লায়েন্স' },
        { path: '/extra?tab=logistics', icon: Activity, label: 'লজিস্টিকস' },
        { path: '/extra?tab=vendor-management', icon: Users, label: 'ভেন্ডর ম্যানেজমেন্ট' },
        { path: '/extra?tab=document-management', icon: FileText, label: 'ডকুমেন্ট ম্যানেজমেন্ট' },
        { path: '/extra?tab=facility-management', icon: Building, label: 'ফ্যাসিলিটি ম্যানেজমেন্ট' },
        { path: '/extra?tab=training', icon: Award, label: 'ট্রেনিং ও উন্নয়ন' },
        { path: '/extra?tab=legal-affairs', icon: Briefcase, label: 'আইনি বিষয়াবলী' },
        { path: '/extra?tab=admin-settings', icon: Settings, label: 'অ্যাডমিন সেটিংস' },
      ]
    },
    { 
      path: 'extra-inventory',
      icon: Box,
      label: 'Extra Inventory',
      children: [
        { path: '/extra-inventory?tab=dashboard', icon: BarChart3, label: 'ড্যাশবোর্ড' },
        { path: '/extra-inventory?tab=warehouse-management', icon: Warehouse, label: 'গুদাম ব্যবস্থাপনা' },
        { path: '/extra-inventory?tab=procurement', icon: Package, label: 'ক্রয় ব্যবস্থাপনা' },
        { path: '/extra-inventory?tab=supplier-inventory', icon: Users, label: 'সাপ্লায়ার ইনভেন্টরি' },
        { path: '/extra-inventory?tab=quality-control', icon: Shield, label: 'কোয়ালিটি কন্ট্রোল' },
        { path: '/extra-inventory?tab=inventory-planning', icon: CheckSquare, label: 'ইনভেন্টরি পরিকল্পনা' },
        { path: '/extra-inventory?tab=batch-tracking', icon: Package, label: 'ব্যাচ ট্র্যাকিং' },
        { path: '/extra-inventory?tab=waste-management', icon: Activity, label: 'বর্জ্য ব্যবস্থাপনা' },
        { path: '/extra-inventory?tab=cost-analysis', icon: DollarSign, label: 'খরচ বিশ্লেষণ' },
        { path: '/extra-inventory?tab=reports', icon: FileText, label: 'রিপোর্ট' },
        { path: '/extra-inventory?tab=settings', icon: Settings, label: 'সেটিংস' },
      ]
    },
    { 
      path: 'extra-audit',
      icon: Search,
      label: 'Extra Audit',
      children: [
        { path: '/extra-audit?tab=dashboard', icon: BarChart3, label: 'অডিট ড্যাশবোর্ড' },
        { path: '/extra-audit?tab=internal-audit', icon: Eye, label: 'অভ্যন্তরীণ অডিট' },
        { path: '/extra-audit?tab=external-audit', icon: Search, label: 'বাহ্যিক অডিট' },
        { path: '/extra-audit?tab=compliance-audit', icon: Shield, label: 'কমপ্লায়েন্স অডিট' },
        { path: '/extra-audit?tab=financial-audit', icon: DollarSign, label: 'আর্থিক অডিট' },
        { path: '/extra-audit?tab=operational-audit', icon: Activity, label: 'পরিচালনা অডিট' },
        { path: '/extra-audit?tab=quality-audit', icon: CheckCircle, label: 'গুণগত মান অডিট' },
        { path: '/extra-audit?tab=social-audit', icon: Users, label: 'সামাজিক অডিট' },
        { path: '/extra-audit?tab=environmental-audit', icon: Layers, label: 'পরিবেশগত অডিট' },
        { path: '/extra-audit?tab=risk-assessment', icon: AlertTriangle, label: 'ঝুঁকি মূল্যায়ন' },
        { path: '/extra-audit?tab=audit-planning', icon: Calendar, label: 'অডিট পরিকল্পনা' },
        { path: '/extra-audit?tab=findings-tracking', icon: FileCheck, label: 'ফলাফল ট্র্যাকিং' },
        { path: '/extra-audit?tab=corrective-actions', icon: CheckSquare, label: 'সংশোধনী ব্যবস্থা' },
        { path: '/extra-audit?tab=audit-reports', icon: FileText, label: 'অডিট রিপোর্ট' },
        { path: '/extra-audit?tab=legal-compliance', icon: Scale, label: 'আইনি সম্মতি' },
        { path: '/extra-audit?tab=certification-management', icon: Award, label: 'সার্টিফিকেশন ব্যবস্থাপনা' },
        { path: '/extra-audit?tab=vendor-audit', icon: Building, label: 'ভেন্ডর অডিট' },
        { path: '/extra-audit?tab=audit-settings', icon: Settings, label: 'অডিট সেটিংস' },
      ]
    },
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