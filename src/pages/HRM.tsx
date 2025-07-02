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
import { useBranchFilter } from '../hooks/useBranchFilter';

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
    { id: 'summary', label: 'Summary', icon: BarChart3 },
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: BarChart3 },
    { id: 'attendance', label: 'হাজিরা', icon: Clock },
    { id: 'payroll', label: 'বেতন ব্যবস্থাপনা', icon: DollarSign },
    { id: 'employees', label: 'কর্মচারী তথ্য', icon: Users },
    { id: 'leave-management', label: 'ছুটি ব্যবস্থাপনা', icon: Calendar },
    { id: 'performance', label: 'কর্মক্ষমতা মূল্যায়ন', icon: Award },
    { id: 'reports', label: 'রিপোর্ট', icon: FileText },
    { id: 'settings', label: 'সেটিংস', icon: Settings }
  ];

  // Branch filtered employees
  const filteredEmployees = useBranchFilter(employees);

  // Branch filtered attendance (for demo, using employees as attendance source)
  const filteredAttendance = useBranchFilter(employees);

  // Branch filtered payroll (for demo, using employees as payroll source)
  const filteredPayroll = useBranchFilter(employees);

  // Branch filtered leave (for demo, using employees as leave source)
  const filteredLeave = useBranchFilter(employees);

  // Branch filtered performance (for demo, using employees as performance source)
  const filteredPerformance = useBranchFilter(employees);

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
              <p className="text-2xl font-bold text-blue-600">{filteredEmployees.length}</p>
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
              {filteredAttendance.map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{emp.id}</td>
                  <td className="p-3 text-sm">{emp.name}</td>
                  <td className="p-3 text-sm">{emp.department}</td>
                  <td className="p-3 text-sm">08:00</td>
                  <td className="p-3 text-sm">17:00</td>
                  <td className="p-3 text-sm">9:00</td>
                  <td className="p-3">
                    <StatusBadge status="Present" />
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
              {filteredPayroll.map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{emp.id}</td>
                  <td className="p-3 text-sm">{emp.name}</td>
                  <td className="p-3 text-sm">{emp.designation}</td>
                  <td className="p-3 text-sm">৳{emp.salary.basic.toLocaleString()}</td>
                  <td className="p-3 text-sm">৳{emp.salary.houseRent.toLocaleString()}</td>
                  <td className="p-3 text-sm">৳{emp.salary.medical.toLocaleString()}</td>
                  <td className="p-3 text-sm text-red-600">৳{emp.salary.other.toLocaleString()}</td>
                  <td className="p-3 text-sm font-semibold text-green-600">৳{(emp.salary.basic+emp.salary.houseRent+emp.salary.medical+emp.salary.conveyance+emp.salary.other).toLocaleString()}</td>
                  <td className="p-3">
                    <StatusBadge status="Processed" />
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
              {filteredEmployees.map((emp, index) => (
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
              {filteredLeave.map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{emp.name}</td>
                  <td className="p-3 text-sm">Annual Leave</td>
                  <td className="p-3 text-sm">2025-01-20</td>
                  <td className="p-3 text-sm">2025-01-22</td>
                  <td className="p-3 text-sm">3</td>
                  <td className="p-3 text-sm">Personal</td>
                  <td className="p-3">
                    <StatusBadge status="Pending" />
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
            {filteredPerformance.map((emp, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{emp.name}</p>
                  <p className="text-sm text-gray-600">{emp.department}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-lg">92%</span>
                  <TrendingUp className="text-green-500" size={16} />
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
        {/* Branch-wise filtered report cards */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
            <Clock className="text-blue-600" size={24} />
          </div>
          <h4 className="font-semibold text-lg mb-2">Attendance Report</h4>
          <p className="text-gray-600 text-sm mb-2">Monthly attendance summary</p>
          <div className="mb-2 text-sm text-gray-700">
            Total Employees: <span className="font-semibold">{filteredAttendance.length}</span>
          </div>
          <Button size="sm" variant="secondary" className="w-full">
            <FileText size={14} className="mr-2" />
            Generate
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
            <DollarSign className="text-green-600" size={24} />
          </div>
          <h4 className="font-semibold text-lg mb-2">Payroll Report</h4>
          <p className="text-gray-600 text-sm mb-2">Salary and benefits breakdown</p>
          <div className="mb-2 text-sm text-gray-700">
            Total Employees: <span className="font-semibold">{filteredPayroll.length}</span>
          </div>
          <Button size="sm" variant="secondary" className="w-full">
            <FileText size={14} className="mr-2" />
            Generate
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
            <Users className="text-purple-600" size={24} />
          </div>
          <h4 className="font-semibold text-lg mb-2">Employee Report</h4>
          <p className="text-gray-600 text-sm mb-2">Complete employee information</p>
          <div className="mb-2 text-sm text-gray-700">
            Total Employees: <span className="font-semibold">{filteredEmployees.length}</span>
          </div>
          <Button size="sm" variant="secondary" className="w-full">
            <FileText size={14} className="mr-2" />
            Generate
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
            <Calendar className="text-orange-600" size={24} />
          </div>
          <h4 className="font-semibold text-lg mb-2">Leave Report</h4>
          <p className="text-gray-600 text-sm mb-2">Leave applications and balances</p>
          <div className="mb-2 text-sm text-gray-700">
            Total Employees: <span className="font-semibold">{filteredLeave.length}</span>
          </div>
          <Button size="sm" variant="secondary" className="w-full">
            <FileText size={14} className="mr-2" />
            Generate
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-4">
            <Award className="text-yellow-600" size={24} />
          </div>
          <h4 className="font-semibold text-lg mb-2">Performance Report</h4>
          <p className="text-gray-600 text-sm mb-2">Employee performance metrics</p>
          <div className="mb-2 text-sm text-gray-700">
            Total Employees: <span className="font-semibold">{filteredPerformance.length}</span>
          </div>
          <Button size="sm" variant="secondary" className="w-full">
            <FileText size={14} className="mr-2" />
            Generate
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
            <BarChart3 className="text-red-600" size={24} />
          </div>
          <h4 className="font-semibold text-lg mb-2">Department Report</h4>
          <p className="text-gray-600 text-sm mb-2">Department-wise analytics</p>
          <div className="mb-2 text-sm text-gray-700">
            Total Employees: <span className="font-semibold">{filteredEmployees.length}</span>
          </div>
          <Button size="sm" variant="secondary" className="w-full">
            <FileText size={14} className="mr-2" />
            Generate
          </Button>
        </div>
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

  // Summary for all branches (not filtered)
  function renderSummary() {
    // Use the full employees array for all-branch summary
    const totalEmployees = employees.length;
    // Example: count present, absent, leave, etc. For demo, use static or derived values
    const present = Math.floor(totalEmployees * 0.91);
    const onLeave = 12;
    const totalPayroll = employees.reduce((sum, emp) => sum + (emp.salary?.basic || 0), 0);
    const topPerformers = employees.slice(0, 5);
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">All Branches Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">মোট কর্মচারী</p>
            <p className="text-2xl font-bold text-blue-600">{totalEmployees}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">আজকের উপস্থিতি</p>
            <p className="text-2xl font-bold text-green-600">{present}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">ছুটিতে আছেন</p>
            <p className="text-2xl font-bold text-orange-600">{onLeave}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">মোট বেতন (Basic)</p>
            <p className="text-2xl font-bold text-purple-600">৳{totalPayroll.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">Top Performers (All Branches)</h4>
          <div className="space-y-2">
            {topPerformers.map((emp: any, idx: number) => (
              <div key={emp.id || idx} className="flex justify-between border-b py-2">
                <span>{emp.name}</span>
                <span className="text-gray-500 text-sm">{emp.department}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderTabContent() {
    switch (activeTab) {
      case 'summary':
        return renderSummary();
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
  }

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