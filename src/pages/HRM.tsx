import React, { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  DollarSign, 
  UserCheck, 
  Calendar, 
  FileText, 
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Activity,
  Edit,
  Eye,
  UserPlus,
  CreditCard,
  Calculator,
  BarChart3
} from 'lucide-react';
import Button from '../components/UI/Button';
import StatusBadge from '../components/UI/StatusBadge';
import { employees } from '../data/mockData';

const HRM: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dashboard');

  useEffect(() => {
    setPageTitle('Human Resource Management');
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
    { id: 'attendance', label: 'হাজিরা', icon: Clock },
    { id: 'payroll', label: 'বেতন ব্যবস্থাপনা', icon: DollarSign },
    { id: 'employees', label: 'কর্মচারী তথ্য', icon: Users },
    { id: 'leave-management', label: 'ছুটি ব্যবস্থাপনা', icon: Calendar },
    { id: 'performance', label: 'কর্মক্ষমতা মূল্যায়ন', icon: Award },
    { id: 'reports', label: 'রিপোর্ট', icon: FileText },
    { id: 'settings', label: 'সেটিংস', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">HR Dashboard</h3>
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

      {/* Key HR Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">মোট কর্মচারী</p>
              <p className="text-2xl font-bold text-blue-600">156</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <UserPlus size={12} className="mr-1" />
                +8 this month
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
              <p className="text-sm font-medium text-gray-500">আজকের উপস্থিতি</p>
              <p className="text-2xl font-bold text-green-600">142/156</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <CheckCircle size={12} className="mr-1" />
                91% attendance rate
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <UserCheck className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">মাসিক বেতন</p>
              <p className="text-2xl font-bold text-purple-600">৳18,75,000</p>
              <p className="text-xs text-red-500 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +5.2% from last month
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <CreditCard className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">ছুটিতে আছেন</p>
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <Calendar size={12} className="mr-1" />
                Various leave types
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Calendar className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Department-wise Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Users className="mr-2" size={20} />
            বিভাগ অনুযায়ী উপস্থিতি
          </h4>
          <div className="space-y-4">
            {[
              { dept: 'Sewing', present: 45, total: 50, percentage: 90 },
              { dept: 'Cutting', present: 18, total: 20, percentage: 90 },
              { dept: 'Finishing', present: 28, total: 30, percentage: 93.3 },
              { dept: 'Quality', present: 12, total: 15, percentage: 80 },
              { dept: 'Packing', present: 22, total: 25, percentage: 88 },
              { dept: 'Administration', present: 17, total: 16, percentage: 100 }
            ].map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{dept.dept}</span>
                    <span className="text-gray-600">{dept.present}/{dept.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        dept.percentage >= 95 ? 'bg-green-500' : 
                        dept.percentage >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
                <span className={`ml-3 text-sm font-semibold ${
                  dept.percentage >= 95 ? 'text-green-600' : 
                  dept.percentage >= 85 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {dept.percentage.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Activity className="mr-2" size={20} />
            সাম্প্রতিক কার্যক্রম
          </h4>
          <div className="space-y-3">
            {[
              { time: '09:15 AM', activity: 'নতুন কর্মচারী যোগদান', person: 'রহিম উদ্দিন', type: 'join' },
              { time: '08:45 AM', activity: 'ছুটির আবেদন অনুমোদন', person: 'ফাতিমা খাতুন', type: 'leave' },
              { time: '08:30 AM', activity: 'দেরিতে আসা', person: 'করিম মিয়া', type: 'late' },
              { time: '08:00 AM', activity: 'বেতন প্রক্রিয়াকরণ সম্পন্ন', person: 'HR Team', type: 'payroll' },
              { time: '07:45 AM', activity: 'ওভারটাইম অনুমোদন', person: 'সালমা বেগম', type: 'overtime' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'join' ? 'bg-green-500' :
                  activity.type === 'leave' ? 'bg-blue-500' :
                  activity.type === 'late' ? 'bg-red-500' :
                  activity.type === 'payroll' ? 'bg-purple-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.activity}</p>
                  <p className="text-xs text-gray-600">{activity.person} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Attendance Trends */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 flex items-center">
          <BarChart3 className="mr-2" size={20} />
          মাসিক উপস্থিতির ট্রেন্ড
        </h4>
        <div className="space-y-3">
          {[
            { week: 'সপ্তাহ ১', attendance: 92.5, target: 90 },
            { week: 'সপ্তাহ ২', attendance: 89.2, target: 90 },
            { week: 'সপ্তাহ ৩', attendance: 94.1, target: 90 },
            { week: 'সপ্তাহ ৪', attendance: 91.8, target: 90 }
          ].map((week, index) => {
            const percentage = (week.attendance / 100) * 100;
            const isAboveTarget = week.attendance >= week.target;
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{week.week}</span>
                  <span className={`font-semibold ${isAboveTarget ? 'text-green-600' : 'text-red-600'}`}>
                    {week.attendance}% (Target: {week.target}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${
                      isAboveTarget ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">হাজিরা ব্যবস্থাপনা</h3>
        <div className="flex space-x-3">
          <input
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">উপস্থিত</p>
              <p className="text-2xl font-bold text-green-600">142</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">অনুপস্থিত</p>
              <p className="text-2xl font-bold text-red-600">14</p>
            </div>
            <XCircle className="text-red-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">দেরিতে আসা</p>
              <p className="text-2xl font-bold text-yellow-600">8</p>
            </div>
            <AlertCircle className="text-yellow-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">ছুটিতে</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <Calendar className="text-blue-500" size={32} />
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>All Departments</option>
            <option>Sewing</option>
            <option>Cutting</option>
            <option>Finishing</option>
            <option>Quality</option>
          </select>
          <Button variant="secondary" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Employee ID</th>
                <th className="p-3 font-semibold text-sm">Name</th>
                <th className="p-3 font-semibold text-sm">Department</th>
                <th className="p-3 font-semibold text-sm">In Time</th>
                <th className="p-3 font-semibold text-sm">Out Time</th>
                <th className="p-3 font-semibold text-sm">Working Hours</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'EMP-0101', name: 'আবুল কালাম', dept: 'Sewing', inTime: '08:00', outTime: '17:00', hours: '9:00', status: 'Present' },
                { id: 'EMP-0256', name: 'ফাতিমা বেগম', dept: 'Quality', inTime: '08:15', outTime: '17:15', hours: '9:00', status: 'Late' },
                { id: 'EMP-0102', name: 'করিম মিয়া', dept: 'Cutting', inTime: '-', outTime: '-', hours: '-', status: 'Absent' },
                { id: 'EMP-0203', name: 'সালমা খাতুন', dept: 'Finishing', inTime: '08:00', outTime: '-', hours: 'Working', status: 'Present' }
              ].map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{emp.id}</td>
                  <td className="p-3 text-sm">{emp.name}</td>
                  <td className="p-3 text-sm">{emp.dept}</td>
                  <td className="p-3 text-sm">{emp.inTime}</td>
                  <td className="p-3 text-sm">{emp.outTime}</td>
                  <td className="p-3 text-sm">{emp.hours}</td>
                  <td className="p-3">
                    <StatusBadge status={emp.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Edit size={14} />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
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

  const renderPayroll = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">বেতন ব্যবস্থাপনা</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>January 2025</option>
            <option>December 2024</option>
            <option>November 2024</option>
          </select>
          <Button variant="secondary" size="sm">
            <Calculator size={16} className="mr-2" />
            Calculate Payroll
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Payroll Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">মোট বেতন</p>
              <p className="text-2xl font-bold text-blue-600">৳18,75,000</p>
            </div>
            <DollarSign className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">মূল বেতন</p>
              <p className="text-2xl font-bold text-green-600">৳12,50,000</p>
            </div>
            <CreditCard className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">ভাতা</p>
              <p className="text-2xl font-bold text-purple-600">৳6,25,000</p>
            </div>
            <Plus className="text-purple-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">কর্তন</p>
              <p className="text-2xl font-bold text-red-600">৳78,000</p>
            </div>
            <TrendingDown className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">বেতন বিবরণী - জানুয়ারি ২০২৫</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Employee ID</th>
                <th className="p-3 font-semibold text-sm">Name</th>
                <th className="p-3 font-semibold text-sm">Designation</th>
                <th className="p-3 font-semibold text-sm">Basic Salary</th>
                <th className="p-3 font-semibold text-sm">Allowances</th>
                <th className="p-3 font-semibold text-sm">Overtime</th>
                <th className="p-3 font-semibold text-sm">Deductions</th>
                <th className="p-3 font-semibold text-sm">Net Salary</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  id: 'EMP-0101', 
                  name: 'আবুল কালাম', 
                  designation: 'Machine Operator', 
                  basic: 8000, 
                  allowances: 5500, 
                  overtime: 1200, 
                  deductions: 500, 
                  net: 14200, 
                  status: 'Processed' 
                },
                { 
                  id: 'EMP-0256', 
                  name: 'ফাতিমা বেগম', 
                  designation: 'Quality Inspector', 
                  basic: 12000, 
                  allowances: 7500, 
                  overtime: 800, 
                  deductions: 500, 
                  net: 19800, 
                  status: 'Pending' 
                },
                { 
                  id: 'EMP-0102', 
                  name: 'করিম মিয়া', 
                  designation: 'Cutting Master', 
                  basic: 15000, 
                  allowances: 8500, 
                  overtime: 1500, 
                  deductions: 750, 
                  net: 24250, 
                  status: 'Processed' 
                }
              ].map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{emp.id}</td>
                  <td className="p-3 text-sm">{emp.name}</td>
                  <td className="p-3 text-sm">{emp.designation}</td>
                  <td className="p-3 text-sm">৳{emp.basic.toLocaleString()}</td>
                  <td className="p-3 text-sm">৳{emp.allowances.toLocaleString()}</td>
                  <td className="p-3 text-sm">৳{emp.overtime.toLocaleString()}</td>
                  <td className="p-3 text-sm text-red-600">৳{emp.deductions.toLocaleString()}</td>
                  <td className="p-3 text-sm font-semibold text-green-600">৳{emp.net.toLocaleString()}</td>
                  <td className="p-3">
                    <StatusBadge status={emp.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="success">
                        Pay
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Basic:</span>
              <span className="font-semibold ml-2">৳35,000</span>
            </div>
            <div>
              <span className="text-gray-600">Total Allowances:</span>
              <span className="font-semibold ml-2">৳21,500</span>
            </div>
            <div>
              <span className="text-gray-600">Total Overtime:</span>
              <span className="font-semibold ml-2">৳3,500</span>
            </div>
            <div>
              <span className="text-gray-600">Net Payable:</span>
              <span className="font-semibold ml-2 text-green-600">৳58,250</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">কর্মচারী তথ্য</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search employees..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Employee ID</th>
                <th className="p-3 font-semibold text-sm">Name</th>
                <th className="p-3 font-semibold text-sm">Designation</th>
                <th className="p-3 font-semibold text-sm">Department</th>
                <th className="p-3 font-semibold text-sm">Phone</th>
                <th className="p-3 font-semibold text-sm">Joining Date</th>
                <th className="p-3 font-semibold text-sm">Salary</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{emp.id}</td>
                  <td className="p-3 text-sm">{emp.name}</td>
                  <td className="p-3 text-sm">{emp.designation}</td>
                  <td className="p-3 text-sm">{emp.department}</td>
                  <td className="p-3 text-sm">{emp.phone}</td>
                  <td className="p-3 text-sm">{emp.joiningDate}</td>
                  <td className="p-3 text-sm">৳{emp.salary.basic.toLocaleString()}</td>
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

  const renderLeaveManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ছুটি ব্যবস্থাপনা</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          Apply Leave
        </Button>
      </div>

      {/* Leave Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-600">8</p>
            </div>
            <Clock className="text-yellow-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Approved Today</p>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">On Leave Today</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <Calendar className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>
            <XCircle className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">ছুটির আবেদন</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Employee</th>
                <th className="p-3 font-semibold text-sm">Leave Type</th>
                <th className="p-3 font-semibold text-sm">From Date</th>
                <th className="p-3 font-semibold text-sm">To Date</th>
                <th className="p-3 font-semibold text-sm">Days</th>
                <th className="p-3 font-semibold text-sm">Reason</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { emp: 'আবুল কালাম', type: 'Sick Leave', from: '2025-01-20', to: '2025-01-22', days: 3, reason: 'Fever', status: 'Pending' },
                { emp: 'ফাতিমা বেগম', type: 'Annual Leave', from: '2025-01-25', to: '2025-01-27', days: 3, reason: 'Personal', status: 'Approved' },
                { emp: 'করিম মিয়া', type: 'Emergency Leave', from: '2025-01-18', to: '2025-01-18', days: 1, reason: 'Family emergency', status: 'Approved' }
              ].map((leave, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{leave.emp}</td>
                  <td className="p-3 text-sm">{leave.type}</td>
                  <td className="p-3 text-sm">{leave.from}</td>
                  <td className="p-3 text-sm">{leave.to}</td>
                  <td className="p-3 text-sm">{leave.days}</td>
                  <td className="p-3 text-sm">{leave.reason}</td>
                  <td className="p-3">
                    <StatusBadge status={leave.status} />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="success">Approve</Button>
                      <Button size="sm" variant="danger">Reject</Button>
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

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">কর্মক্ষমতা মূল্যায়ন</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          New Evaluation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Top Performers</h4>
          <div className="space-y-4">
            {[
              { name: 'ফাতিমা বেগম', dept: 'Quality', score: 95, trend: 'up' },
              { name: 'আবুল কালাম', dept: 'Sewing', score: 92, trend: 'up' },
              { name: 'করিম মিয়া', dept: 'Cutting', score: 89, trend: 'stable' },
              { name: 'সালমা খাতুন', dept: 'Finishing', score: 87, trend: 'down' }
            ].map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{performer.name}</p>
                  <p className="text-sm text-gray-600">{performer.dept}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-lg">{performer.score}%</span>
                  {performer.trend === 'up' && <TrendingUp className="text-green-500" size={16} />}
                  {performer.trend === 'down' && <TrendingDown className="text-red-500" size={16} />}
                  {performer.trend === 'stable' && <Target className="text-gray-500" size={16} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Performance Distribution</h4>
          <div className="space-y-4">
            {[
              { range: 'Excellent (90-100%)', count: 25, percentage: 16, color: 'bg-green-500' },
              { range: 'Good (80-89%)', count: 68, percentage: 44, color: 'bg-blue-500' },
              { range: 'Average (70-79%)', count: 45, percentage: 29, color: 'bg-yellow-500' },
              { range: 'Below Average (<70%)', count: 18, percentage: 11, color: 'bg-red-500' }
            ].map((range, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{range.range}</span>
                  <span>{range.count} employees ({range.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${range.color}`}
                    style={{ width: `${range.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">HR Reports</h3>
        <Button size="sm">
          <Download size={16} className="mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Attendance Report', description: 'Monthly attendance summary', icon: Clock, color: 'blue' },
          { title: 'Payroll Report', description: 'Salary and benefits breakdown', icon: DollarSign, color: 'green' },
          { title: 'Employee Report', description: 'Complete employee information', icon: Users, color: 'purple' },
          { title: 'Leave Report', description: 'Leave applications and balances', icon: Calendar, color: 'orange' },
          { title: 'Performance Report', description: 'Employee performance metrics', icon: Award, color: 'yellow' },
          { title: 'Department Report', description: 'Department-wise analytics', icon: BarChart3, color: 'red' }
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
      <h3 className="text-xl font-semibold">HR Settings</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Working Hours</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Office Start Time</label>
              <input
                type="time"
                defaultValue="08:00"
                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Office End Time</label>
              <input
                type="time"
                defaultValue="17:00"
                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Lunch Break (minutes)</label>
              <input
                type="number"
                defaultValue={60}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <Button className="w-full mt-4">Save Working Hours</Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Leave Policies</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Annual Leave Days</label>
              <input
                type="number"
                defaultValue={21}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Sick Leave Days</label>
              <input
                type="number"
                defaultValue={14}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Emergency Leave Days</label>
              <input
                type="number"
                defaultValue={7}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <Button className="w-full mt-4">Save Leave Policies</Button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'attendance':
        return renderAttendance();
      case 'payroll':
        return renderPayroll();
      case 'employees':
        return renderEmployees();
      case 'leave-management':
        return renderLeaveManagement();
      case 'performance':
        return renderPerformance();
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

export default HRM;