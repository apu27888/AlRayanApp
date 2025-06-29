import React, { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { 
  FileText, 
  Building, 
  Shield, 
  Truck, 
  Package, 
  Users, 
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Clipboard,
  BookOpen,
  Scale,
  Briefcase,
  UserCheck,
  Database,
  Archive,
  Zap,
  Layers
} from 'lucide-react';
import Button from '../components/UI/Button';
import StatusBadge from '../components/UI/StatusBadge';
import Modal from '../components/UI/Modal';
import { useToast } from '../hooks/useToast';

const Extra: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>('');

  useEffect(() => {
    setPageTitle('Administrative Management');
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
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: BarChart3 },
    { id: 'company-profile', label: 'কোম্পানি প্রোফাইল', icon: Building },
    { id: 'compliance', label: 'কমপ্লায়েন্স', icon: Shield },
    { id: 'logistics', label: 'লজিস্টিকস', icon: Truck },
    { id: 'vendor-management', label: 'ভেন্ডর ম্যানেজমেন্ট', icon: Users },
    { id: 'document-management', label: 'ডকুমেন্ট ম্যানেজমেন্ট', icon: FileText },
    { id: 'facility-management', label: 'ফ্যাসিলিটি ম্যানেজমেন্ট', icon: Building },
    { id: 'training', label: 'ট্রেনিং ও উন্নয়ন', icon: BookOpen },
    { id: 'legal-affairs', label: 'আইনি বিষয়াবলী', icon: Scale },
    { id: 'admin-settings', label: 'অ্যাডমিন সেটিংস', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Administrative Dashboard</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Administrative Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Vendors</p>
              <p className="text-2xl font-bold text-blue-600">45</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +3 new this month
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Compliance Score</p>
              <p className="text-2xl font-bold text-green-600">94.5%</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <Award size={12} className="mr-1" />
                Excellent rating
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Shield className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Documents</p>
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-xs text-orange-500 flex items-center mt-1">
                <AlertTriangle size={12} className="mr-1" />
                Requires attention
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <FileText className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Training Sessions</p>
              <p className="text-2xl font-bold text-purple-600">8</p>
              <p className="text-xs text-purple-500 flex items-center mt-1">
                <BookOpen size={12} className="mr-1" />
                This month
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BookOpen className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Compliance Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Administrative Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Activity className="mr-2" size={20} />
            Recent Administrative Activities
          </h4>
          <div className="space-y-3">
            {[
              { time: '10:30 AM', activity: 'New vendor registration completed', person: 'ABC Textiles Ltd.', type: 'vendor' },
              { time: '09:45 AM', activity: 'Compliance audit scheduled', person: 'BSCI Audit Team', type: 'compliance' },
              { time: '09:15 AM', activity: 'Training session completed', person: 'Safety Training - Batch 3', type: 'training' },
              { time: '08:30 AM', activity: 'Document uploaded', person: 'Fire Safety Certificate', type: 'document' },
              { time: '08:00 AM', activity: 'Facility maintenance scheduled', person: 'HVAC System Check', type: 'facility' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'vendor' ? 'bg-blue-500' :
                  activity.type === 'compliance' ? 'bg-green-500' :
                  activity.type === 'training' ? 'bg-purple-500' :
                  activity.type === 'document' ? 'bg-orange-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.activity}</p>
                  <p className="text-xs text-gray-600">{activity.person} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Shield className="mr-2" size={20} />
            Compliance Status Overview
          </h4>
          <div className="space-y-4">
            {[
              { category: 'BSCI Compliance', status: 'Compliant', score: 95, expiry: '2025-12-31' },
              { category: 'Fire Safety', status: 'Compliant', score: 98, expiry: '2025-08-15' },
              { category: 'Environmental', status: 'Warning', score: 85, expiry: '2025-06-30' },
              { category: 'Labor Standards', status: 'Compliant', score: 92, expiry: '2025-10-20' },
              { category: 'Quality Standards', status: 'Compliant', score: 96, expiry: '2025-11-15' }
            ].map((compliance, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{compliance.category}</span>
                    <StatusBadge status={compliance.status} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Score: {compliance.score}%</span>
                    <span>Expires: {compliance.expiry}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Quick Administrative Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Add Vendor', icon: Users, action: () => handleTabChange('vendor-management') },
            { label: 'Upload Document', icon: FileText, action: () => handleTabChange('document-management') },
            { label: 'Schedule Training', icon: BookOpen, action: () => handleTabChange('training') },
            { label: 'Compliance Check', icon: Shield, action: () => handleTabChange('compliance') },
            { label: 'Facility Request', icon: Building, action: () => handleTabChange('facility-management') },
            { label: 'Legal Review', icon: Scale, action: () => handleTabChange('legal-affairs') }
          ].map((action, index) => (
            <Button 
              key={index}
              variant="secondary" 
              className="flex flex-col items-center space-y-2 h-20"
              onClick={action.action}
            >
              <action.icon size={24} />
              <span className="text-xs text-center">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompanyProfile = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Company Profile</h3>
        <Button size="sm">
          <Edit size={16} className="mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                defaultValue="Space Kahaf Garments Ltd."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trade License No.</label>
              <input
                type="text"
                defaultValue="TRAD/DHAKA/123456"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TIN Number</label>
              <input
                type="text"
                defaultValue="123456789012"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">VAT Registration</label>
              <input
                type="text"
                defaultValue="VAT-987654321"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Factory Address</label>
              <textarea
                rows={3}
                defaultValue="Plot 45-46, Sector 7, CEPZ, Chittagong, Bangladesh"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
              <input
                type="text"
                defaultValue="2015"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee Count</label>
              <input
                type="text"
                defaultValue="156"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Contact Information</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="text-gray-400" size={20} />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-gray-600">+880-31-2555555</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="text-gray-400" size={20} />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-gray-600">info@spacekahaf.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="text-gray-400" size={20} />
              <div>
                <p className="text-sm font-medium">Website</p>
                <p className="text-sm text-gray-600">www.spacekahaf.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-gray-400" size={20} />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-gray-600">Chittagong, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications & Memberships */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Certifications & Memberships</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'BSCI Certification', issuer: 'Business Social Compliance Initiative', expiry: '2025-12-31', status: 'Active' },
            { name: 'OEKO-TEX Standard 100', issuer: 'OEKO-TEX Association', expiry: '2025-08-15', status: 'Active' },
            { name: 'WRAP Certification', issuer: 'Worldwide Responsible Accredited Production', expiry: '2025-10-20', status: 'Active' },
            { name: 'ISO 9001:2015', issuer: 'International Organization for Standardization', expiry: '2025-06-30', status: 'Renewal Due' },
            { name: 'BGMEA Membership', issuer: 'Bangladesh Garment Manufacturers and Exporters Association', expiry: '2025-12-31', status: 'Active' },
            { name: 'Fire Safety Certificate', issuer: 'Bangladesh Fire Service', expiry: '2025-03-15', status: 'Renewal Due' }
          ].map((cert, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-sm">{cert.name}</h5>
                <StatusBadge status={cert.status} />
              </div>
              <p className="text-xs text-gray-600 mb-1">{cert.issuer}</p>
              <p className="text-xs text-gray-500">Expires: {cert.expiry}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Compliance Management</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Compliance Report
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            New Audit
          </Button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overall Score</p>
              <p className="text-2xl font-bold text-green-600">94.5%</p>
            </div>
            <Award className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Audits</p>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
            <Clipboard className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Actions</p>
              <p className="text-2xl font-bold text-orange-600">7</p>
            </div>
            <AlertTriangle className="text-orange-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Certifications</p>
              <p className="text-2xl font-bold text-purple-600">6</p>
            </div>
            <Shield className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Compliance Categories */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Compliance Categories</h4>
        <div className="space-y-4">
          {[
            { category: 'Labor Standards & Human Rights', score: 96, status: 'Excellent', lastAudit: '2024-12-15', nextAudit: '2025-06-15' },
            { category: 'Health & Safety', score: 94, status: 'Good', lastAudit: '2024-11-20', nextAudit: '2025-05-20' },
            { category: 'Environmental Management', score: 88, status: 'Satisfactory', lastAudit: '2024-10-10', nextAudit: '2025-04-10' },
            { category: 'Management Systems', score: 92, status: 'Good', lastAudit: '2024-12-01', nextAudit: '2025-06-01' },
            { category: 'Business Ethics', score: 98, status: 'Excellent', lastAudit: '2024-11-15', nextAudit: '2025-05-15' }
          ].map((item, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-medium">{item.category}</h5>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold">{item.score}%</span>
                  <StatusBadge status={item.status} />
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div 
                  className={`h-3 rounded-full ${
                    item.score >= 95 ? 'bg-green-500' : 
                    item.score >= 90 ? 'bg-blue-500' : 
                    item.score >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Last Audit: {item.lastAudit}</span>
                <span>Next Audit: {item.nextAudit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Audit Activities */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Recent Audit Activities</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Date</th>
                <th className="p-3 font-semibold text-sm">Audit Type</th>
                <th className="p-3 font-semibold text-sm">Auditor</th>
                <th className="p-3 font-semibold text-sm">Score</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2024-12-15', type: 'BSCI Audit', auditor: 'SGS Bangladesh', score: 96, status: 'Completed' },
                { date: '2024-11-20', type: 'Fire Safety', auditor: 'Fire Service Dept.', score: 94, status: 'Completed' },
                { date: '2024-10-10', type: 'Environmental', auditor: 'Green Audit Ltd.', score: 88, status: 'Action Required' }
              ].map((audit, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm">{audit.date}</td>
                  <td className="p-3 text-sm font-medium">{audit.type}</td>
                  <td className="p-3 text-sm">{audit.auditor}</td>
                  <td className="p-3 text-sm font-semibold">{audit.score}%</td>
                  <td className="p-3">
                    <StatusBadge status={audit.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download size={14} />
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

  const renderLogistics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Logistics Management</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          New Shipment
        </Button>
      </div>

      {/* Logistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Shipments</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <Truck className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Deliveries</p>
              <p className="text-2xl font-bold text-orange-600">8</p>
            </div>
            <Package className="text-orange-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">On-Time Delivery</p>
              <p className="text-2xl font-bold text-green-600">95.2%</p>
            </div>
            <Target className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Transport Partners</p>
              <p className="text-2xl font-bold text-purple-600">15</p>
            </div>
            <Users className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Shipment Tracking */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Active Shipments</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Shipment ID</th>
                <th className="p-3 font-semibold text-sm">Order</th>
                <th className="p-3 font-semibold text-sm">Destination</th>
                <th className="p-3 font-semibold text-sm">Carrier</th>
                <th className="p-3 font-semibold text-sm">Departure</th>
                <th className="p-3 font-semibold text-sm">ETA</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'SHP-001', order: '#ORD-001', destination: 'Hamburg, Germany', carrier: 'Maersk Line', departure: '2025-01-10', eta: '2025-02-15', status: 'In Transit' },
                { id: 'SHP-002', order: '#ORD-002', destination: 'Barcelona, Spain', carrier: 'MSC', departure: '2025-01-12', eta: '2025-02-18', status: 'In Transit' },
                { id: 'SHP-003', order: '#ORD-003', destination: 'Los Angeles, USA', carrier: 'COSCO', departure: '2025-01-15', eta: '2025-02-25', status: 'Loading' }
              ].map((shipment, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-blue-600">{shipment.id}</td>
                  <td className="p-3 text-sm">{shipment.order}</td>
                  <td className="p-3 text-sm">{shipment.destination}</td>
                  <td className="p-3 text-sm">{shipment.carrier}</td>
                  <td className="p-3 text-sm">{shipment.departure}</td>
                  <td className="p-3 text-sm">{shipment.eta}</td>
                  <td className="p-3">
                    <StatusBadge status={shipment.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        Track
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transport Partners */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Transport Partners</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Maersk Line', type: 'Ocean Freight', rating: 4.8, shipments: 45 },
            { name: 'DHL Express', type: 'Air Freight', rating: 4.9, shipments: 23 },
            { name: 'FedEx', type: 'Express Delivery', rating: 4.7, shipments: 18 },
            { name: 'MSC', type: 'Ocean Freight', rating: 4.6, shipments: 32 },
            { name: 'UPS', type: 'Ground/Air', rating: 4.5, shipments: 15 },
            { name: 'COSCO', type: 'Ocean Freight', rating: 4.4, shipments: 28 }
          ].map((partner, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium">{partner.name}</h5>
                <div className="flex items-center space-x-1">
                  <Award className="text-yellow-500" size={16} />
                  <span className="text-sm font-semibold">{partner.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{partner.type}</p>
              <p className="text-xs text-gray-500">{partner.shipments} shipments completed</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVendorManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Vendor Management</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search vendors..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Vendor Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Fabric Suppliers</p>
              <p className="text-2xl font-bold text-blue-600">18</p>
            </div>
            <Layers className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Trims & Accessories</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <Package className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Service Providers</p>
              <p className="text-2xl font-bold text-purple-600">8</p>
            </div>
            <Briefcase className="text-purple-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Equipment Suppliers</p>
              <p className="text-2xl font-bold text-orange-600">7</p>
            </div>
            <Zap className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Vendor List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Vendor Directory</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Vendor Name</th>
                <th className="p-3 font-semibold text-sm">Category</th>
                <th className="p-3 font-semibold text-sm">Contact Person</th>
                <th className="p-3 font-semibold text-sm">Location</th>
                <th className="p-3 font-semibold text-sm">Rating</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'ABC Textiles Ltd.', category: 'Fabric Supplier', contact: 'Mr. Rahman', location: 'Dhaka', rating: 4.8, status: 'Active' },
                { name: 'XYZ Trims Co.', category: 'Trims & Accessories', contact: 'Ms. Sultana', location: 'Chittagong', rating: 4.6, status: 'Active' },
                { name: 'Quality Buttons Inc.', category: 'Trims & Accessories', contact: 'Mr. Ahmed', location: 'Gazipur', rating: 4.7, status: 'Active' },
                { name: 'Reliable Transport', category: 'Service Provider', contact: 'Mr. Karim', location: 'Dhaka', rating: 4.5, status: 'Active' },
                { name: 'Modern Machinery', category: 'Equipment Supplier', contact: 'Ms. Fatima', location: 'Chittagong', rating: 4.9, status: 'Active' }
              ].map((vendor, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{vendor.name}</td>
                  <td className="p-3 text-sm">{vendor.category}</td>
                  <td className="p-3 text-sm">{vendor.contact}</td>
                  <td className="p-3 text-sm">{vendor.location}</td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <Award className="text-yellow-500" size={16} />
                      <span className="font-semibold">{vendor.rating}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <StatusBadge status={vendor.status} />
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

  const renderDocumentManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Document Management</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Legal Documents</p>
              <p className="text-2xl font-bold text-blue-600">25</p>
            </div>
            <Scale className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Compliance Docs</p>
              <p className="text-2xl font-bold text-green-600">18</p>
            </div>
            <Shield className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Contracts</p>
              <p className="text-2xl font-bold text-purple-600">32</p>
            </div>
            <FileText className="text-purple-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-2xl font-bold text-orange-600">7</p>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Recent Documents</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Document Name</th>
                <th className="p-3 font-semibold text-sm">Category</th>
                <th className="p-3 font-semibold text-sm">Upload Date</th>
                <th className="p-3 font-semibold text-sm">Expiry Date</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'BSCI Audit Report 2024', category: 'Compliance', uploaded: '2024-12-20', expiry: '2025-12-20', status: 'Active' },
                { name: 'Fire Safety Certificate', category: 'Legal', uploaded: '2024-03-15', expiry: '2025-03-15', status: 'Renewal Due' },
                { name: 'H&M Supply Agreement', category: 'Contract', uploaded: '2024-01-10', expiry: '2025-12-31', status: 'Active' },
                { name: 'Environmental Compliance Report', category: 'Compliance', uploaded: '2024-11-05', expiry: '2025-11-05', status: 'Active' },
                { name: 'Trade License Renewal', category: 'Legal', uploaded: '2024-12-01', expiry: '2025-12-01', status: 'Pending Review' }
              ].map((doc, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{doc.name}</td>
                  <td className="p-3 text-sm">{doc.category}</td>
                  <td className="p-3 text-sm">{doc.uploaded}</td>
                  <td className="p-3 text-sm">{doc.expiry}</td>
                  <td className="p-3">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download size={14} />
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

  const renderFacilityManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Facility Management</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          New Request
        </Button>
      </div>

      {/* Facility Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Area</p>
              <p className="text-2xl font-bold text-blue-600">25,000 sq ft</p>
            </div>
            <Building className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Requests</p>
              <p className="text-2xl font-bold text-orange-600">8</p>
            </div>
            <AlertTriangle className="text-orange-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Maintenance Cost</p>
              <p className="text-2xl font-bold text-green-600">৳45,000</p>
            </div>
            <Target className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Energy Efficiency</p>
              <p className="text-2xl font-bold text-purple-600">87%</p>
            </div>
            <Zap className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Maintenance Requests */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Maintenance Requests</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Request ID</th>
                <th className="p-3 font-semibold text-sm">Area/Equipment</th>
                <th className="p-3 font-semibold text-sm">Issue Type</th>
                <th className="p-3 font-semibold text-sm">Priority</th>
                <th className="p-3 font-semibold text-sm">Requested By</th>
                <th className="p-3 font-semibold text-sm">Date</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'REQ-001', area: 'HVAC System - Floor 2', type: 'Repair', priority: 'High', requestedBy: 'Production Manager', date: '2025-01-15', status: 'In Progress' },
                { id: 'REQ-002', area: 'Sewing Machine Line A', type: 'Maintenance', priority: 'Medium', requestedBy: 'Line Supervisor', date: '2025-01-14', status: 'Pending' },
                { id: 'REQ-003', area: 'Fire Safety System', type: 'Inspection', priority: 'High', requestedBy: 'Safety Officer', date: '2025-01-13', status: 'Completed' },
                { id: 'REQ-004', area: 'Electrical Panel - Main', type: 'Repair', priority: 'Critical', requestedBy: 'Facility Manager', date: '2025-01-12', status: 'In Progress' }
              ].map((request, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-blue-600">{request.id}</td>
                  <td className="p-3 text-sm">{request.area}</td>
                  <td className="p-3 text-sm">{request.type}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      request.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{request.requestedBy}</td>
                  <td className="p-3 text-sm">{request.date}</td>
                  <td className="p-3">
                    <StatusBadge status={request.status} />
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

  const renderTraining = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Training & Development</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          Schedule Training
        </Button>
      </div>

      {/* Training Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sessions</p>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <BookOpen className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Participants</p>
              <p className="text-2xl font-bold text-green-600">156</p>
            </div>
            <Users className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <p className="text-2xl font-bold text-purple-600">92%</p>
            </div>
            <Target className="text-purple-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Sessions</p>
              <p className="text-2xl font-bold text-orange-600">6</p>
            </div>
            <Calendar className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Training Programs */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Training Programs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Workplace Safety', duration: '4 hours', participants: 25, status: 'Ongoing', date: '2025-01-20' },
            { title: 'Quality Control Procedures', duration: '6 hours', participants: 15, status: 'Scheduled', date: '2025-01-25' },
            { title: 'Fire Safety Training', duration: '3 hours', participants: 50, status: 'Completed', date: '2025-01-10' },
            { title: 'Machine Operation Training', duration: '8 hours', participants: 12, status: 'Scheduled', date: '2025-01-30' },
            { title: 'First Aid Certification', duration: '5 hours', participants: 20, status: 'Ongoing', date: '2025-01-18' },
            { title: 'Environmental Awareness', duration: '2 hours', participants: 40, status: 'Scheduled', date: '2025-02-05' }
          ].map((program, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-sm">{program.title}</h5>
                <StatusBadge status={program.status} />
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <p>Duration: {program.duration}</p>
                <p>Participants: {program.participants}</p>
                <p>Date: {program.date}</p>
              </div>
              <div className="mt-3 flex space-x-2">
                <Button size="sm" variant="secondary">
                  <Eye size={12} />
                </Button>
                <Button size="sm" variant="secondary">
                  <Edit size={12} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLegalAffairs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Legal Affairs</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          New Legal Matter
        </Button>
      </div>

      {/* Legal Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Contracts</p>
              <p className="text-2xl font-bold text-blue-600">32</p>
            </div>
            <FileText className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Legal Cases</p>
              <p className="text-2xl font-bold text-orange-600">2</p>
            </div>
            <Scale className="text-orange-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Renewals Due</p>
              <p className="text-2xl font-bold text-red-600">5</p>
            </div>
            <AlertTriangle className="text-red-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Compliance Score</p>
              <p className="text-2xl font-bold text-green-600">98%</p>
            </div>
            <Shield className="text-green-500" size={32} />
          </div>
        </div>
      </div>

      {/* Legal Documents */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Legal Documents & Contracts</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Document Type</th>
                <th className="p-3 font-semibold text-sm">Party</th>
                <th className="p-3 font-semibold text-sm">Start Date</th>
                <th className="p-3 font-semibold text-sm">Expiry Date</th>
                <th className="p-3 font-semibold text-sm">Value</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'Supply Agreement', party: 'H&M', startDate: '2024-01-01', expiryDate: '2025-12-31', value: '$2,500,000', status: 'Active' },
                { type: 'Service Contract', party: 'DHL Express', startDate: '2024-06-01', expiryDate: '2025-05-31', value: '$150,000', status: 'Active' },
                { type: 'Lease Agreement', party: 'CEPZ Authority', startDate: '2020-01-01', expiryDate: '2025-12-31', value: '$50,000/year', status: 'Renewal Due' },
                { type: 'Insurance Policy', party: 'Sadharan Bima', startDate: '2024-07-01', expiryDate: '2025-06-30', value: '$25,000', status: 'Active' },
                { type: 'Labor Contract', party: 'Workers Union', startDate: '2024-01-01', expiryDate: '2025-12-31', value: 'N/A', status: 'Active' }
              ].map((doc, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{doc.type}</td>
                  <td className="p-3 text-sm">{doc.party}</td>
                  <td className="p-3 text-sm">{doc.startDate}</td>
                  <td className="p-3 text-sm">{doc.expiryDate}</td>
                  <td className="p-3 text-sm font-semibold">{doc.value}</td>
                  <td className="p-3">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Download size={14} />
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

  const renderAdminSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Administrative Settings</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Configuration */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">System Configuration</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                defaultValue="Space Kahaf Garments Ltd."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="BDT">BDT - Bangladeshi Taka</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                <option value="UTC">UTC (GMT+0)</option>
              </select>
            </div>
          </div>
          <Button className="w-full mt-4">Save Configuration</Button>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Notification Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Document Expiry Alerts</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Compliance Reminders</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Training Notifications</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Vendor Updates</label>
              <input type="checkbox" className="rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alert Days Before Expiry</label>
              <input
                type="number"
                defaultValue={30}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <Button className="w-full mt-4">Save Notifications</Button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'company-profile':
        return renderCompanyProfile();
      case 'compliance':
        return renderCompliance();
      case 'logistics':
        return renderLogistics();
      case 'vendor-management':
        return renderVendorManagement();
      case 'document-management':
        return renderDocumentManagement();
      case 'facility-management':
        return renderFacilityManagement();
      case 'training':
        return renderTraining();
      case 'legal-affairs':
        return renderLegalAffairs();
      case 'admin-settings':
        return renderAdminSettings();
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

export default Extra;