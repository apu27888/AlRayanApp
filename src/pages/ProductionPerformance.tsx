import React, { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Database, 
  FileText, 
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Target,
  Zap,
  Award,
  Calendar,
  Eye
} from 'lucide-react';
import Button from '../components/UI/Button';
import ProgressBar from '../components/UI/ProgressBar';
import StatusBadge from '../components/UI/StatusBadge';
import { useBranchFilter } from '../hooks/useBranchFilter';
import { useBranch } from '../contexts/BranchContext';
import { 
  productionLineStatuses, 
  hourlyProductionData, 
  orderTrackingEntries, 
  linePerformanceSummaries, 
  weeklyEfficiencyTrends, 
  qualityInspections 
} from '../data/mockData';

const ProductionPerformance: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dashboard');
  const { currentBranch } = useBranch();

  // Filter data by current branch
  const filteredProductionLines = useBranchFilter(productionLineStatuses);
  const filteredHourlyProduction = useBranchFilter(hourlyProductionData);
  const filteredOrderTracking = useBranchFilter(orderTrackingEntries);
  const filteredLinePerformance = useBranchFilter(linePerformanceSummaries);
  const filteredWeeklyEfficiency = useBranchFilter(weeklyEfficiencyTrends);
  const filteredQualityInspections = useBranchFilter(qualityInspections);

  useEffect(() => {
    setPageTitle('Production & Performance');
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
    { id: 'order-tracking', label: 'অর্ডার ট্র্যাকিং', icon: TrendingUp },
    { id: 'line-performance', label: 'লাইন পারফরম্যান্স', icon: Activity },
    { id: 'quality-control', label: 'কোয়ালিটি কন্ট্রোল', icon: Shield },
    { id: 'data-entry', label: 'ডেটা এন্ট্রি', icon: Database },
    { id: 'reports', label: 'রিপোর্ট', icon: FileText },
    { id: 'settings', label: 'সেটিংস', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Production Dashboard</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Daily Production</p>
              <p className="text-2xl font-bold text-blue-600">
                {filteredProductionLines.reduce((sum, line) => sum + line.actual, 0).toLocaleString()} pcs
              </p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +12% from yesterday
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Target className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Efficiency Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {filteredProductionLines.length > 0 
                  ? (filteredProductionLines.reduce((sum, line) => sum + line.efficiency, 0) / filteredProductionLines.length).toFixed(1)
                  : 0}%
              </p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +3.2% from last week
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Zap className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Quality Rate</p>
              <p className="text-2xl font-bold text-purple-600">
                {filteredQualityInspections.length > 0 
                  ? (filteredQualityInspections.reduce((sum, inspection) => sum + inspection.rate, 0) / filteredQualityInspections.length).toFixed(1)
                  : 0}%
              </p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <Award size={12} className="mr-1" />
                Excellent quality
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Shield className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Lines</p>
              <p className="text-2xl font-bold text-orange-600">
                {filteredProductionLines.filter(line => line.status === 'Active').length}/{filteredProductionLines.length}
              </p>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <Users size={12} className="mr-1" />
                {filteredProductionLines.filter(line => line.status === 'Maintenance').length} lines maintenance
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Activity className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Production Lines Status */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 flex items-center">
          <Activity className="mr-2" size={20} />
          Production Lines Status
        </h4>
        {filteredProductionLines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProductionLines.map((line, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-semibold text-lg">{line.line}</h5>
                    <p className="text-sm text-gray-600">{line.operator}</p>
                  </div>
                  <StatusBadge status={line.status} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Target: {line.target} pcs</span>
                    <span>Actual: {line.actual} pcs</span>
                  </div>
                  <ProgressBar 
                    progress={line.status === 'Maintenance' ? 0 : (line.actual / line.target) * 100} 
                    color={line.efficiency >= 90 ? 'green' : line.efficiency >= 80 ? 'yellow' : 'red'}
                  />
                  <div className="flex justify-between text-sm">
                    <span>Efficiency:</span>
                    <span className={`font-semibold ${
                      line.efficiency >= 90 ? 'text-green-600' : 
                      line.efficiency >= 80 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {line.efficiency}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No production lines found for the selected branch.</p>
        )}
      </div>

      {/* Hourly Production Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 flex items-center">
          <BarChart3 className="mr-2" size={20} />
          Hourly Production Today
        </h4>
        {filteredHourlyProduction.length > 0 ? (
          <div className="space-y-3">
            {filteredHourlyProduction.map((item, index) => {
              const percentage = item.production === 0 ? 0 : (item.production / item.target) * 100;
              const isLunchBreak = item.hour === '12:00 PM';
              
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.hour}</span>
                    <span className={isLunchBreak ? 'text-gray-500' : 'text-gray-700'}>
                      {isLunchBreak ? 'Lunch Break' : `${item.production}/${item.target} pcs`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full transition-all duration-500 ${
                        isLunchBreak ? 'bg-gray-400' :
                        percentage >= 100 ? 'bg-green-500' : 
                        percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${isLunchBreak ? 100 : percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No hourly production data found for the selected branch.</p>
        )}
      </div>

      {/* Branch-specific message */}
      {currentBranch && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> Production data shown for {currentBranch.name} ({currentBranch.code}) only. 
            Switch to "All Branches" view to see consolidated production reports.
          </p>
        </div>
      )}
    </div>
  );

  const renderOrderTracking = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Order Tracking</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button variant="secondary" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Order ID</th>
                <th className="p-3 font-semibold text-sm">Buyer</th>
                <th className="p-3 font-semibold text-sm">Style</th>
                <th className="p-3 font-semibold text-sm">Quantity</th>
                <th className="p-3 font-semibold text-sm">Progress</th>
                <th className="p-3 font-semibold text-sm">Current Stage</th>
                <th className="p-3 font-semibold text-sm">Delivery Date</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrderTracking.length > 0 ? (
                filteredOrderTracking.map((order, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm font-medium text-blue-600">{order.orderId}</td>
                    <td className="p-3 text-sm">{order.buyer}</td>
                    <td className="p-3 text-sm">{order.style}</td>
                    <td className="p-3 text-sm">{order.quantity.toLocaleString()}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <ProgressBar progress={order.progress} color={order.progress >= 80 ? 'green' : order.progress >= 50 ? 'yellow' : 'red'} />
                        <span className="text-sm font-medium">{order.progress}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{order.stage}</td>
                    <td className="p-3 text-sm">{order.delivery}</td>
                    <td className="p-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="p-3">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-gray-500">
                    No order tracking data found for the selected branch.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderLinePerformance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Line Performance</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Performance Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Performance Summary</h4>
          {filteredLinePerformance.length > 0 ? (
            <div className="space-y-4">
              {filteredLinePerformance.map((line, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold">{line.line}</h5>
                    <span className={`text-sm font-medium ${
                      line.efficiency >= 90 ? 'text-green-600' : 
                      line.efficiency >= 80 ? 'text-yellow-600' : 
                      line.efficiency === 0 ? 'text-gray-500' : 'text-red-600'
                    }`}>
                      {line.efficiency === 0 ? 'Maintenance' : `${line.efficiency}% Efficiency`}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Target</p>
                      <p className="font-semibold">{line.target}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Actual</p>
                      <p className="font-semibold">{line.actual}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Defects</p>
                      <p className="font-semibold text-red-600">{line.defects}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No line performance data found for the selected branch.</p>
          )}
        </div>

        {/* Efficiency Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Weekly Efficiency Trends</h4>
          {filteredWeeklyEfficiency.length > 0 ? (
            <div className="space-y-4">
              {filteredWeeklyEfficiency.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-20">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <ProgressBar 
                      progress={day.efficiency} 
                      color={day.efficiency >= 90 ? 'green' : day.efficiency >= 85 ? 'yellow' : 'red'}
                    />
                  </div>
                  <span className="text-sm font-semibold w-12">{day.efficiency}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No weekly efficiency data found for the selected branch.</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderQualityControl = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Quality Control</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          New Inspection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Quality Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {filteredQualityInspections.length > 0 
                  ? (filteredQualityInspections.reduce((sum, inspection) => sum + inspection.rate, 0) / filteredQualityInspections.length).toFixed(1)
                  : 0}%
              </p>
            </div>
            <Shield className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Defect Rate</p>
              <p className="text-2xl font-bold text-red-600">
                {filteredQualityInspections.length > 0 
                  ? (100 - (filteredQualityInspections.reduce((sum, inspection) => sum + inspection.rate, 0) / filteredQualityInspections.length)).toFixed(1)
                  : 0}%
              </p>
            </div>
            <AlertTriangle className="text-red-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Inspections Today</p>
              <p className="text-2xl font-bold text-blue-600">{filteredQualityInspections.length}</p>
            </div>
            <CheckCircle className="text-blue-500" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Recent Quality Inspections</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Time</th>
                <th className="p-3 font-semibold text-sm">Line</th>
                <th className="p-3 font-semibold text-sm">Order</th>
                <th className="p-3 font-semibold text-sm">Inspector</th>
                <th className="p-3 font-semibold text-sm">Checked</th>
                <th className="p-3 font-semibold text-sm">Passed</th>
                <th className="p-3 font-semibold text-sm">Defects</th>
                <th className="p-3 font-semibold text-sm">Rate</th>
                <th className="p-3 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredQualityInspections.length > 0 ? (
                filteredQualityInspections.map((inspection, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm">{inspection.time}</td>
                    <td className="p-3 text-sm font-medium">{inspection.line}</td>
                    <td className="p-3 text-sm text-blue-600">{inspection.order}</td>
                    <td className="p-3 text-sm">{inspection.inspector}</td>
                    <td className="p-3 text-sm">{inspection.checked}</td>
                    <td className="p-3 text-sm text-green-600">{inspection.passed}</td>
                    <td className="p-3 text-sm text-red-600">{inspection.defects}</td>
                    <td className="p-3 text-sm font-semibold">{inspection.rate}%</td>
                    <td className="p-3">
                      <StatusBadge status={inspection.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-gray-500">
                    No quality inspections found for the selected branch.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDataEntry = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Data Entry</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          New Entry
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Data Entry */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Production Data Entry</h4>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Line</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Select Line</option>
                  {filteredProductionLines.map((line, index) => (
                    <option key={index} value={line.line}>{line.line}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hour</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Select Hour</option>
                  <option>8:00 AM</option>
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Production Quantity</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter quantity produced"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Defects</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter number of defects"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
              <textarea
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional notes..."
              />
            </div>
            <Button className="w-full">Submit Production Data</Button>
          </form>
        </div>

        {/* Quality Data Entry */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Quality Inspection Entry</h4>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Line</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Select Line</option>
                  {filteredProductionLines.map((line, index) => (
                    <option key={index} value={line.line}>{line.line}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inspector</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Select Inspector</option>
                  <option>Fatima Begum</option>
                  <option>Abul Kalam</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sample Size</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Number of pieces checked"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Defects Found</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Number of defective pieces"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Defect Types</label>
              <textarea
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe types of defects found..."
              />
            </div>
            <Button className="w-full" variant="success">Submit Quality Data</Button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Production Reports</h3>
        <Button size="sm">
          <Download size={16} className="mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Daily Production Report', description: 'Hourly production data for all lines', icon: BarChart3, color: 'blue' },
          { title: 'Quality Control Report', description: 'Quality metrics and defect analysis', icon: Shield, color: 'green' },
          { title: 'Line Efficiency Report', description: 'Performance analysis by production line', icon: Activity, color: 'purple' },
          { title: 'Order Progress Report', description: 'Status and progress of all orders', icon: TrendingUp, color: 'orange' },
          { title: 'Defect Analysis Report', description: 'Detailed breakdown of quality issues', icon: AlertTriangle, color: 'red' },
          { title: 'Performance Summary', description: 'Overall production performance metrics', icon: Award, color: 'yellow' }
        ].map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className={`w-12 h-12 rounded-lg bg-${report.color}-100 flex items-center justify-center mb-4`}>
              <report.icon className={`text-${report.color}-600`} size={24} />
            </div>
            <h4 className="font-semibold text-lg mb-2">{report.title}</h4>
            <p className="text-gray-600 text-sm mb-4">{report.description}</p>
            <Button size="sm" variant="secondary" className="w-full">
              <FileText size={14} className="mr-2" />
              Generate
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Production Settings</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Targets */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Production Targets</h4>
          <div className="space-y-4">
            {filteredProductionLines.map((line, index) => (
              <div key={index} className="flex items-center justify-between">
                <label className="text-sm font-medium">{line.line} Daily Target</label>
                <input
                  type="number"
                  defaultValue={line.target}
                  className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>
          <Button className="w-full mt-4">Save Targets</Button>
        </div>

        {/* Quality Standards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Quality Standards</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Minimum Quality Rate (%)</label>
              <input
                type="number"
                defaultValue={95}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Maximum Defect Rate (%)</label>
              <input
                type="number"
                defaultValue={5}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Inspection Frequency (hours)</label>
              <input
                type="number"
                defaultValue={2}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <Button className="w-full mt-4">Save Standards</Button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'order-tracking':
        return renderOrderTracking();
      case 'line-performance':
        return renderLinePerformance();
      case 'quality-control':
        return renderQualityControl();
      case 'data-entry':
        return renderDataEntry();
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

export default ProductionPerformance;