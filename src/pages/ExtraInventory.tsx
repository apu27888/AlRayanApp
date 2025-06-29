import React, { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  BarChart3, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  FileText,
  Layers,
  Archive,
  ShoppingCart,
  Target,
  Zap,
  Activity,
  Database,
  Warehouse,
  Box,
  Clipboard,
  DollarSign
} from 'lucide-react';
import Button from '../components/UI/Button';
import StatusBadge from '../components/UI/StatusBadge';
import ProgressBar from '../components/UI/ProgressBar';
import { useToast } from '../hooks/useToast';

const ExtraInventory: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dashboard');

  useEffect(() => {
    setPageTitle('Extra Inventory Management');
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
    { id: 'warehouse-management', label: 'গুদাম ব্যবস্থাপনা', icon: Warehouse },
    { id: 'procurement', label: 'ক্রয় ব্যবস্থাপনা', icon: ShoppingCart },
    { id: 'supplier-inventory', label: 'সাপ্লায়ার ইনভেন্টরি', icon: Truck },
    { id: 'quality-control', label: 'কোয়ালিটি কন্ট্রোল', icon: CheckCircle },
    { id: 'inventory-planning', label: 'ইনভেন্টরি পরিকল্পনা', icon: Target },
    { id: 'batch-tracking', label: 'ব্যাচ ট্র্যাকিং', icon: Package },
    { id: 'waste-management', label: 'বর্জ্য ব্যবস্থাপনা', icon: Archive },
    { id: 'cost-analysis', label: 'খরচ বিশ্লেষণ', icon: DollarSign },
    { id: 'reports', label: 'রিপোর্ট', icon: FileText },
    { id: 'settings', label: 'সেটিংস', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Extra Inventory Dashboard</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
          </select>
          <Button variant="secondary" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Inventory Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">মোট ইনভেন্টরি ভ্যালু</p>
              <p className="text-2xl font-bold text-blue-600">৳45,75,000</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +8.5% from last month
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">স্টক টার্নওভার রেট</p>
              <p className="text-2xl font-bold text-green-600">6.2x</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <Zap size={12} className="mr-1" />
                Excellent turnover
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Activity className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">লো স্টক আইটেম</p>
              <p className="text-2xl font-bold text-red-600">23</p>
              <p className="text-xs text-red-500 flex items-center mt-1">
                <AlertTriangle size={12} className="mr-1" />
                Requires attention
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">পেন্ডিং অর্ডার</p>
              <p className="text-2xl font-bold text-purple-600">18</p>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <Clock size={12} className="mr-1" />
                Awaiting delivery
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Package className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Categories Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Layers className="mr-2" size={20} />
            ক্যাটেগরি অনুযায়ী ইনভেন্টরি
          </h4>
          <div className="space-y-4">
            {[
              { category: 'Raw Materials', value: 1875000, percentage: 41, items: 145, color: 'bg-blue-500' },
              { category: 'Work in Progress', value: 1125000, percentage: 25, items: 89, color: 'bg-yellow-500' },
              { category: 'Finished Goods', value: 975000, percentage: 21, items: 67, color: 'bg-green-500' },
              { category: 'Accessories & Trims', value: 600000, percentage: 13, items: 234, color: 'bg-purple-500' }
            ].map((cat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${cat.color}`} />
                    <span className="font-medium">{cat.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">৳{(cat.value / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-500">{cat.items} items</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${cat.color} transition-all duration-500`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600">{cat.percentage}% of total inventory</div>
              </div>
            ))}
          </div>
        </div>

        {/* Warehouse Utilization */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Warehouse className="mr-2" size={20} />
            গুদাম ব্যবহার
          </h4>
          <div className="space-y-4">
            {[
              { warehouse: 'Main Warehouse', capacity: 5000, used: 4200, utilization: 84 },
              { warehouse: 'Raw Material Store', capacity: 3000, used: 2100, utilization: 70 },
              { warehouse: 'Finished Goods Store', capacity: 2000, used: 1650, utilization: 82.5 },
              { warehouse: 'Accessories Store', capacity: 1500, used: 900, utilization: 60 }
            ].map((warehouse, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{warehouse.warehouse}</span>
                  <span className="text-sm text-gray-600">
                    {warehouse.used.toLocaleString()}/{warehouse.capacity.toLocaleString()} sq ft
                  </span>
                </div>
                <ProgressBar 
                  progress={warehouse.utilization} 
                  color={warehouse.utilization >= 90 ? 'red' : warehouse.utilization >= 80 ? 'yellow' : 'green'}
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Utilization: {warehouse.utilization}%</span>
                  <span className={warehouse.utilization >= 90 ? 'text-red-600 font-medium' : ''}>
                    {warehouse.utilization >= 90 ? 'Near Capacity' : 'Available Space'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Activity className="mr-2" size={20} />
            সাম্প্রতিক কার্যক্রম
          </h4>
          <div className="space-y-3">
            {[
              { time: '10:30 AM', activity: 'Raw material received', item: 'Cotton Fabric - 500 yards', type: 'in', person: 'Store Manager' },
              { time: '09:45 AM', activity: 'Quality inspection completed', item: 'Batch #BT-2025-001', type: 'quality', person: 'QC Inspector' },
              { time: '09:15 AM', activity: 'Stock issued to production', item: 'Buttons - 2000 pcs', type: 'out', person: 'Production Manager' },
              { time: '08:30 AM', activity: 'Purchase order created', item: 'PO-2025-045 - Zippers', type: 'order', person: 'Procurement Team' },
              { time: '08:00 AM', activity: 'Inventory count updated', item: 'Warehouse A - Section 3', type: 'count', person: 'Inventory Team' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'in' ? 'bg-green-500' :
                  activity.type === 'out' ? 'bg-red-500' :
                  activity.type === 'quality' ? 'bg-blue-500' :
                  activity.type === 'order' ? 'bg-purple-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.activity}</p>
                  <p className="text-xs text-gray-600">{activity.item}</p>
                  <p className="text-xs text-gray-500">{activity.person} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-red-500" size={20} />
            গুরুত্বপূর্ণ সতর্কতা
          </h4>
          <div className="space-y-3">
            {[
              { type: 'Low Stock', item: 'Single Jersey Fabric', current: 45, minimum: 100, severity: 'high' },
              { type: 'Expiry Alert', item: 'Dye Chemicals - Batch #DC-001', days: 7, severity: 'medium' },
              { type: 'Quality Issue', item: 'Button Batch #BTN-2025-003', defects: 15, severity: 'high' },
              { type: 'Overstock', item: 'Care Labels', current: 25000, maximum: 20000, severity: 'low' },
              { type: 'Pending Delivery', item: 'PO-2025-042 - Zippers', days: 3, severity: 'medium' }
            ].map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' : 'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{alert.type}</p>
                    <p className="text-xs text-gray-600">{alert.item}</p>
                    {alert.current && (
                      <p className="text-xs text-gray-500">
                        Current: {alert.current} | Min: {alert.minimum}
                      </p>
                    )}
                    {alert.days && (
                      <p className="text-xs text-gray-500">
                        {alert.type === 'Expiry Alert' ? `Expires in ${alert.days} days` : `Overdue by ${alert.days} days`}
                      </p>
                    )}
                    {alert.defects && (
                      <p className="text-xs text-gray-500">
                        {alert.defects}% defect rate detected
                      </p>
                    )}
                    {alert.maximum && (
                      <p className="text-xs text-gray-500">
                        Current: {alert.current} | Max: {alert.maximum}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="secondary">
                      <Eye size={12} />
                    </Button>
                    <Button size="sm" variant="success">
                      Action
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWarehouseManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">গুদাম ব্যবস্থাপনা</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <MapPin size={16} className="mr-2" />
            Warehouse Map
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Add Location
          </Button>
        </div>
      </div>

      {/* Warehouse Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Warehouses</p>
              <p className="text-2xl font-bold text-blue-600">4</p>
            </div>
            <Warehouse className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Capacity</p>
              <p className="text-2xl font-bold text-green-600">11,500 sq ft</p>
            </div>
            <Box className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Utilization Rate</p>
              <p className="text-2xl font-bold text-purple-600">76.5%</p>
            </div>
            <BarChart3 className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Warehouse Details */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">গুদাম বিস্তারিত তথ্য</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Warehouse</th>
                <th className="p-3 font-semibold text-sm">Location</th>
                <th className="p-3 font-semibold text-sm">Type</th>
                <th className="p-3 font-semibold text-sm">Capacity</th>
                <th className="p-3 font-semibold text-sm">Used</th>
                <th className="p-3 font-semibold text-sm">Utilization</th>
                <th className="p-3 font-semibold text-sm">Temperature</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  name: 'Main Warehouse', 
                  location: 'Building A, Floor 1', 
                  type: 'General Storage', 
                  capacity: 5000, 
                  used: 4200, 
                  utilization: 84, 
                  temp: '25°C', 
                  status: 'Active' 
                },
                { 
                  name: 'Raw Material Store', 
                  location: 'Building B, Floor 1', 
                  type: 'Raw Materials', 
                  capacity: 3000, 
                  used: 2100, 
                  utilization: 70, 
                  temp: '22°C', 
                  status: 'Active' 
                },
                { 
                  name: 'Finished Goods Store', 
                  location: 'Building A, Floor 2', 
                  type: 'Finished Products', 
                  capacity: 2000, 
                  used: 1650, 
                  utilization: 82.5, 
                  temp: '24°C', 
                  status: 'Active' 
                },
                { 
                  name: 'Climate Controlled', 
                  location: 'Building C, Floor 1', 
                  type: 'Special Storage', 
                  capacity: 1500, 
                  used: 900, 
                  utilization: 60, 
                  temp: '18°C', 
                  status: 'Maintenance' 
                }
              ].map((warehouse, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{warehouse.name}</td>
                  <td className="p-3 text-sm">{warehouse.location}</td>
                  <td className="p-3 text-sm">{warehouse.type}</td>
                  <td className="p-3 text-sm">{warehouse.capacity.toLocaleString()} sq ft</td>
                  <td className="p-3 text-sm">{warehouse.used.toLocaleString()} sq ft</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <ProgressBar 
                        progress={warehouse.utilization} 
                        color={warehouse.utilization >= 90 ? 'red' : warehouse.utilization >= 80 ? 'yellow' : 'green'}
                      />
                      <span className="text-sm font-medium">{warehouse.utilization}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{warehouse.temp}</td>
                  <td className="p-3">
                    <StatusBadge status={warehouse.status} />
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

      {/* Storage Zones */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">স্টোরেজ জোন</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { zone: 'Zone A1', type: 'Fabric Storage', items: 145, capacity: 200, utilization: 72.5 },
            { zone: 'Zone A2', type: 'Yarn Storage', items: 89, capacity: 120, utilization: 74.2 },
            { zone: 'Zone B1', type: 'Trims & Accessories', items: 234, capacity: 300, utilization: 78 },
            { zone: 'Zone B2', type: 'Finished Goods', items: 67, capacity: 100, utilization: 67 },
            { zone: 'Zone C1', type: 'Chemical Storage', items: 23, capacity: 50, utilization: 46 },
            { zone: 'Zone C2', type: 'Packaging Materials', items: 156, capacity: 180, utilization: 86.7 }
          ].map((zone, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold">{zone.zone}</h5>
                  <p className="text-sm text-gray-600">{zone.type}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  zone.utilization >= 90 ? 'bg-red-100 text-red-800' :
                  zone.utilization >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {zone.utilization}%
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Items: {zone.items}/{zone.capacity}</span>
                </div>
                <ProgressBar 
                  progress={zone.utilization} 
                  color={zone.utilization >= 90 ? 'red' : zone.utilization >= 80 ? 'yellow' : 'green'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProcurement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ক্রয় ব্যবস্থাপনা</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Create Purchase Order
          </Button>
        </div>
      </div>

      {/* Procurement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active POs</p>
              <p className="text-2xl font-bold text-blue-600">18</p>
            </div>
            <ShoppingCart className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
              <p className="text-2xl font-bold text-yellow-600">7</p>
            </div>
            <Clock className="text-yellow-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Spend</p>
              <p className="text-2xl font-bold text-green-600">৳12.5L</p>
            </div>
            <DollarSign className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue Deliveries</p>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
            <AlertTriangle className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* Purchase Orders */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-lg">Purchase Orders</h4>
          <div className="flex space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search POs..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">PO Number</th>
                <th className="p-3 font-semibold text-sm">Supplier</th>
                <th className="p-3 font-semibold text-sm">Items</th>
                <th className="p-3 font-semibold text-sm">Total Amount</th>
                <th className="p-3 font-semibold text-sm">Order Date</th>
                <th className="p-3 font-semibold text-sm">Expected Delivery</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  po: 'PO-2025-045', 
                  supplier: 'ABC Trims Ltd', 
                  items: 'Zippers, Buttons', 
                  amount: 45000, 
                  orderDate: '2025-01-15', 
                  delivery: '2025-01-25', 
                  status: 'Approved' 
                },
                { 
                  po: 'PO-2025-046', 
                  supplier: 'XYZ Fabrics', 
                  items: 'Cotton Fabric', 
                  amount: 125000, 
                  orderDate: '2025-01-16', 
                  delivery: '2025-01-30', 
                  status: 'Pending' 
                },
                { 
                  po: 'PO-2025-047', 
                  supplier: 'Quality Yarns', 
                  items: 'Cotton Yarn', 
                  amount: 85000, 
                  orderDate: '2025-01-17', 
                  delivery: '2025-01-28', 
                  status: 'Delivered' 
                },
                { 
                  po: 'PO-2025-048', 
                  supplier: 'Chemical Solutions', 
                  items: 'Dyes, Chemicals', 
                  amount: 35000, 
                  orderDate: '2025-01-18', 
                  delivery: '2025-01-22', 
                  status: 'Overdue' 
                }
              ].map((po, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-blue-600">{po.po}</td>
                  <td className="p-3 text-sm">{po.supplier}</td>
                  <td className="p-3 text-sm">{po.items}</td>
                  <td className="p-3 text-sm font-semibold">৳{po.amount.toLocaleString()}</td>
                  <td className="p-3 text-sm">{po.orderDate}</td>
                  <td className="p-3 text-sm">{po.delivery}</td>
                  <td className="p-3">
                    <StatusBadge status={po.status} />
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

      {/* Procurement Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Monthly Procurement Trends</h4>
          <div className="space-y-3">
            {[
              { month: 'জানুয়ারি', amount: 1250000, orders: 45 },
              { month: 'ডিসেম্বর', amount: 1180000, orders: 42 },
              { month: 'নভেম্বর', amount: 1350000, orders: 48 },
              { month: 'অক্টোবর', amount: 1420000, orders: 52 }
            ].map((month, index) => {
              const maxAmount = 1500000;
              const percentage = (month.amount / maxAmount) * 100;
              
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{month.month}</span>
                    <span className="text-gray-600">৳{(month.amount / 1000).toFixed(0)}K • {month.orders} orders</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Top Suppliers by Volume</h4>
          <div className="space-y-3">
            {[
              { supplier: 'ABC Trims Ltd', amount: 450000, percentage: 36 },
              { supplier: 'XYZ Fabrics', amount: 375000, percentage: 30 },
              { supplier: 'Quality Yarns', amount: 250000, percentage: 20 },
              { supplier: 'Chemical Solutions', amount: 175000, percentage: 14 }
            ].map((supplier, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{supplier.supplier}</span>
                    <span className="text-gray-600">৳{(supplier.amount / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${supplier.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="ml-3 text-sm font-semibold text-green-600">{supplier.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupplierInventory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">সাপ্লায়ার ইনভেন্টরি</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Sync Data
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Supplier Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Suppliers</p>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <Truck className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">On-Time Delivery</p>
              <p className="text-2xl font-bold text-green-600">94.5%</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Quality Score</p>
              <p className="text-2xl font-bold text-purple-600">96.2%</p>
            </div>
            <Target className="text-purple-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Deliveries</p>
              <p className="text-2xl font-bold text-orange-600">8</p>
            </div>
            <Clock className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Supplier Inventory Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">সাপ্লায়ার ইনভেন্টরি স্ট্যাটাস</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Supplier</th>
                <th className="p-3 font-semibold text-sm">Category</th>
                <th className="p-3 font-semibold text-sm">Available Stock</th>
                <th className="p-3 font-semibold text-sm">Lead Time</th>
                <th className="p-3 font-semibold text-sm">Quality Rating</th>
                <th className="p-3 font-semibold text-sm">Price Range</th>
                <th className="p-3 font-semibold text-sm">Last Updated</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  supplier: 'ABC Trims Ltd', 
                  category: 'Trims & Accessories', 
                  stock: 'High', 
                  leadTime: '7-10 days', 
                  rating: 4.8, 
                  priceRange: '৳50-500', 
                  updated: '2 hours ago', 
                  status: 'Active' 
                },
                { 
                  supplier: 'XYZ Fabrics', 
                  category: 'Woven Fabrics', 
                  stock: 'Medium', 
                  leadTime: '14-21 days', 
                  rating: 4.6, 
                  priceRange: '৳200-800', 
                  updated: '1 day ago', 
                  status: 'Active' 
                },
                { 
                  supplier: 'Quality Yarns', 
                  category: 'Yarns', 
                  stock: 'Low', 
                  leadTime: '10-14 days', 
                  rating: 4.9, 
                  priceRange: '৳300-600', 
                  updated: '3 hours ago', 
                  status: 'Active' 
                },
                { 
                  supplier: 'Chemical Solutions', 
                  category: 'Dyes & Chemicals', 
                  stock: 'High', 
                  leadTime: '5-7 days', 
                  rating: 4.4, 
                  priceRange: '৳100-1000', 
                  updated: '6 hours ago', 
                  status: 'Maintenance' 
                }
              ].map((supplier, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{supplier.supplier}</td>
                  <td className="p-3 text-sm">{supplier.category}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      supplier.stock === 'High' ? 'bg-green-100 text-green-800' :
                      supplier.stock === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {supplier.stock}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{supplier.leadTime}</td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span>{supplier.rating}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{supplier.priceRange}</td>
                  <td className="p-3 text-sm text-gray-500">{supplier.updated}</td>
                  <td className="p-3">
                    <StatusBadge status={supplier.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="success">
                        Order
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

  const renderQualityControl = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">কোয়ালিটি কন্ট্রোল</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <Clipboard size={16} className="mr-2" />
            QC Checklist
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            New Inspection
          </Button>
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overall Quality Rate</p>
              <p className="text-2xl font-bold text-green-600">96.8%</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Inspections Today</p>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <Eye className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Rejected Batches</p>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
            <XCircle className="text-red-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Reviews</p>
              <p className="text-2xl font-bold text-yellow-600">7</p>
            </div>
            <Clock className="text-yellow-500" size={32} />
          </div>
        </div>
      </div>

      {/* Quality Inspections */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">সাম্প্রতিক কোয়ালিটি ইন্সপেকশন</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Batch ID</th>
                <th className="p-3 font-semibold text-sm">Item</th>
                <th className="p-3 font-semibold text-sm">Supplier</th>
                <th className="p-3 font-semibold text-sm">Inspector</th>
                <th className="p-3 font-semibold text-sm">Inspection Date</th>
                <th className="p-3 font-semibold text-sm">Quality Score</th>
                <th className="p-3 font-semibold text-sm">Defects</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  batch: 'BT-2025-001', 
                  item: 'Cotton Fabric', 
                  supplier: 'XYZ Fabrics', 
                  inspector: 'Fatima Begum', 
                  date: '2025-01-18', 
                  score: 98.5, 
                  defects: 2, 
                  status: 'Approved' 
                },
                { 
                  batch: 'BT-2025-002', 
                  item: 'Plastic Buttons', 
                  supplier: 'ABC Trims', 
                  inspector: 'Abul Kalam', 
                  date: '2025-01-18', 
                  score: 94.2, 
                  defects: 8, 
                  status: 'Conditional' 
                },
                { 
                  batch: 'BT-2025-003', 
                  item: 'Zippers', 
                  supplier: 'Quality Trims', 
                  inspector: 'Fatima Begum', 
                  date: '2025-01-17', 
                  score: 85.3, 
                  defects: 15, 
                  status: 'Rejected' 
                },
                { 
                  batch: 'BT-2025-004', 
                  item: 'Dye Chemicals', 
                  supplier: 'Chemical Solutions', 
                  inspector: 'Quality Team', 
                  date: '2025-01-17', 
                  score: 99.1, 
                  defects: 1, 
                  status: 'Approved' 
                }
              ].map((inspection, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-blue-600">{inspection.batch}</td>
                  <td className="p-3 text-sm">{inspection.item}</td>
                  <td className="p-3 text-sm">{inspection.supplier}</td>
                  <td className="p-3 text-sm">{inspection.inspector}</td>
                  <td className="p-3 text-sm">{inspection.date}</td>
                  <td className="p-3 text-sm">
                    <span className={`font-semibold ${
                      inspection.score >= 95 ? 'text-green-600' :
                      inspection.score >= 90 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {inspection.score}%
                    </span>
                  </td>
                  <td className="p-3 text-sm text-red-600">{inspection.defects}</td>
                  <td className="p-3">
                    <StatusBadge status={inspection.status} />
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

      {/* Quality Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">মাসিক কোয়ালিটি ট্রেন্ড</h4>
          <div className="space-y-3">
            {[
              { month: 'জানুয়ারি', score: 96.8, target: 95 },
              { month: 'ডিসেম্বর', score: 94.5, target: 95 },
              { month: 'নভেম্বর', score: 97.2, target: 95 },
              { month: 'অক্টোবর', score: 95.8, target: 95 }
            ].map((month, index) => {
              const isAboveTarget = month.score >= month.target;
              
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{month.month}</span>
                    <span className={`font-semibold ${isAboveTarget ? 'text-green-600' : 'text-red-600'}`}>
                      {month.score}% (Target: {month.target}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        isAboveTarget ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${month.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">ডিফেক্ট ক্যাটেগরি</h4>
          <div className="space-y-3">
            {[
              { category: 'Color Variation', count: 15, percentage: 35, color: 'bg-red-500' },
              { category: 'Size Issues', count: 12, percentage: 28, color: 'bg-orange-500' },
              { category: 'Material Defects', count: 8, percentage: 19, color: 'bg-yellow-500' },
              { category: 'Packaging Issues', count: 5, percentage: 12, color: 'bg-blue-500' },
              { category: 'Others', count: 3, percentage: 6, color: 'bg-gray-500' }
            ].map((defect, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${defect.color}`} />
                  <span className="text-sm font-medium">{defect.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{defect.count}</div>
                  <div className="text-xs text-gray-500">{defect.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderInventoryPlanning = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ইনভেন্টরি পরিকল্পনা</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <Calculator size={16} className="mr-2" />
            Calculate Demand
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Create Plan
          </Button>
        </div>
      </div>

      {/* Planning Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Reorder Points</p>
              <p className="text-2xl font-bold text-blue-600">45</p>
            </div>
            <Target className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Safety Stock</p>
              <p className="text-2xl font-bold text-green-600">৳8.5L</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Forecast Accuracy</p>
              <p className="text-2xl font-bold text-purple-600">87.3%</p>
            </div>
            <TrendingUp className="text-purple-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Stockout Risk</p>
              <p className="text-2xl font-bold text-red-600">12</p>
            </div>
            <AlertTriangle className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* Demand Forecasting */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">চাহিদা পূর্বাভাস</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Item</th>
                <th className="p-3 font-semibold text-sm">Current Stock</th>
                <th className="p-3 font-semibold text-sm">Monthly Usage</th>
                <th className="p-3 font-semibold text-sm">Forecast (Next Month)</th>
                <th className="p-3 font-semibold text-sm">Reorder Point</th>
                <th className="p-3 font-semibold text-sm">Suggested Order</th>
                <th className="p-3 font-semibold text-sm">Priority</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  item: 'Cotton Fabric', 
                  current: 1200, 
                  usage: 800, 
                  forecast: 850, 
                  reorder: 500, 
                  suggested: 1000, 
                  priority: 'Medium' 
                },
                { 
                  item: 'Plastic Buttons', 
                  current: 5000, 
                  usage: 12000, 
                  forecast: 13500, 
                  reorder: 8000, 
                  suggested: 15000, 
                  priority: 'High' 
                },
                { 
                  item: 'Zippers', 
                  current: 800, 
                  usage: 600, 
                  forecast: 650, 
                  reorder: 400, 
                  suggested: 800, 
                  priority: 'Medium' 
                },
                { 
                  item: 'Thread', 
                  current: 200, 
                  usage: 500, 
                  forecast: 550, 
                  reorder: 300, 
                  suggested: 700, 
                  priority: 'High' 
                }
              ].map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{item.item}</td>
                  <td className="p-3 text-sm">{item.current.toLocaleString()}</td>
                  <td className="p-3 text-sm">{item.usage.toLocaleString()}</td>
                  <td className="p-3 text-sm font-semibold">{item.forecast.toLocaleString()}</td>
                  <td className="p-3 text-sm">{item.reorder.toLocaleString()}</td>
                  <td className="p-3 text-sm text-blue-600 font-semibold">{item.suggested.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.priority === 'High' ? 'bg-red-100 text-red-800' :
                      item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <Button size="sm" variant="success">
                      Create PO
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ABC Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">ABC বিশ্লেষণ</h4>
          <div className="space-y-4">
            {[
              { category: 'Category A (High Value)', items: 25, value: 70, color: 'bg-red-500' },
              { category: 'Category B (Medium Value)', items: 35, value: 20, color: 'bg-yellow-500' },
              { category: 'Category C (Low Value)', items: 40, value: 10, color: 'bg-green-500' }
            ].map((cat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${cat.color}`} />
                    <span className="font-medium">{cat.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{cat.items}% items</div>
                    <div className="text-xs text-gray-500">{cat.value}% value</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${cat.color} transition-all duration-500`}
                    style={{ width: `${cat.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">স্টক টার্নওভার</h4>
          <div className="space-y-3">
            {[
              { item: 'Cotton Fabric', turnover: 8.5, status: 'Excellent' },
              { item: 'Buttons', turnover: 12.2, status: 'Excellent' },
              { item: 'Zippers', turnover: 6.8, status: 'Good' },
              { item: 'Thread', turnover: 15.3, status: 'Excellent' },
              { item: 'Labels', turnover: 4.2, status: 'Average' },
              { item: 'Packaging', turnover: 2.8, status: 'Poor' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{item.item}</p>
                  <p className="text-xs text-gray-600">{item.turnover}x per year</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                  item.status === 'Good' ? 'bg-blue-100 text-blue-800' :
                  item.status === 'Average' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBatchTracking = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ব্যাচ ট্র্যাকিং</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search batch ID..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Create Batch
          </Button>
        </div>
      </div>

      {/* Batch Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Batches</p>
              <p className="text-2xl font-bold text-blue-600">156</p>
            </div>
            <Package className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">In Production</p>
              <p className="text-2xl font-bold text-yellow-600">23</p>
            </div>
            <Activity className="text-yellow-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Quality Passed</p>
              <p className="text-2xl font-bold text-green-600">142</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Expired/Rejected</p>
              <p className="text-2xl font-bold text-red-600">8</p>
            </div>
            <XCircle className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* Batch Tracking Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">ব্যাচ ট্র্যাকিং তথ্য</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Batch ID</th>
                <th className="p-3 font-semibold text-sm">Item</th>
                <th className="p-3 font-semibold text-sm">Supplier</th>
                <th className="p-3 font-semibold text-sm">Received Date</th>
                <th className="p-3 font-semibold text-sm">Expiry Date</th>
                <th className="p-3 font-semibold text-sm">Quantity</th>
                <th className="p-3 font-semibold text-sm">Location</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  batch: 'BT-2025-001', 
                  item: 'Cotton Fabric - Navy', 
                  supplier: 'XYZ Fabrics', 
                  received: '2025-01-15', 
                  expiry: '2025-07-15', 
                  quantity: '500 yards', 
                  location: 'Zone A1-R3-S2', 
                  status: 'Available' 
                },
                { 
                  batch: 'BT-2025-002', 
                  item: 'Plastic Buttons - White', 
                  supplier: 'ABC Trims', 
                  received: '2025-01-16', 
                  expiry: '2027-01-16', 
                  quantity: '10,000 pcs', 
                  location: 'Zone B1-R1-S5', 
                  status: 'In Use' 
                },
                { 
                  batch: 'BT-2025-003', 
                  item: 'Dye Chemical - Red', 
                  supplier: 'Chemical Solutions', 
                  received: '2025-01-10', 
                  expiry: '2025-04-10', 
                  quantity: '50 kg', 
                  location: 'Zone C1-R2-S1', 
                  status: 'Expiring Soon' 
                },
                { 
                  batch: 'BT-2025-004', 
                  item: 'Zippers - Metal', 
                  supplier: 'Quality Trims', 
                  received: '2025-01-12', 
                  expiry: '2026-01-12', 
                  quantity: '2,000 pcs', 
                  location: 'Zone B1-R2-S3', 
                  status: 'Quality Hold' 
                }
              ].map((batch, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-blue-600">{batch.batch}</td>
                  <td className="p-3 text-sm">{batch.item}</td>
                  <td className="p-3 text-sm">{batch.supplier}</td>
                  <td className="p-3 text-sm">{batch.received}</td>
                  <td className="p-3 text-sm">{batch.expiry}</td>
                  <td className="p-3 text-sm">{batch.quantity}</td>
                  <td className="p-3 text-sm font-mono text-xs">{batch.location}</td>
                  <td className="p-3">
                    <StatusBadge status={batch.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <MapPin size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batch Lifecycle */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">ব্যাচ লাইফসাইকেল - BT-2025-001</h4>
        <div className="flex items-center justify-between">
          {[
            { stage: 'Received', date: '2025-01-15', status: 'completed' },
            { stage: 'Quality Check', date: '2025-01-16', status: 'completed' },
            { stage: 'Storage', date: '2025-01-16', status: 'completed' },
            { stage: 'In Production', date: '2025-01-18', status: 'current' },
            { stage: 'Finished', date: '', status: 'pending' },
            { stage: 'Shipped', date: '', status: 'pending' }
          ].map((stage, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stage.status === 'completed' ? 'bg-green-500 text-white' :
                stage.status === 'current' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {stage.status === 'completed' ? (
                  <CheckCircle size={16} />
                ) : stage.status === 'current' ? (
                  <Clock size={16} />
                ) : (
                  <Circle size={16} />
                )}
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium">{stage.stage}</p>
                {stage.date && <p className="text-xs text-gray-500">{stage.date}</p>}
              </div>
              {index < 5 && (
                <div className={`absolute h-0.5 w-16 mt-4 ${
                  stage.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                }`} style={{ left: `${(index + 1) * 16.67}%` }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWasteManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">বর্জ্য ব্যবস্থাপনা</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <BarChart3 size={16} className="mr-2" />
            Waste Report
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Record Waste
          </Button>
        </div>
      </div>

      {/* Waste Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Waste (Monthly)</p>
              <p className="text-2xl font-bold text-red-600">2.3 tons</p>
            </div>
            <Archive className="text-red-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Recycled</p>
              <p className="text-2xl font-bold text-green-600">1.8 tons</p>
            </div>
            <RefreshCw className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Waste Cost</p>
              <p className="text-2xl font-bold text-purple-600">৳45,000</p>
            </div>
            <DollarSign className="text-purple-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Waste Reduction</p>
              <p className="text-2xl font-bold text-blue-600">15.2%</p>
            </div>
            <TrendingDown className="text-blue-500" size={32} />
          </div>
        </div>
      </div>

      {/* Waste Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">বর্জ্যের ধরন</h4>
          <div className="space-y-4">
            {[
              { type: 'Fabric Scraps', amount: 850, percentage: 37, color: 'bg-red-500', recyclable: true },
              { type: 'Thread Waste', amount: 320, percentage: 14, color: 'bg-orange-500', recyclable: false },
              { type: 'Defective Products', amount: 480, percentage: 21, color: 'bg-yellow-500', recyclable: true },
              { type: 'Packaging Waste', amount: 290, percentage: 13, color: 'bg-green-500', recyclable: true },
              { type: 'Chemical Waste', amount: 180, percentage: 8, color: 'bg-purple-500', recyclable: false },
              { type: 'Other', amount: 180, percentage: 7, color: 'bg-gray-500', recyclable: false }
            ].map((waste, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${waste.color}`} />
                    <span className="font-medium">{waste.type}</span>
                    {waste.recyclable && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Recyclable
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{waste.amount} kg</div>
                    <div className="text-xs text-gray-500">{waste.percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${waste.color} transition-all duration-500`}
                    style={{ width: `${waste.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">মাসিক বর্জ্য ট্রেন্ড</h4>
          <div className="space-y-3">
            {[
              { month: 'জানুয়ারি', waste: 2.3, target: 2.5, reduction: 8 },
              { month: 'ডিসেম্বর', waste: 2.8, target: 2.5, reduction: -12 },
              { month: 'নভেম্বর', waste: 2.1, target: 2.5, reduction: 16 },
              { month: 'অক্টোবর', waste: 2.6, target: 2.5, reduction: -4 }
            ].map((month, index) => {
              const isUnderTarget = month.waste <= month.target;
              
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{month.month}</span>
                    <span className={`font-semibold ${isUnderTarget ? 'text-green-600' : 'text-red-600'}`}>
                      {month.waste} tons (Target: {month.target})
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        isUnderTarget ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(month.waste / 3) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Reduction: {month.reduction > 0 ? '+' : ''}{month.reduction}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Waste Records */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">সাম্প্রতিক বর্জ্য রেকর্ড</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Date</th>
                <th className="p-3 font-semibold text-sm">Waste Type</th>
                <th className="p-3 font-semibold text-sm">Source</th>
                <th className="p-3 font-semibold text-sm">Quantity</th>
                <th className="p-3 font-semibold text-sm">Disposal Method</th>
                <th className="p-3 font-semibold text-sm">Cost</th>
                <th className="p-3 font-semibold text-sm">Recorded By</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  date: '2025-01-18', 
                  type: 'Fabric Scraps', 
                  source: 'Cutting Department', 
                  quantity: '45 kg', 
                  disposal: 'Recycling', 
                  cost: 0, 
                  recordedBy: 'Waste Manager' 
                },
                { 
                  date: '2025-01-17', 
                  type: 'Defective Products', 
                  source: 'Quality Control', 
                  quantity: '25 pcs', 
                  disposal: 'Donation', 
                  cost: 0, 
                  recordedBy: 'QC Manager' 
                },
                { 
                  date: '2025-01-16', 
                  type: 'Chemical Waste', 
                  source: 'Dyeing Department', 
                  quantity: '15 L', 
                  disposal: 'Hazardous Disposal', 
                  cost: 2500, 
                  recordedBy: 'Safety Officer' 
                },
                { 
                  date: '2025-01-15', 
                  type: 'Packaging Waste', 
                  source: 'Shipping Department', 
                  quantity: '30 kg', 
                  disposal: 'Recycling', 
                  cost: 0, 
                  recordedBy: 'Shipping Manager' 
                }
              ].map((record, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm">{record.date}</td>
                  <td className="p-3 text-sm font-medium">{record.type}</td>
                  <td className="p-3 text-sm">{record.source}</td>
                  <td className="p-3 text-sm">{record.quantity}</td>
                  <td className="p-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.disposal === 'Recycling' ? 'bg-green-100 text-green-800' :
                      record.disposal === 'Donation' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {record.disposal}
                    </span>
                  </td>
                  <td className="p-3 text-sm">
                    {record.cost > 0 ? `৳${record.cost.toLocaleString()}` : 'Free'}
                  </td>
                  <td className="p-3 text-sm">{record.recordedBy}</td>
                  <td className="p-3">
                    <Button size="sm" variant="secondary">
                      <Eye size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCostAnalysis = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">খরচ বিশ্লেষণ</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>This Quarter</option>
            <option>Last Quarter</option>
            <option>This Year</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Cost Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Inventory Cost</p>
              <p className="text-2xl font-bold text-blue-600">৳45.75L</p>
            </div>
            <DollarSign className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Carrying Cost</p>
              <p className="text-2xl font-bold text-green-600">৳3.25L</p>
            </div>
            <Warehouse className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Ordering Cost</p>
              <p className="text-2xl font-bold text-purple-600">৳85,000</p>
            </div>
            <ShoppingCart className="text-purple-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Stockout Cost</p>
              <p className="text-2xl font-bold text-red-600">৳1.2L</p>
            </div>
            <AlertTriangle className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">ক্যাটেগরি অনুযায়ী খরচ</h4>
          <div className="space-y-4">
            {[
              { category: 'Raw Materials', cost: 1875000, percentage: 41, trend: '+5.2%' },
              { category: 'Work in Progress', cost: 1125000, percentage: 25, trend: '+2.1%' },
              { category: 'Finished Goods', cost: 975000, percentage: 21, trend: '-1.8%' },
              { category: 'Accessories & Trims', cost: 600000, percentage: 13, trend: '+8.5%' }
            ].map((cat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{cat.category}</span>
                  <div className="text-right">
                    <div className="text-sm font-semibold">৳{(cat.cost / 1000).toFixed(0)}K</div>
                    <div className={`text-xs ${cat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {cat.trend}
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600">{cat.percentage}% of total cost</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">মাসিক খরচ ট্রেন্ড</h4>
          <div className="space-y-3">
            {[
              { month: 'জানুয়ারি', cost: 4575000, budget: 4500000 },
              { month: 'ডিসেম্বর', cost: 4320000, budget: 4500000 },
              { month: 'নভেম্বর', cost: 4680000, budget: 4500000 },
              { month: 'অক্টোবর', cost: 4425000, budget: 4500000 }
            ].map((month, index) => {
              const isOverBudget = month.cost > month.budget;
              const percentage = (month.cost / 5000000) * 100;
              
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{month.month}</span>
                    <span className={`font-semibold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                      ৳{(month.cost / 1000).toFixed(0)}K (Budget: ৳{(month.budget / 1000).toFixed(0)}K)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        isOverBudget ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-600">
                    {isOverBudget ? 'Over budget' : 'Within budget'} by ৳{Math.abs(month.cost - month.budget).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cost Optimization Opportunities */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">খরচ অপ্টিমাইজেশন সুযোগ</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { 
              opportunity: 'Reduce Safety Stock', 
              category: 'Carrying Cost', 
              potential: 125000, 
              impact: 'Medium', 
              effort: 'Low' 
            },
            { 
              opportunity: 'Bulk Purchase Discounts', 
              category: 'Purchase Cost', 
              potential: 85000, 
              impact: 'High', 
              effort: 'Medium' 
            },
            { 
              opportunity: 'Supplier Consolidation', 
              category: 'Ordering Cost', 
              potential: 45000, 
              impact: 'Medium', 
              effort: 'High' 
            },
            { 
              opportunity: 'Improve Demand Forecasting', 
              category: 'Stockout Cost', 
              potential: 95000, 
              impact: 'High', 
              effort: 'Medium' 
            },
            { 
              opportunity: 'Optimize Warehouse Layout', 
              category: 'Handling Cost', 
              potential: 35000, 
              impact: 'Low', 
              effort: 'High' 
            },
            { 
              opportunity: 'Implement JIT for Fast-moving Items', 
              category: 'Carrying Cost', 
              potential: 155000, 
              impact: 'High', 
              effort: 'High' 
            }
          ].map((opp, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h5 className="font-semibold text-sm mb-2">{opp.opportunity}</h5>
              <p className="text-xs text-gray-600 mb-3">{opp.category}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Potential Savings:</span>
                  <span className="font-semibold text-green-600">৳{opp.potential.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Impact:</span>
                  <span className={`px-2 py-1 rounded-full ${
                    opp.impact === 'High' ? 'bg-green-100 text-green-800' :
                    opp.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {opp.impact}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Effort:</span>
                  <span className={`px-2 py-1 rounded-full ${
                    opp.effort === 'Low' ? 'bg-green-100 text-green-800' :
                    opp.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {opp.effort}
                  </span>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3">
                Implement
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ইনভেন্টরি রিপোর্ট</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          Custom Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            title: 'Inventory Valuation Report', 
            description: 'Complete inventory value analysis', 
            icon: DollarSign, 
            color: 'blue',
            frequency: 'Monthly'
          },
          { 
            title: 'Stock Movement Report', 
            description: 'In/Out transactions and trends', 
            icon: Activity, 
            color: 'green',
            frequency: 'Weekly'
          },
          { 
            title: 'ABC Analysis Report', 
            description: 'Item categorization by value', 
            icon: BarChart3, 
            color: 'purple',
            frequency: 'Quarterly'
          },
          { 
            title: 'Supplier Performance Report', 
            description: 'Delivery and quality metrics', 
            icon: Truck, 
            color: 'orange',
            frequency: 'Monthly'
          },
          { 
            title: 'Quality Control Report', 
            description: 'Inspection results and trends', 
            icon: CheckCircle, 
            color: 'green',
            frequency: 'Weekly'
          },
          { 
            title: 'Waste Analysis Report', 
            description: 'Waste generation and disposal', 
            icon: Archive, 
            color: 'red',
            frequency: 'Monthly'
          },
          { 
            title: 'Batch Tracking Report', 
            description: 'Batch lifecycle and traceability', 
            icon: Package, 
            color: 'yellow',
            frequency: 'Daily'
          },
          { 
            title: 'Cost Analysis Report', 
            description: 'Inventory cost breakdown', 
            icon: Calculator, 
            color: 'purple',
            frequency: 'Monthly'
          },
          { 
            title: 'Warehouse Utilization Report', 
            description: 'Space usage and efficiency', 
            icon: Warehouse, 
            color: 'blue',
            frequency: 'Weekly'
          }
        ].map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className={`w-12 h-12 rounded-lg bg-${report.color}-100 flex items-center justify-center mb-4`}>
              <report.icon className={`text-${report.color}-600`} size={24} />
            </div>
            <h4 className="font-semibold text-lg mb-2">{report.title}</h4>
            <p className="text-gray-600 text-sm mb-3">{report.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-gray-500">Frequency: {report.frequency}</span>
              <span className={`text-xs px-2 py-1 rounded-full bg-${report.color}-100 text-${report.color}-800`}>
                Available
              </span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="secondary" className="flex-1">
                <Eye size={14} className="mr-1" />
                Preview
              </Button>
              <Button size="sm" className="flex-1">
                <Download size={14} className="mr-1" />
                Generate
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">সাম্প্রতিক রিপোর্ট</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Report Name</th>
                <th className="p-3 font-semibold text-sm">Generated By</th>
                <th className="p-3 font-semibold text-sm">Date</th>
                <th className="p-3 font-semibold text-sm">Period</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  name: 'Monthly Inventory Valuation', 
                  generatedBy: 'System Auto', 
                  date: '2025-01-18', 
                  period: 'January 2025', 
                  status: 'Ready' 
                },
                { 
                  name: 'Weekly Stock Movement', 
                  generatedBy: 'Inventory Manager', 
                  date: '2025-01-17', 
                  period: 'Week 3, 2025', 
                  status: 'Ready' 
                },
                { 
                  name: 'Supplier Performance Q4', 
                  generatedBy: 'Procurement Team', 
                  date: '2025-01-15', 
                  period: 'Q4 2024', 
                  status: 'Processing' 
                },
                { 
                  name: 'Quality Control Weekly', 
                  generatedBy: 'QC Manager', 
                  date: '2025-01-14', 
                  period: 'Week 2, 2025', 
                  status: 'Ready' 
                }
              ].map((report, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{report.name}</td>
                  <td className="p-3 text-sm">{report.generatedBy}</td>
                  <td className="p-3 text-sm">{report.date}</td>
                  <td className="p-3 text-sm">{report.period}</td>
                  <td className="p-3">
                    <StatusBadge status={report.status} />
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

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">ইনভেন্টরি সেটিংস</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">সাধারণ সেটিংস</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Default Currency</label>
              <select className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>BDT (৳)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Low Stock Alert Threshold</label>
              <input
                type="number"
                defaultValue={10}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Auto-generate Batch IDs</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Enable Quality Control</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
          <Button className="w-full mt-4">Save General Settings</Button>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">নোটিফিকেশন সেটিংস</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Low Stock Alerts</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Expiry Date Alerts</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Quality Issues</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Delivery Delays</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Alert Frequency (hours)</label>
              <input
                type="number"
                defaultValue={24}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <Button className="w-full mt-4">Save Notification Settings</Button>
        </div>

        {/* Warehouse Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">গুদাম সেটিংস</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Default Storage Temperature (°C)</label>
              <input
                type="number"
                defaultValue={25}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Humidity Control (%)</label>
              <input
                type="number"
                defaultValue={60}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Enable Location Tracking</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Barcode Scanning</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
          <Button className="w-full mt-4">Save Warehouse Settings</Button>
        </div>

        {/* Integration Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">ইন্টিগ্রেশন সেটিংস</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Sync with Production</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Auto-update from Orders</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Financial System Integration</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Supplier Portal Access</label>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Sync Frequency (minutes)</label>
              <input
                type="number"
                defaultValue={30}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <Button className="w-full mt-4">Save Integration Settings</Button>
        </div>
      </div>

      {/* Backup & Security */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">ব্যাকআপ ও নিরাপত্তা</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h5 className="font-medium">Data Backup</h5>
            <div className="flex items-center justify-between">
              <label className="text-sm">Auto Backup</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">Backup Frequency</label>
              <select className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <Button variant="secondary" className="w-full">
              Create Manual Backup
            </Button>
          </div>
          
          <div className="space-y-4">
            <h5 className="font-medium">Security Settings</h5>
            <div className="flex items-center justify-between">
              <label className="text-sm">Two-Factor Authentication</label>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">Audit Trail</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <Button variant="secondary" className="w-full">
              View Security Logs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'warehouse-management':
        return renderWarehouseManagement();
      case 'procurement':
        return renderProcurement();
      case 'supplier-inventory':
        return renderSupplierInventory();
      case 'quality-control':
        return renderQualityControl();
      case 'inventory-planning':
        return renderInventoryPlanning();
      case 'batch-tracking':
        return renderBatchTracking();
      case 'waste-management':
        return renderWasteManagement();
      case 'cost-analysis':
        return renderCostAnalysis();
      case 'reports':
        return renderReports();
      case 'settings':
        return renderSettings();
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

export default ExtraInventory;