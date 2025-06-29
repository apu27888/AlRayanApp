import React, { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { 
  FileText, 
  CreditCard, 
  Receipt, 
  Calculator, 
  Banknote, 
  Building, 
  UserCheck, 
  PieChart,
  Plus,
  Search,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Activity,
  AlertCircle
} from 'lucide-react';
import Button from '../components/UI/Button';

const Finance: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dashboard');

  useEffect(() => {
    setPageTitle('Finance Management');
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
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'general-ledger', label: 'General Ledger', icon: FileText },
    { id: 'accounts-payable', label: 'Accounts Payable', icon: CreditCard },
    { id: 'accounts-receivable', label: 'Accounts Receivable', icon: Receipt },
    { id: 'order-costing', label: 'অর্ডার কস্টিং', icon: Calculator },
    { id: 'cash-bank', label: 'ক্যাশ ও ব্যাংক', icon: Banknote },
    { id: 'fixed-assets', label: 'Fixed Assets', icon: Building },
    { id: 'payroll', label: 'পেরোল', icon: UserCheck },
    { id: 'reporting', label: 'রিপোর্টিং', icon: PieChart }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Finance Dashboard</h3>
        <div className="flex space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">মোট আয়</p>
              <p className="text-2xl font-bold text-green-600">৳12,45,000</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +15.3% from last month
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">মোট ব্যয়</p>
              <p className="text-2xl font-bold text-red-600">৳8,75,000</p>
              <p className="text-xs text-red-500 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +8.2% from last month
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <TrendingDown className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">নেট লাভ</p>
              <p className="text-2xl font-bold text-blue-600">৳3,70,000</p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp size={12} className="mr-1" />
                +22.5% from last month
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
              <p className="text-sm font-medium text-gray-500">ক্যাশ ব্যালেন্স</p>
              <p className="text-2xl font-bold text-purple-600">৳10,00,000</p>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <Activity size={12} className="mr-1" />
                Available funds
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Banknote className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Income vs Expense Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <BarChart3 className="mr-2" size={20} />
            মাসিক আয় ও ব্যয়
          </h4>
          <div className="space-y-4">
            {[
              { month: 'জানুয়ারি', income: 1245000, expense: 875000 },
              { month: 'ফেব্রুয়ারি', income: 1180000, expense: 920000 },
              { month: 'মার্চ', income: 1350000, expense: 850000 },
              { month: 'এপ্রিল', income: 1420000, expense: 980000 },
              { month: 'মে', income: 1280000, expense: 890000 },
              { month: 'জুন', income: 1380000, expense: 920000 }
            ].map((item, index) => {
              const maxValue = Math.max(item.income, item.expense);
              const incomePercent = (item.income / maxValue) * 100;
              const expensePercent = (item.expense / maxValue) * 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{item.month}</span>
                    <div className="flex space-x-4">
                      <span className="text-green-600">৳{(item.income / 1000).toFixed(0)}K</span>
                      <span className="text-red-600">৳{(item.expense / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-green-600 w-12">আয়:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${incomePercent}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-red-600 w-12">ব্যয়:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-red-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${expensePercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expense Categories Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <PieChart className="mr-2" size={20} />
            খরচের খাত
          </h4>
          <div className="space-y-4">
            {[
              { category: 'কাঁচামাল', amount: 350000, color: 'bg-blue-500', percentage: 40 },
              { category: 'বেতন ও ভাতা', amount: 262500, color: 'bg-green-500', percentage: 30 },
              { category: 'ইউটিলিটি', amount: 87500, color: 'bg-yellow-500', percentage: 10 },
              { category: 'ভাড়া', amount: 87500, color: 'bg-purple-500', percentage: 10 },
              { category: 'অন্যান্য', amount: 87500, color: 'bg-red-500', percentage: 10 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium">{item.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">৳{(item.amount / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-gray-500">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Visual Pie Chart Representation */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#e5e7eb" strokeWidth="2"/>
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#3b82f6" strokeWidth="2" 
                        strokeDasharray="40 60" strokeDashoffset="0"/>
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#10b981" strokeWidth="2" 
                        strokeDasharray="30 70" strokeDashoffset="-40"/>
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#eab308" strokeWidth="2" 
                        strokeDasharray="10 90" strokeDashoffset="-70"/>
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#8b5cf6" strokeWidth="2" 
                        strokeDasharray="10 90" strokeDashoffset="-80"/>
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#ef4444" strokeWidth="2" 
                        strokeDasharray="10 90" strokeDashoffset="-90"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payables */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-lg flex items-center">
              <CreditCard className="mr-2 text-red-500" size={20} />
              সাম্প্রতিক প্রাপ্য (Payables)
            </h4>
            <Button variant="secondary" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {[
              { vendor: 'ABC Trims', amount: 75000, due: '2025-02-10', status: 'Pending', urgent: false },
              { vendor: 'XYZ Fabrics', amount: 45000, due: '2025-01-20', status: 'Overdue', urgent: true },
              { vendor: 'Cotton Mills Ltd', amount: 125000, due: '2025-02-15', status: 'Pending', urgent: false },
              { vendor: 'Button Supplier', amount: 25000, due: '2025-01-25', status: 'Overdue', urgent: true }
            ].map((item, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                item.urgent ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{item.vendor}</p>
                    <p className="text-xs text-gray-600">Due: {item.due}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">৳{item.amount.toLocaleString()}</p>
                    <div className="flex items-center space-x-1">
                      {item.urgent && <AlertCircle size={12} className="text-red-500" />}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>মোট প্রাপ্য:</span>
              <span className="font-semibold text-red-600">৳2,70,000</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>অতিরিক্ত বকেয়া:</span>
              <span className="font-semibold text-red-700">৳70,000</span>
            </div>
          </div>
        </div>

        {/* Recent Receivables */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-lg flex items-center">
              <Receipt className="mr-2 text-green-500" size={20} />
              সাম্প্রতিক পাওনা (Receivables)
            </h4>
            <Button variant="secondary" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {[
              { customer: 'H&M', amount: 425000, due: '2025-02-10', status: 'Pending', order: '#ORD-001' },
              { customer: 'Zara', amount: 125000, due: '2025-01-25', status: 'Overdue', order: '#ORD-002' },
              { customer: 'Uniqlo', amount: 325000, due: '2025-02-15', status: 'Pending', order: '#ORD-003' },
              { customer: 'H&M', amount: 275000, due: '2025-02-20', status: 'Pending', order: '#ORD-004' }
            ].map((item, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                item.status === 'Overdue' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{item.customer}</p>
                    <p className="text-xs text-gray-600">{item.order} • Due: {item.due}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">৳{item.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>মোট পাওনা:</span>
              <span className="font-semibold text-green-600">৳11,50,000</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>অতিরিক্ত বকেয়া:</span>
              <span className="font-semibold text-red-600">৳1,25,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 h-20"
            onClick={() => handleTabChange('general-ledger')}
          >
            <FileText size={24} />
            <span className="text-sm">New Entry</span>
          </Button>
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 h-20"
            onClick={() => handleTabChange('accounts-payable')}
          >
            <CreditCard size={24} />
            <span className="text-sm">Pay Bill</span>
          </Button>
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 h-20"
            onClick={() => handleTabChange('accounts-receivable')}
          >
            <Receipt size={24} />
            <span className="text-sm">Create Invoice</span>
          </Button>
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 h-20"
            onClick={() => handleTabChange('reporting')}
          >
            <PieChart size={24} />
            <span className="text-sm">View Reports</span>
          </Button>
        </div>
      </div>
    </div>
  );

  const renderGeneralLedger = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">General Ledger</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            New Entry
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option>All Accounts</option>
            <option>Assets</option>
            <option>Liabilities</option>
            <option>Equity</option>
            <option>Revenue</option>
            <option>Expenses</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Date</th>
                <th className="p-3 font-semibold text-sm">Account</th>
                <th className="p-3 font-semibold text-sm">Description</th>
                <th className="p-3 font-semibold text-sm">Reference</th>
                <th className="p-3 font-semibold text-sm">Debit</th>
                <th className="p-3 font-semibold text-sm">Credit</th>
                <th className="p-3 font-semibold text-sm">Balance</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2025-01-15', account: 'Cash', description: 'Order payment received', ref: 'ORD-001', debit: 50000, credit: 0, balance: 150000 },
                { date: '2025-01-14', account: 'Fabric Purchase', description: 'Cotton fabric purchase', ref: 'PUR-045', debit: 0, credit: 25000, balance: 100000 },
                { date: '2025-01-13', account: 'Salary Expense', description: 'Monthly salary payment', ref: 'SAL-001', debit: 0, credit: 35000, balance: 125000 },
                { date: '2025-01-12', account: 'Equipment', description: 'New sewing machine', ref: 'EQP-012', debit: 15000, credit: 0, balance: 160000 }
              ].map((entry, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm">{entry.date}</td>
                  <td className="p-3 text-sm font-medium">{entry.account}</td>
                  <td className="p-3 text-sm">{entry.description}</td>
                  <td className="p-3 text-sm text-blue-600">{entry.ref}</td>
                  <td className="p-3 text-sm font-semibold text-green-600">
                    {entry.debit > 0 ? `৳${entry.debit.toLocaleString()}` : '-'}
                  </td>
                  <td className="p-3 text-sm font-semibold text-red-600">
                    {entry.credit > 0 ? `৳${entry.credit.toLocaleString()}` : '-'}
                  </td>
                  <td className="p-3 text-sm font-semibold">৳{entry.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAccountsPayable = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Accounts Payable</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            New Bill
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Payable</p>
              <p className="text-2xl font-bold text-red-600">৳2,45,000</p>
            </div>
            <CreditCard className="text-red-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-bold text-orange-600">৳45,000</p>
            </div>
            <TrendingDown className="text-orange-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-blue-600">৳1,20,000</p>
            </div>
            <DollarSign className="text-blue-500" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Vendor</th>
                <th className="p-3 font-semibold text-sm">Invoice #</th>
                <th className="p-3 font-semibold text-sm">Date</th>
                <th className="p-3 font-semibold text-sm">Due Date</th>
                <th className="p-3 font-semibold text-sm">Amount</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { vendor: 'ABC Trims', invoice: 'INV-2025-001', date: '2025-01-10', due: '2025-02-10', amount: 75000, status: 'Pending' },
                { vendor: 'XYZ Fabrics', invoice: 'INV-2025-002', date: '2025-01-08', due: '2025-01-20', amount: 45000, status: 'Overdue' },
                { vendor: 'Cotton Mills Ltd', invoice: 'INV-2025-003', date: '2025-01-15', due: '2025-02-15', amount: 125000, status: 'Pending' }
              ].map((bill, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{bill.vendor}</td>
                  <td className="p-3 text-sm text-blue-600">{bill.invoice}</td>
                  <td className="p-3 text-sm">{bill.date}</td>
                  <td className="p-3 text-sm">{bill.due}</td>
                  <td className="p-3 text-sm font-semibold">৳{bill.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bill.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <Button size="sm" variant="success">Pay</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAccountsReceivable = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Accounts Receivable</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Receivable</p>
              <p className="text-2xl font-bold text-green-600">৳8,75,000</p>
            </div>
            <Receipt className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-bold text-red-600">৳1,25,000</p>
            </div>
            <TrendingDown className="text-red-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Collected This Month</p>
              <p className="text-2xl font-bold text-blue-600">৳4,50,000</p>
            </div>
            <TrendingUp className="text-blue-500" size={32} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Customer</th>
                <th className="p-3 font-semibold text-sm">Invoice #</th>
                <th className="p-3 font-semibold text-sm">Order #</th>
                <th className="p-3 font-semibold text-sm">Date</th>
                <th className="p-3 font-semibold text-sm">Due Date</th>
                <th className="p-3 font-semibold text-sm">Amount</th>
                <th className="p-3 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { customer: 'H&M', invoice: 'INV-OUT-001', order: '#ORD-001', date: '2025-01-10', due: '2025-02-10', amount: 425000, status: 'Pending' },
                { customer: 'Zara', invoice: 'INV-OUT-002', order: '#ORD-002', date: '2025-01-05', due: '2025-01-25', amount: 125000, status: 'Overdue' },
                { customer: 'H&M', invoice: 'INV-OUT-003', order: '#ORD-003', date: '2025-01-15', due: '2025-02-15', amount: 325000, status: 'Paid' }
              ].map((invoice, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{invoice.customer}</td>
                  <td className="p-3 text-sm text-blue-600">{invoice.invoice}</td>
                  <td className="p-3 text-sm text-purple-600">{invoice.order}</td>
                  <td className="p-3 text-sm">{invoice.date}</td>
                  <td className="p-3 text-sm">{invoice.due}</td>
                  <td className="p-3 text-sm font-semibold">৳{invoice.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrderCosting = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">অর্ডার কস্টিং</h3>
        <Button size="sm">
          <Calculator size={16} className="mr-2" />
          নতুন কস্টিং
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">অর্ডার কস্ট সামারি</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">অর্ডার নং</th>
                <th className="p-3 font-semibold text-sm">বায়ার</th>
                <th className="p-3 font-semibold text-sm">স্টাইল</th>
                <th className="p-3 font-semibold text-sm">পরিমাণ</th>
                <th className="p-3 font-semibold text-sm">ইউনিট কস্ট</th>
                <th className="p-3 font-semibold text-sm">মোট কস্ট</th>
                <th className="p-3 font-semibold text-sm">বিক্রয় মূল্য</th>
                <th className="p-3 font-semibold text-sm">লাভ</th>
              </tr>
            </thead>
            <tbody>
              {[
                { order: '#ORD-001', buyer: 'H&M', style: "Men's Polo", qty: 5000, unitCost: 6.50, totalCost: 32500, salePrice: 8.50, profit: 10000 },
                { order: '#ORD-002', buyer: 'Zara', style: "Women's Tee", qty: 12000, unitCost: 4.25, totalCost: 51000, salePrice: 5.75, profit: 18000 }
              ].map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm text-blue-600 font-medium">{item.order}</td>
                  <td className="p-3 text-sm">{item.buyer}</td>
                  <td className="p-3 text-sm">{item.style}</td>
                  <td className="p-3 text-sm">{item.qty.toLocaleString()}</td>
                  <td className="p-3 text-sm">৳{item.unitCost.toFixed(2)}</td>
                  <td className="p-3 text-sm font-semibold">৳{item.totalCost.toLocaleString()}</td>
                  <td className="p-3 text-sm font-semibold text-green-600">৳{item.salePrice.toFixed(2)}</td>
                  <td className="p-3 text-sm font-semibold text-green-600">৳{item.profit.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCashBank = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ক্যাশ ও ব্যাংক</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন লেনদেন
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">ক্যাশ ব্যালেন্স</h4>
          <p className="text-3xl font-bold text-green-600">৳1,25,000</p>
          <p className="text-sm text-gray-500 mt-2">হাতে নগদ</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">ব্যাংক ব্যালেন্স</h4>
          <p className="text-3xl font-bold text-blue-600">৳8,75,000</p>
          <p className="text-sm text-gray-500 mt-2">সিটি ব্যাংক - চেকিং</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">সাম্প্রতিক লেনদেন</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">তারিখ</th>
                <th className="p-3 font-semibold text-sm">বিবরণ</th>
                <th className="p-3 font-semibold text-sm">ধরন</th>
                <th className="p-3 font-semibold text-sm">পরিমাণ</th>
                <th className="p-3 font-semibold text-sm">ব্যালেন্স</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2025-01-15', desc: 'অর্ডার পেমেন্ট', type: 'জমা', amount: 50000, balance: 875000 },
                { date: '2025-01-14', desc: 'কাপড় ক্রয়', type: 'উত্তোলন', amount: 25000, balance: 825000 },
                { date: '2025-01-13', desc: 'বেতন প্রদান', type: 'উত্তোলন', amount: 35000, balance: 850000 }
              ].map((txn, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm">{txn.date}</td>
                  <td className="p-3 text-sm">{txn.desc}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      txn.type === 'জমা' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className={`p-3 text-sm font-semibold ${
                    txn.type === 'জমা' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ৳{txn.amount.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm font-semibold">৳{txn.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFixedAssets = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Fixed Assets</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          Add Asset
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">Asset Name</th>
                <th className="p-3 font-semibold text-sm">Category</th>
                <th className="p-3 font-semibold text-sm">Purchase Date</th>
                <th className="p-3 font-semibold text-sm">Cost</th>
                <th className="p-3 font-semibold text-sm">Depreciation</th>
                <th className="p-3 font-semibold text-sm">Book Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Sewing Machine - Brother', category: 'Equipment', date: '2024-01-15', cost: 45000, depreciation: 4500, bookValue: 40500 },
                { name: 'Cutting Table', category: 'Furniture', date: '2024-03-10', cost: 15000, depreciation: 1000, bookValue: 14000 },
                { name: 'Industrial Iron', category: 'Equipment', date: '2024-06-20', cost: 8000, depreciation: 400, bookValue: 7600 }
              ].map((asset, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{asset.name}</td>
                  <td className="p-3 text-sm">{asset.category}</td>
                  <td className="p-3 text-sm">{asset.date}</td>
                  <td className="p-3 text-sm">৳{asset.cost.toLocaleString()}</td>
                  <td className="p-3 text-sm text-red-600">৳{asset.depreciation.toLocaleString()}</td>
                  <td className="p-3 text-sm font-semibold">৳{asset.bookValue.toLocaleString()}</td>
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
        <h3 className="text-xl font-semibold">পেরোল</h3>
        <Button size="sm">
          <Plus size={16} className="mr-2" />
          নতুন পেরোল
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4">মাসিক বেতন সামারি</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm">কর্মচারী আইডি</th>
                <th className="p-3 font-semibold text-sm">নাম</th>
                <th className="p-3 font-semibold text-sm">পদবী</th>
                <th className="p-3 font-semibold text-sm">মূল বেতন</th>
                <th className="p-3 font-semibold text-sm">ভাতা</th>
                <th className="p-3 font-semibold text-sm">কর্তন</th>
                <th className="p-3 font-semibold text-sm">নেট বেতন</th>
                <th className="p-3 font-semibold text-sm">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'EMP-0101', name: 'আবুল কালাম', position: 'মেশিন অপারেটর', basic: 8000, allowance: 5500, deduction: 500, net: 13000, status: 'পেইড' },
                { id: 'EMP-0256', name: 'ফাতিমা বেগম', position: 'কোয়ালিটি ইন্সপেক্টর', basic: 12000, allowance: 7500, deduction: 500, net: 19000, status: 'পেন্ডিং' }
              ].map((emp, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm">{emp.id}</td>
                  <td className="p-3 text-sm font-medium">{emp.name}</td>
                  <td className="p-3 text-sm">{emp.position}</td>
                  <td className="p-3 text-sm">৳{emp.basic.toLocaleString()}</td>
                  <td className="p-3 text-sm">৳{emp.allowance.toLocaleString()}</td>
                  <td className="p-3 text-sm text-red-600">৳{emp.deduction.toLocaleString()}</td>
                  <td className="p-3 text-sm font-semibold">৳{emp.net.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      emp.status === 'পেইড' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReporting = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">আর্থিক রিপোর্টিং</h3>
        <Button size="sm">
          <Download size={16} className="mr-2" />
          রিপোর্ট ডাউনলোড
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">মাসিক আয়-ব্যয়</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>মোট আয়:</span>
              <span className="font-semibold text-green-600">৳8,75,000</span>
            </div>
            <div className="flex justify-between">
              <span>মোট ব্যয়:</span>
              <span className="font-semibold text-red-600">৳6,25,000</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="font-semibold">নেট লাভ:</span>
              <span className="font-semibold text-blue-600">৳2,50,000</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg mb-4">ক্যাশ ফ্লো</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>অপারেটিং ক্যাশ ফ্লো:</span>
              <span className="font-semibold text-green-600">৳3,25,000</span>
            </div>
            <div className="flex justify-between">
              <span>ইনভেস্টিং ক্যাশ ফ্লো:</span>
              <span className="font-semibold text-red-600">৳-75,000</span>
            </div>
            <div className="flex justify-between">
              <span>ফাইন্যান্সিং ক্যাশ ফ্লো:</span>
              <span className="font-semibold text-blue-600">৳50,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'general-ledger':
        return renderGeneralLedger();
      case 'accounts-payable':
        return renderAccountsPayable();
      case 'accounts-receivable':
        return renderAccountsReceivable();
      case 'order-costing':
        return renderOrderCosting();
      case 'cash-bank':
        return renderCashBank();
      case 'fixed-assets':
        return renderFixedAssets();
      case 'payroll':
        return renderPayroll();
      case 'reporting':
        return renderReporting();
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

export default Finance;