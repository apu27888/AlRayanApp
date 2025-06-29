import React, { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { 
  BarChart3,
  Eye,
  Search,
  Shield,
  DollarSign,
  Activity,
  CheckCircle,
  Users,
  Layers,
  AlertTriangle,
  Calendar,
  FileCheck,
  CheckSquare,
  FileText,
  Scale,
  Award,
  Building,
  Settings,
  Plus,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Zap,
  XCircle,
  Edit,
  Trash2
} from 'lucide-react';
import Button from '../components/UI/Button';
import StatusBadge from '../components/UI/StatusBadge';
import ProgressBar from '../components/UI/ProgressBar';

const ExtraAudit: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dashboard');

  useEffect(() => {
    setPageTitle('Extra Audit Management');
  }, [setPageTitle]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const tabs = [
    { id: 'dashboard', label: 'অডিট ড্যাশবোর্ড', icon: BarChart3 },
    { id: 'internal-audit', label: 'অভ্যন্তরীণ অডিট', icon: Eye },
    { id: 'external-audit', label: 'বাহ্যিক অডিট', icon: Search },
    { id: 'compliance-audit', label: 'কমপ্লায়েন্স অডিট', icon: Shield },
    { id: 'financial-audit', label: 'আর্থিক অডিট', icon: DollarSign },
    { id: 'operational-audit', label: 'পরিচালনা অডিট', icon: Activity },
    { id: 'quality-audit', label: 'গুণগত মান অডিট', icon: CheckCircle },
    { id: 'social-audit', label: 'সামাজিক অডিট', icon: Users },
    { id: 'environmental-audit', label: 'পরিবেশগত অডিট', icon: Layers },
    { id: 'risk-assessment', label: 'ঝুঁকি মূল্যায়ন', icon: AlertTriangle },
    { id: 'audit-planning', label: 'অডিট পরিকল্পনা', icon: Calendar },
    { id: 'findings-tracking', label: 'ফলাফল ট্র্যাকিং', icon: FileCheck },
    { id: 'corrective-actions', label: 'সংশোধনী ব্যবস্থা', icon: CheckSquare },
    { id: 'audit-reports', label: 'অডিট রিপোর্ট', icon: FileText },
    { id: 'legal-compliance', label: 'আইনি সম্মতি', icon: Scale },
    { id: 'certification-management', label: 'সার্টিফিকেশন ব্যবস্থাপনা', icon: Award },
    { id: 'vendor-audit', label: 'ভেন্ডর অডিট', icon: Building },
    { id: 'audit-settings', label: 'অডিট সেটিংস', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">অডিট ড্যাশবোর্ড</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>এই মাস</option>
            <option>গত মাস</option>
            <option>এই কোয়ার্টার</option>
            <option>এই বছর</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            রিপোর্ট এক্সপোর্ট
          </Button>
        </div>
      </div>

      {/* Key Audit Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">মোট অডিট</p>
              <p className="text-2xl font-bold text-blue-600">24</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +3 এই মাসে
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Search className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">সম্পন্ন অডিট</p>
              <p className="text-2xl font-bold text-green-600">18</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <CheckCircle size={12} className="mr-1" />
                75% সম্পন্ন হার
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">চলমান অডিট</p>
              <p className="text-2xl font-bold text-yellow-600">4</p>
              <p className="text-xs text-yellow-500 flex items-center mt-1">
                <Clock size={12} className="mr-1" />
                প্রক্রিয়াধীন
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">ঝুঁকিপূর্ণ এলাকা</p>
              <p className="text-2xl font-bold text-red-600">2</p>
              <p className="text-xs text-red-500 flex items-center mt-1">
                <AlertTriangle size={12} className="mr-1" />
                উচ্চ অগ্রাধিকার
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Audit Types Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <BarChart3 className="mr-2" size={20} />
            অডিট প্রকার অনুযায়ী স্ট্যাটাস
          </h4>
          <div className="space-y-4">
            {[
              { type: 'আর্থিক অডিট', total: 6, completed: 5, inProgress: 1, pending: 0 },
              { type: 'কমপ্লায়েন্স অডিট', total: 8, completed: 6, inProgress: 2, pending: 0 },
              { type: 'গুণগত মান অডিট', total: 4, completed: 3, inProgress: 1, pending: 0 },
              { type: 'সামাজিক অডিট', total: 3, completed: 2, inProgress: 0, pending: 1 },
              { type: 'পরিবেশগত অডিট', total: 3, completed: 2, inProgress: 0, pending: 1 }
            ].map((audit, index) => {
              const completionRate = (audit.completed / audit.total) * 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{audit.type}</span>
                    <span className="text-gray-600">{audit.completed}/{audit.total}</span>
                  </div>
                  <ProgressBar 
                    progress={completionRate} 
                    color={completionRate >= 80 ? 'green' : completionRate >= 60 ? 'yellow' : 'red'}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>সম্পন্ন: {audit.completed}</span>
                    <span>চলমান: {audit.inProgress}</span>
                    <span>অপেক্ষমাণ: {audit.pending}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Audit Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Activity className="mr-2" size={20} />
            সাম্প্রতিক অডিট কার্যক্রম
          </h4>
          <div className="space-y-3">
            {[
              { time: '10:30 AM', activity: 'আর্থিক অডিট সম্পন্ন', auditor: 'মোঃ রহিম', type: 'completed' },
              { time: '09:15 AM', activity: 'কমপ্লায়েন্স অডিট শুরু', auditor: 'ফাতিমা খাতুন', type: 'started' },
              { time: '08:45 AM', activity: 'ঝুঁকি মূল্যায়ন রিপোর্ট জমা', auditor: 'করিম মিয়া', type: 'report' },
              { time: '08:30 AM', activity: 'সংশোধনী ব্যবস্থা অনুমোদন', auditor: 'সালমা বেগম', type: 'approved' },
              { time: '08:00 AM', activity: 'নতুন অডিট পরিকল্পনা তৈরি', auditor: 'আবুল কালাম', type: 'planning' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'completed' ? 'bg-green-500' :
                  activity.type === 'started' ? 'bg-blue-500' :
                  activity.type === 'report' ? 'bg-purple-500' :
                  activity.type === 'approved' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.activity}</p>
                  <p className="text-xs text-gray-600">{activity.auditor} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 flex items-center">
          <Shield className="mr-2" size={20} />
          কমপ্লায়েন্স স্ট্যাটাস
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              standard: 'ISO 9001:2015', 
              status: 'Certified', 
              expiry: '2025-12-31', 
              compliance: 95,
              color: 'green'
            },
            { 
              standard: 'WRAP Certification', 
              status: 'In Progress', 
              expiry: '2025-06-30', 
              compliance: 78,
              color: 'yellow'
            },
            { 
              standard: 'BSCI Code of Conduct', 
              status: 'Certified', 
              expiry: '2025-09-15', 
              compliance: 92,
              color: 'green'
            }
          ].map((cert, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold text-sm">{cert.standard}</h5>
                  <p className="text-xs text-gray-600">মেয়াদ: {cert.expiry}</p>
                </div>
                <StatusBadge status={cert.status} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>কমপ্লায়েন্স:</span>
                  <span className={`font-semibold ${
                    cert.compliance >= 90 ? 'text-green-600' : 
                    cert.compliance >= 75 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {cert.compliance}%
                  </span>
                </div>
                <ProgressBar 
                  progress={cert.compliance} 
                  color={cert.color as any}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">দ্রুত কার্যক্রম</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 h-20"
            onClick={() => handleTabChange('audit-planning')}
          >
            <Calendar size={24} />
            <span className="text-sm">নতুন অডিট পরিকল্পনা</span>
          </Button>
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 h-20"
            onClick={() => handleTabChange('risk-assessment')}
          >
            <AlertTriangle size={24} />
            <span className="text-sm">ঝুঁকি মূল্যায়ন</span>
          </Button>
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 h-20"
            onClick={() => handleTabChange('findings-tracking')}
          >
            <FileCheck size={24} />
            <span className="text-sm">ফলাফল ট্র্যাকিং</span>
          </Button>
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 h-20"
            onClick={() => handleTabChange('audit-reports')}
          >
            <FileText size={24} />
            <span className="text-sm">অডিট রিপোর্ট</span>
          </Button>
        </div>
      </div>
    </div>
  );

  const renderInternalAudit = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">অভ্যন্তরীণ অডিট</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <Filter size={16} className="mr-2" />
            ফিল্টার
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            নতুন অভ্যন্তরীণ অডিট
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">অডিট আইডি</th>
                <th className="p-3 font-semibold text-sm">বিভাগ</th>
                <th className="p-3 font-semibold text-sm">অডিটর</th>
                <th className="p-3 font-semibold text-sm">শুরুর তারিখ</th>
                <th className="p-3 font-semibold text-sm">শেষের তারিখ</th>
                <th className="p-3 font-semibold text-sm">অগ্রগতি</th>
                <th className="p-3 font-semibold text-sm">স্ট্যাটাস</th>
                <th className="p-3 font-semibold text-sm">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'IA-001', dept: 'Production', auditor: 'মোঃ রহিম', start: '2025-01-15', end: '2025-01-20', progress: 85, status: 'In Progress' },
                { id: 'IA-002', dept: 'Finance', auditor: 'ফাতিমা খাতুন', start: '2025-01-10', end: '2025-01-15', progress: 100, status: 'Completed' },
                { id: 'IA-003', dept: 'HR', auditor: 'করিম মিয়া', start: '2025-01-20', end: '2025-01-25', progress: 45, status: 'In Progress' }
              ].map((audit, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-blue-600">{audit.id}</td>
                  <td className="p-3 text-sm">{audit.dept}</td>
                  <td className="p-3 text-sm">{audit.auditor}</td>
                  <td className="p-3 text-sm">{audit.start}</td>
                  <td className="p-3 text-sm">{audit.end}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <ProgressBar progress={audit.progress} color={audit.progress >= 80 ? 'green' : audit.progress >= 50 ? 'yellow' : 'red'} />
                      <span className="text-sm font-medium">{audit.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <StatusBadge status={audit.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderExternalAudit = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">বাহ্যিক অডিট</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন বাহ্যিক অডিট
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">অডিট আইডি</th>
                <th className="p-3 font-semibold text-sm">অডিট ফার্ম</th>
                <th className="p-3 font-semibold text-sm">অডিট প্রকার</th>
                <th className="p-3 font-semibold text-sm">শুরুর তারিখ</th>
                <th className="p-3 font-semibold text-sm">শেষের তারিখ</th>
                <th className="p-3 font-semibold text-sm">খরচ</th>
                <th className="p-3 font-semibold text-sm">স্ট্যাটাস</th>
                <th className="p-3 font-semibold text-sm">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'EA-001', firm: 'ABC Audit & Co.', type: 'Financial Audit', start: '2025-01-10', end: '2025-01-25', cost: '৳2,50,000', status: 'Completed' },
                { id: 'EA-002', firm: 'XYZ Compliance Ltd.', type: 'WRAP Certification', start: '2025-01-15', end: '2025-02-15', cost: '৳3,00,000', status: 'In Progress' },
                { id: 'EA-003', firm: 'Quality Assurance Inc.', type: 'ISO 9001 Audit', start: '2025-02-01', end: '2025-02-10', cost: '৳1,75,000', status: 'Scheduled' }
              ].map((audit, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-blue-600">{audit.id}</td>
                  <td className="p-3 text-sm">{audit.firm}</td>
                  <td className="p-3 text-sm">{audit.type}</td>
                  <td className="p-3 text-sm">{audit.start}</td>
                  <td className="p-3 text-sm">{audit.end}</td>
                  <td className="p-3 text-sm font-semibold">{audit.cost}</td>
                  <td className="p-3">
                    <StatusBadge status={audit.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderComplianceAudit = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">কমপ্লায়েন্স অডিট</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন কমপ্লায়েন্স অডিট
        </Button>
      </div>

      {/* Compliance Standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">সক্রিয় স্ট্যান্ডার্ড</p>
              <p className="text-2xl font-bold text-blue-600">8</p>
            </div>
            <Shield className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">সার্টিফাইড</p>
              <p className="text-2xl font-bold text-green-600">6</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">মেয়াদ শেষ হবে</p>
              <p className="text-2xl font-bold text-orange-600">2</p>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">কমপ্লায়েন্স স্ট্যান্ডার্ড</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">স্ট্যান্ডার্ড</th>
                <th className="p-3 font-semibold text-sm">সার্টিফিকেশন বডি</th>
                <th className="p-3 font-semibold text-sm">সার্টিফিকেশন তারিখ</th>
                <th className="p-3 font-semibold text-sm">মেয়াদ শেষ</th>
                <th className="p-3 font-semibold text-sm">কমপ্লায়েন্স স্কোর</th>
                <th className="p-3 font-semibold text-sm">স্ট্যাটাস</th>
                <th className="p-3 font-semibold text-sm">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              {[
                { standard: 'ISO 9001:2015', body: 'SGS', certified: '2023-01-15', expiry: '2025-12-31', score: 95, status: 'Certified' },
                { standard: 'WRAP Certification', body: 'WRAP', certified: '2023-06-20', expiry: '2025-06-30', score: 88, status: 'Certified' },
                { standard: 'BSCI Code of Conduct', body: 'BSCI', certified: '2023-09-10', expiry: '2025-09-15', score: 92, status: 'Certified' },
                { standard: 'OEKO-TEX Standard 100', body: 'OEKO-TEX', certified: '-', expiry: '-', score: 65, status: 'In Progress' }
              ].map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{item.standard}</td>
                  <td className="p-3 text-sm">{item.body}</td>
                  <td className="p-3 text-sm">{item.certified}</td>
                  <td className="p-3 text-sm">{item.expiry}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <ProgressBar progress={item.score} color={item.score >= 90 ? 'green' : item.score >= 75 ? 'yellow' : 'red'} />
                      <span className="text-sm font-medium">{item.score}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFinancialAudit = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">আর্থিক অডিট</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন আর্থিক অডিট
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">আর্থিক অডিট সামারি</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">অডিট পিরিয়ড</th>
                <th className="p-3 font-semibold text-sm">অডিটর</th>
                <th className="p-3 font-semibold text-sm">ফোকাস এরিয়া</th>
                <th className="p-3 font-semibold text-sm">ফাইন্ডিংস</th>
                <th className="p-3 font-semibold text-sm">রিস্ক লেভেল</th>
                <th className="p-3 font-semibold text-sm">স্ট্যাটাস</th>
                <th className="p-3 font-semibold text-sm">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              {[
                { period: 'Q4 2024', auditor: 'ABC Audit & Co.', focus: 'Revenue Recognition', findings: 3, risk: 'Low', status: 'Completed' },
                { period: 'Q3 2024', auditor: 'Internal Team', focus: 'Inventory Valuation', findings: 5, risk: 'Medium', status: 'Completed' },
                { period: 'Q2 2024', auditor: 'XYZ Auditors', focus: 'Cash Management', findings: 2, risk: 'Low', status: 'Completed' },
                { period: 'Q1 2025', auditor: 'Internal Team', focus: 'Accounts Payable', findings: 0, risk: 'Low', status: 'In Progress' }
              ].map((audit, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{audit.period}</td>
                  <td className="p-3 text-sm">{audit.auditor}</td>
                  <td className="p-3 text-sm">{audit.focus}</td>
                  <td className="p-3 text-sm">{audit.findings}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      audit.risk === 'Low' ? 'bg-green-100 text-green-800' :
                      audit.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {audit.risk}
                    </span>
                  </td>
                  <td className="p-3">
                    <StatusBadge status={audit.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <FileText size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOperationalAudit = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">পরিচালনা অডিট</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন পরিচালনা অডিট
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">পরিচালনা দক্ষতা অডিট</h4>
        <div className="space-y-4">
          {[
            { process: 'Production Planning', efficiency: 85, target: 90, status: 'Needs Improvement' },
            { process: 'Inventory Management', efficiency: 92, target: 85, status: 'Excellent' },
            { process: 'Quality Control', efficiency: 88, target: 90, status: 'Good' },
            { process: 'Supply Chain', efficiency: 78, target: 85, status: 'Needs Improvement' },
            { process: 'Customer Service', efficiency: 95, target: 90, status: 'Excellent' }
          ].map((item, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-semibold">{item.process}</h5>
                <StatusBadge status={item.status} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>বর্তমান দক্ষতা: {item.efficiency}%</span>
                  <span>লক্ষ্য: {item.target}%</span>
                </div>
                <ProgressBar 
                  progress={item.efficiency} 
                  color={item.efficiency >= item.target ? 'green' : item.efficiency >= item.target - 10 ? 'yellow' : 'red'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQualityAudit = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">গুণগত মান অডিট</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন গুণগত মান অডিট
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">গুণগত মান মেট্রিক্স</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { metric: 'Defect Rate', current: 2.5, target: 3.0, unit: '%', trend: 'down' },
            { metric: 'First Pass Yield', current: 96.8, target: 95.0, unit: '%', trend: 'up' },
            { metric: 'Customer Complaints', current: 0.8, target: 1.0, unit: '%', trend: 'down' },
            { metric: 'Rework Rate', current: 1.2, target: 2.0, unit: '%', trend: 'down' }
          ].map((metric, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-semibold">{metric.metric}</h5>
                {metric.trend === 'up' ? (
                  <TrendingUp className="text-green-500" size={20} />
                ) : (
                  <TrendingDown className="text-green-500" size={20} />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-2xl font-bold text-blue-600">{metric.current}{metric.unit}</span>
                  <span className="text-sm text-gray-600">Target: {metric.target}{metric.unit}</span>
                </div>
                <ProgressBar 
                  progress={metric.metric.includes('Rate') || metric.metric.includes('Complaints') ? 
                    100 - (metric.current / metric.target * 100) : 
                    (metric.current / metric.target * 100)
                  } 
                  color="green"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSocialAudit = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">সামাজিক অডিট</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন সামাজিক অডিট
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">সামাজিক দায়বদ্ধতা মূল্যায়ন</h4>
        <div className="space-y-4">
          {[
            { area: 'কর্মক্ষেত্রে নিরাপত্তা', score: 92, maxScore: 100, status: 'Excellent' },
            { area: 'কর্মচারী কল্যাণ', score: 88, maxScore: 100, status: 'Good' },
            { area: 'শিশুশ্রম প্রতিরোধ', score: 100, maxScore: 100, status: 'Excellent' },
            { area: 'লিঙ্গ সমতা', score: 85, maxScore: 100, status: 'Good' },
            { area: 'কমিউনিটি উন্নয়ন', score: 78, maxScore: 100, status: 'Needs Improvement' }
          ].map((area, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-semibold">{area.area}</h5>
                <StatusBadge status={area.status} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>স্কোর: {area.score}/{area.maxScore}</span>
                  <span>{((area.score / area.maxScore) * 100).toFixed(1)}%</span>
                </div>
                <ProgressBar 
                  progress={(area.score / area.maxScore) * 100} 
                  color={area.score >= 90 ? 'green' : area.score >= 80 ? 'yellow' : 'red'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEnvironmentalAudit = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">পরিবেশগত অডিট</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন পরিবেশগত অডিট
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">পরিবেশগত প্রভাব মূল্যায়ন</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { indicator: 'পানি ব্যবহার', current: 15.2, target: 18.0, unit: 'L/piece', status: 'Good' },
            { indicator: 'বিদ্যুৎ খরচ', current: 2.8, target: 3.2, unit: 'kWh/piece', status: 'Good' },
            { indicator: 'বর্জ্য উৎপাদন', current: 0.85, target: 1.0, unit: 'kg/piece', status: 'Excellent' },
            { indicator: 'কার্বন নিঃসরণ', current: 4.2, target: 5.0, unit: 'kg CO2/piece', status: 'Good' }
          ].map((indicator, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-semibold">{indicator.indicator}</h5>
                <StatusBadge status={indicator.status} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-blue-600">{indicator.current} {indicator.unit}</span>
                  <span className="text-sm text-gray-600">Target: ≤{indicator.target} {indicator.unit}</span>
                </div>
                <ProgressBar 
                  progress={100 - (indicator.current / indicator.target * 100)} 
                  color={indicator.current <= indicator.target * 0.8 ? 'green' : indicator.current <= indicator.target ? 'yellow' : 'red'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRiskAssessment = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ঝুঁকি মূল্যায়ন</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন ঝুঁকি মূল্যায়ন
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">ঝুঁকি ম্যাট্রিক্স</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">ঝুঁকির ধরন</th>
                <th className="p-3 font-semibold text-sm">বিবরণ</th>
                <th className="p-3 font-semibold text-sm">সম্ভাবনা</th>
                <th className="p-3 font-semibold text-sm">প্রভাব</th>
                <th className="p-3 font-semibold text-sm">ঝুঁকি স্তর</th>
                <th className="p-3 font-semibold text-sm">প্রশমন ব্যবস্থা</th>
                <th className="p-3 font-semibold text-sm">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'আর্থিক', desc: 'মুদ্রার হার পরিবর্তন', probability: 'Medium', impact: 'High', level: 'High', mitigation: 'Hedging Strategy' },
                { type: 'পরিচালনা', desc: 'সাপ্লাই চেইন বিঘ্ন', probability: 'Low', impact: 'High', level: 'Medium', mitigation: 'Multiple Suppliers' },
                { type: 'কমপ্লায়েন্স', desc: 'নিয়ম পরিবর্তন', probability: 'Medium', impact: 'Medium', level: 'Medium', mitigation: 'Regular Monitoring' },
                { type: 'প্রযুক্তিগত', desc: 'সিস্টেম ব্যর্থতা', probability: 'Low', impact: 'Medium', level: 'Low', mitigation: 'Backup Systems' }
              ].map((risk, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{risk.type}</td>
                  <td className="p-3 text-sm">{risk.desc}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      risk.probability === 'High' ? 'bg-red-100 text-red-800' :
                      risk.probability === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {risk.probability}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      risk.impact === 'High' ? 'bg-red-100 text-red-800' :
                      risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {risk.impact}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      risk.level === 'High' ? 'bg-red-100 text-red-800' :
                      risk.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {risk.level}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{risk.mitigation}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAuditPlanning = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">অডিট পরিকল্পনা</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন অডিট পরিকল্পনা
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">বার্ষিক অডিট পরিকল্পনা ২০২৫</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">অডিট প্রকার</th>
                <th className="p-3 font-semibold text-sm">বিভাগ/এলাকা</th>
                <th className="p-3 font-semibold text-sm">পরিকল্পিত তারিখ</th>
                <th className="p-3 font-semibold text-sm">দায়িত্বপ্রাপ্ত</th>
                <th className="p-3 font-semibold text-sm">অগ্রাধিকার</th>
                <th className="p-3 font-semibold text-sm">স্ট্যাটাস</th>
                <th className="p-3 font-semibold text-sm">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'আর্থিক অডিট', area: 'Finance Department', date: '2025-03-15', assignee: 'মোঃ রহিম', priority: 'High', status: 'Planned' },
                { type: 'কমপ্লায়েন্স অডিট', area: 'Production Floor', date: '2025-04-10', assignee: 'ফাতিমা খাতুন', priority: 'High', status: 'Planned' },
                { type: 'গুণগত মান অডিট', area: 'Quality Control', date: '2025-05-20', assignee: 'করিম মিয়া', priority: 'Medium', status: 'Planned' },
                { type: 'সামাজিক অডিট', area: 'HR Department', date: '2025-06-15', assignee: 'সালমা বেগম', priority: 'Medium', status: 'Planned' }
              ].map((plan, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{plan.type}</td>
                  <td className="p-3 text-sm">{plan.area}</td>
                  <td className="p-3 text-sm">{plan.date}</td>
                  <td className="p-3 text-sm">{plan.assignee}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      plan.priority === 'High' ? 'bg-red-100 text-red-800' :
                      plan.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {plan.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <StatusBadge status={plan.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Edit size={14} />
                      </Button>
                      <Button size="sm" variant="danger">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFindingsTracking = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ফলাফল ট্র্যাকিং</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন ফাইন্ডিং
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">ফাইন্ডিং আইডি</th>
                <th className="p-3 font-semibold text-sm">অডিট প্রকার</th>
                <th className="p-3 font-semibold text-sm">বিবরণ</th>
                <th className="p-3 font-semibold text-sm">গুরুত্ব</th>
                <th className="p-3 font-semibold text-sm">দায়িত্বপ্রাপ্ত</th>
                <th className="p-3 font-semibold text-sm">সমাধানের তারিখ</th>
                <th className="p-3 font-semibold text-sm">স্ট্যাটাস</th>
                <th className="p-3 font-semibold text-sm">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'F-001', type: 'Financial', desc: 'Inventory reconciliation discrepancy', severity: 'High', assignee: 'Finance Manager', due: '2025-02-15', status: 'Open' },
                { id: 'F-002', type: 'Compliance', desc: 'Missing safety training records', severity: 'Medium', assignee: 'HR Manager', due: '2025-02-10', status: 'In Progress' },
                { id: 'F-003', type: 'Quality', desc: 'Quality control documentation gaps', severity: 'Low', assignee: 'QC Manager', due: '2025-02-20', status: 'Resolved' },
                { id: 'F-004', type: 'Operational', desc: 'Process efficiency improvement needed', severity: 'Medium', assignee: 'Production Manager', due: '2025-02-25', status: 'Open' }
              ].map((finding, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-blue-600">{finding.id}</td>
                  <td className="p-3 text-sm">{finding.type}</td>
                  <td className="p-3 text-sm">{finding.desc}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      finding.severity === 'High' ? 'bg-red-100 text-red-800' :
                      finding.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {finding.severity}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{finding.assignee}</td>
                  <td className="p-3 text-sm">{finding.due}</td>
                  <td className="p-3">
                    <StatusBadge status={finding.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCorrectiveActions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">সংশোধনী ব্যবস্থা</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন সংশোধনী ব্যবস্থা
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">অ্যাকশন আইডি</th>
                <th className="p-3 font-semibold text-sm">সম্পর্কিত ফাইন্ডিং</th>
                <th className="p-3 font-semibold text-sm">সংশোধনী ব্যবস্থা</th>
                <th className="p-3 font-semibold text-sm">দায়িত্বপ্রাপ্ত</th>
                <th className="p-3 font-semibold text-sm">সমাধানের তারিখ</th>
                <th className="p-3 font-semibold text-sm">অগ্রগতি</th>
                <th className="p-3 font-semibold text-sm">স্ট্যাটাস</th>
                <th className="p-3 font-semibold text-sm">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'CA-001', finding: 'F-001', action: 'Implement monthly inventory reconciliation process', assignee: 'Finance Team', due: '2025-02-15', progress: 75, status: 'In Progress' },
                { id: 'CA-002', finding: 'F-002', action: 'Update safety training database and schedule refresher training', assignee: 'HR Team', due: '2025-02-10', progress: 90, status: 'In Progress' },
                { id: 'CA-003', finding: 'F-003', action: 'Standardize QC documentation templates', assignee: 'QC Team', due: '2025-02-20', progress: 100, status: 'Completed' },
                { id: 'CA-004', finding: 'F-004', action: 'Conduct process mapping and identify improvement opportunities', assignee: 'Production Team', due: '2025-02-25', progress: 25, status: 'In Progress' }
              ].map((action, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-blue-600">{action.id}</td>
                  <td className="p-3 text-sm text-purple-600">{action.finding}</td>
                  <td className="p-3 text-sm">{action.action}</td>
                  <td className="p-3 text-sm">{action.assignee}</td>
                  <td className="p-3 text-sm">{action.due}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <ProgressBar progress={action.progress} color={action.progress >= 80 ? 'green' : action.progress >= 50 ? 'yellow' : 'red'} />
                      <span className="text-sm font-medium">{action.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <StatusBadge status={action.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAuditReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">অডিট রিপোর্ট</h3>
        <Button size="sm">
          <Download size={16} className="mr-2" />
          রিপোর্ট জেনারেট করুন
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'আর্থিক অডিট রিপোর্ট', description: 'মাসিক আর্থিক অডিট সামারি', icon: DollarSign, color: 'blue' },
          { title: 'কমপ্লায়েন্স রিপোর্ট', description: 'কমপ্লায়েন্স স্ট্যাটাস এবং সার্টিফিকেশন', icon: Shield, color: 'green' },
          { title: 'গুণগত মান রিপোর্ট', description: 'গুণগত মান মেট্রিক্স এবং ট্রেন্ড', icon: CheckCircle, color: 'purple' },
          { title: 'সামাজিক অডিট রিপোর্ট', description: 'কর্মচারী কল্যাণ এবং সামাজিক দায়বদ্ধতা', icon: Users, color: 'orange' },
          { title: 'পরিবেশগত রিপোর্ট', description: 'পরিবেশগত প্রভাব এবং টেকসই উন্নয়ন', icon: Layers, color: 'yellow' },
          { title: 'ঝুঁকি মূল্যায়ন রিপোর্ট', description: 'ঝুঁকি বিশ্লেষণ এবং প্রশমন কৌশল', icon: AlertTriangle, color: 'red' }
        ].map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className={`w-12 h-12 rounded-lg bg-${report.color}-100 flex items-center justify-center mb-4`}>
              <report.icon className={`text-${report.color}-600`} size={24} />
            </div>
            <h4 className="font-semibold text-lg mb-2">{report.title}</h4>
            <p className="text-gray-600 text-sm mb-4">{report.description}</p>
            <Button size="sm" variant="secondary" className="w-full">
              <FileText size={14} className="mr-2" />
              জেনারেট করুন
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLegalCompliance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">আইনি সম্মতি</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন আইনি প্রয়োজনীয়তা
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">আইনি প্রয়োজনীয়তা ট্র্যাকিং</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">আইন/নিয়ম</th>
                <th className="p-3 font-semibold text-sm">বিভাগ</th>
                <th className="p-3 font-semibold text-sm">প্রয়োজনীয়তা</th>
                <th className="p-3 font-semibold text-sm">সম্মতি স্ট্যাটাস</th>
                <th className="p-3 font-semibold text-sm">শেষ পর্যালোচনা</th>
                <th className="p-3 font-semibold text-sm">পরবর্তী পর্যালোচনা</th>
                <th className="p-3 font-semibold text-sm">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              {[
                { law: 'শ্রম আইন ২০০৬', dept: 'HR', requirement: 'কর্মঘণ্টা এবং ওভারটাইম নিয়ম', status: 'Compliant', lastReview: '2024-12-15', nextReview: '2025-06-15' },
                { law: 'পরিবেশ সংরক্ষণ আইন', dept: 'Production', requirement: 'বর্জ্য ব্যবস্থাপনা এবং নিঃসরণ নিয়ন্ত্রণ', status: 'Compliant', lastReview: '2024-11-20', nextReview: '2025-05-20' },
                { law: 'কারখানা আইন ১৯৬৫', dept: 'Safety', requirement: 'কর্মক্ষেত্রে নিরাপত্তা ব্যবস্থা', status: 'Partial', lastReview: '2024-10-10', nextReview: '2025-04-10' },
                { law: 'আয়কর আইন', dept: 'Finance', requirement: 'কর প্রদান এবং রিটার্ন দাখিল', status: 'Compliant', lastReview: '2024-12-31', nextReview: '2025-12-31' }
              ].map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{item.law}</td>
                  <td className="p-3 text-sm">{item.dept}</td>
                  <td className="p-3 text-sm">{item.requirement}</td>
                  <td className="p-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-3 text-sm">{item.lastReview}</td>
                  <td className="p-3 text-sm">{item.nextReview}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCertificationManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">সার্টিফিকেশন ব্যবস্থাপনা</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন সার্টিফিকেশন
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">সার্টিফিকেশন</th>
                <th className="p-3 font-semibold text-sm">ইস্যুকারী সংস্থা</th>
                <th className="p-3 font-semibold text-sm">ইস্যুর তারিখ</th>
                <th className="p-3 font-semibold text-sm">মেয়াদ শেষ</th>
                <th className="p-3 font-semibold text-sm">নবায়নের তারিখ</th>
                <th className="p-3 font-semibold text-sm">স্ট্যাটাস</th>
                <th className="p-3 font-semibold text-sm">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cert: 'ISO 9001:2015', issuer: 'SGS Bangladesh', issued: '2023-01-15', expiry: '2025-12-31', renewal: '2025-10-01', status: 'Active' },
                { cert: 'WRAP Certification', issuer: 'WRAP', issued: '2023-06-20', expiry: '2025-06-30', renewal: '2025-04-01', status: 'Active' },
                { cert: 'BSCI Code of Conduct', issuer: 'BSCI', issued: '2023-09-10', expiry: '2025-09-15', renewal: '2025-07-01', status: 'Active' },
                { cert: 'OEKO-TEX Standard 100', issuer: 'OEKO-TEX', issued: '-', expiry: '-', renewal: '2025-03-01', status: 'In Progress' }
              ].map((cert, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{cert.cert}</td>
                  <td className="p-3 text-sm">{cert.issuer}</td>
                  <td className="p-3 text-sm">{cert.issued}</td>
                  <td className="p-3 text-sm">{cert.expiry}</td>
                  <td className="p-3 text-sm">{cert.renewal}</td>
                  <td className="p-3">
                    <StatusBadge status={cert.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderVendorAudit = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ভেন্ডর অডিট</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন ভেন্ডর অডিট
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">ভেন্ডর নাম</th>
                <th className="p-3 font-semibold text-sm">ভেন্ডর ধরন</th>
                <th className="p-3 font-semibold text-sm">অডিট তারিখ</th>
                <th className="p-3 font-semibold text-sm">অডিটর</th>
                <th className="p-3 font-semibold text-sm">স্কোর</th>
                <th className="p-3 font-semibold text-sm">ঝুঁকি স্তর</th>
                <th className="p-3 font-semibold text-sm">পরবর্তী অডিট</th>
                <th className="p-3 font-semibold text-sm">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody>
              {[
                { vendor: 'ABC Trims Ltd.', type: 'Accessories Supplier', date: '2024-12-15', auditor: 'মোঃ রহিম', score: 85, risk: 'Low', next: '2025-12-15' },
                { vendor: 'XYZ Fabrics', type: 'Fabric Supplier', date: '2024-11-20', auditor: 'ফাতিমা খাতুন', score: 78, risk: 'Medium', next: '2025-05-20' },
                { vendor: 'Cotton Mills Ltd.', type: 'Raw Material', date: '2024-10-10', auditor: 'করিম মিয়া', score: 92, risk: 'Low', next: '2025-10-10' },
                { vendor: 'Quality Chemicals', type: 'Chemical Supplier', date: '2024-09-05', auditor: 'সালমা বেগম', score: 65, risk: 'High', next: '2025-03-05' }
              ].map((vendor, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{vendor.vendor}</td>
                  <td className="p-3 text-sm">{vendor.type}</td>
                  <td className="p-3 text-sm">{vendor.date}</td>
                  <td className="p-3 text-sm">{vendor.auditor}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <ProgressBar progress={vendor.score} color={vendor.score >= 80 ? 'green' : vendor.score >= 70 ? 'yellow' : 'red'} />
                      <span className="text-sm font-medium">{vendor.score}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vendor.risk === 'Low' ? 'bg-green-100 text-green-800' :
                      vendor.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {vendor.risk}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{vendor.next}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAuditSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">অডিট সেটিংস</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">অডিট ফ্রিকোয়েন্সি</h4>
          <div className="space-y-4">
            {[
              { type: 'আর্থিক অডিট', frequency: 'মাসিক' },
              { type: 'কমপ্লায়েন্স অডিট', frequency: 'ত্রৈমাসিক' },
              { type: 'গুণগত মান অডিট', frequency: 'মাসিক' },
              { type: 'সামাজিক অডিট', frequency: 'বার্ষিক' }
            ].map((audit, index) => (
              <div key={index} className="flex items-center justify-between">
                <label className="text-sm font-medium">{audit.type}</label>
                <select
                  defaultValue={audit.frequency}
                  className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="সাপ্তাহিক">সাপ্তাহিক</option>
                  <option value="মাসিক">মাসিক</option>
                  <option value="ত্রৈমাসিক">ত্রৈমাসিক</option>
                  <option value="বার্ষিক">বার্ষিক</option>
                </select>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4">ফ্রিকোয়েন্সি সেভ করুন</Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">নোটিফিকেশন সেটিংস</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">অডিট রিমাইন্ডার</label>
              <input
                type="checkbox"
                defaultChecked
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">সার্টিফিকেশন মেয়াদ শেষের সতর্কতা</label>
              <input
                type="checkbox"
                defaultChecked
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">ফাইন্ডিং আপডেট</label>
              <input
                type="checkbox"
                defaultChecked
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">রিপোর্ট জেনারেশন</label>
              <input
                type="checkbox"
                defaultChecked
                className="rounded"
              />
            </div>
          </div>
          <Button className="w-full mt-4">নোটিফিকেশন সেভ করুন</Button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'internal-audit':
        return renderInternalAudit();
      case 'external-audit':
        return renderExternalAudit();
      case 'compliance-audit':
        return renderComplianceAudit();
      case 'financial-audit':
        return renderFinancialAudit();
      case 'operational-audit':
        return renderOperationalAudit();
      case 'quality-audit':
        return renderQualityAudit();
      case 'social-audit':
        return renderSocialAudit();
      case 'environmental-audit':
        return renderEnvironmentalAudit();
      case 'risk-assessment':
        return renderRiskAssessment();
      case 'audit-planning':
        return renderAuditPlanning();
      case 'findings-tracking':
        return renderFindingsTracking();
      case 'corrective-actions':
        return renderCorrectiveActions();
      case 'audit-reports':
        return renderAuditReports();
      case 'legal-compliance':
        return renderLegalCompliance();
      case 'certification-management':
        return renderCertificationManagement();
      case 'vendor-audit':
        return renderVendorAudit();
      case 'audit-settings':
        return renderAuditSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default ExtraAudit;