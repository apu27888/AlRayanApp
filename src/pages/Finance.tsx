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
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import Button from '../components/UI/Button';
import { useBranchFilter } from '../hooks/useBranchFilter';
import { useBranch } from '../contexts/BranchContext';
import { 
  financialTransactions, 
  payableBills, 
  receivableInvoices, 
  orderCostingSummaries, 
  cashBankTransactions, 
  fixedAssets, 
  payrollEntriesFinance 
} from '../data/mockData';
import { Dialog } from '@headlessui/react';

const Finance: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'summary');
  const { currentBranch } = useBranch();

  // Filter data by current branch
  const filteredTransactions = useBranchFilter(financialTransactions);
  const filteredPayableBills = useBranchFilter(payableBills);
  const filteredReceivableInvoices = useBranchFilter(receivableInvoices);
  const filteredOrderCostingSummaries = useBranchFilter(orderCostingSummaries);
  const filteredCashBankTransactions = useBranchFilter(cashBankTransactions);
  const filteredFixedAssets = useBranchFilter(fixedAssets);
  const filteredPayrollEntries = useBranchFilter(payrollEntriesFinance);

  const [showLedgerModal, setShowLedgerModal] = useState(false);
  const [ledgerForm, setLedgerForm] = useState({
    date: '',
    account: '',
    description: '',
    reference: '',
    debit: '',
    credit: '',
    balance: ''
  });
  const [customLedger, setCustomLedger] = useState<any[]>([]);

  // --- Accounts Payable Bill Modal State ---
  const [showBillModal, setShowBillModal] = useState(false);
  const [billForm, setBillForm] = useState({
    vendor: '',
    invoice: '',
    date: '',
    dueDate: '',
    amount: '',
    status: 'Pending',
    category: 'Regular Cost'
  });
  const [customBills, setCustomBills] = useState<any[]>([]);

  // --- Accounts Receivable Invoice Modal State ---
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    customer: '',
    invoice: '',
    order: '',
    date: '',
    dueDate: '',
    amount: '',
    status: 'Pending',
    category: 'Regular'
  });
  const [customInvoices, setCustomInvoices] = useState<any[]>([]);

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

  const handleLedgerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLedgerForm({ ...ledgerForm, [e.target.name]: e.target.value });
  };
  const handleLedgerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomLedger([
      {
        ...ledgerForm,
        debit: Number(ledgerForm.debit) || 0,
        credit: Number(ledgerForm.credit) || 0,
        balance: Number(ledgerForm.balance) || 0
      },
      ...customLedger
    ]);
    setLedgerForm({ date: '', account: '', description: '', reference: '', debit: '', credit: '', balance: '' });
    setShowLedgerModal(false);
  };

  const handleBillInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBillForm({ ...billForm, [e.target.name]: e.target.value });
  };
  const handleBillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomBills([
      {
        ...billForm,
        amount: Number(billForm.amount) || 0
      },
      ...customBills
    ]);
    setBillForm({ vendor: '', invoice: '', date: '', dueDate: '', amount: '', status: 'Pending', category: 'Regular Cost' });
    setShowBillModal(false);
  };

  const handleInvoiceInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInvoiceForm({ ...invoiceForm, [e.target.name]: e.target.value });
  };
  const handleInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomInvoices([
      {
        ...invoiceForm,
        amount: Number(invoiceForm.amount) || 0
      },
      ...customInvoices
    ]);
    setInvoiceForm({ customer: '', invoice: '', order: '', date: '', dueDate: '', amount: '', status: 'Pending', category: 'Regular' });
    setShowInvoiceModal(false);
  };

  const tabs = [
    { id: 'summary', label: 'Summary', icon: PieChart },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'general-ledger', label: 'General Ledger', icon: FileText },
    { id: 'accounts-payable', label: 'Account Payable (Cost)', icon: CreditCard },
    { id: 'accounts-receivable', label: 'Accounts Receivable', icon: Receipt },
    { id: 'order-costing', label: 'অর্ডার কস্টিং', icon: Calculator },
    { id: 'cash-bank', label: 'ক্যাশ ও ব্যাংক', icon: Banknote },
    { id: 'fixed-assets', label: 'Fixed Assets', icon: Building },
    { id: 'payroll', label: 'পেরোল', icon: UserCheck },
    { id: 'reporting', label: 'রিপোর্টিং', icon: PieChart }
  ];

  // --- Finance Summary Tab Content (All Branches, Not Filtered) ---
  const renderFinanceSummary = () => {
    // Aggregate all-branch finance metrics
    const totalIncome = financialTransactions.reduce((sum, t) => sum + (t.debit || 0), 0);
    const totalExpense = financialTransactions.reduce((sum, t) => sum + (t.credit || 0), 0);
    const netProfit = totalIncome - totalExpense;
    const totalPayable = payableBills.reduce((sum, b) => sum + b.amount, 0);
    const totalReceivable = receivableInvoices.reduce((sum, i) => sum + i.amount, 0);
    const totalAssets = fixedAssets.reduce((sum, a) => sum + a.bookValue, 0);
    const totalPayroll = payrollEntriesFinance.reduce((sum, p) => sum + p.net, 0);
    const cashBalance = cashBankTransactions.reduce((sum, t) => sum + (t.type === 'জমা' ? t.amount : -t.amount), 0);
    return (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold mb-4 flex items-center"><PieChart className="mr-2" />Finance Summary (All Branches)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">Total Income</p>
            <p className="text-2xl font-bold text-green-600">৳{totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">Total Expense</p>
            <p className="text-2xl font-bold text-red-600">৳{totalExpense.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">Net Profit</p>
            <p className="text-2xl font-bold text-blue-600">৳{netProfit.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">Cash/Bank Balance</p>
            <p className="text-2xl font-bold text-purple-600">৳{cashBalance.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">Total Payable</p>
            <p className="text-2xl font-bold text-red-600">৳{totalPayable.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">Total Receivable</p>
            <p className="text-2xl font-bold text-green-600">৳{totalReceivable.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">Total Assets</p>
            <p className="text-2xl font-bold text-blue-600">৳{totalAssets.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">Total Payroll</p>
            <p className="text-2xl font-bold text-orange-600">৳{totalPayroll.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-8">
          <h4 className="font-semibold text-lg mb-4 flex items-center"><BarChart3 className="mr-2" />Income vs Expense (Bar)</h4>
          <div className="w-full h-4 bg-gray-200 rounded-full relative">
            <div className="h-4 bg-green-500 rounded-full absolute left-0 top-0" style={{ width: `${(totalIncome/(totalIncome+totalExpense))*100}%` }} />
            <div className="h-4 bg-red-500 rounded-full absolute left-0 top-0" style={{ width: `${(totalExpense/(totalIncome+totalExpense))*100}%`, opacity: 0.7 }} />
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-green-600">Income</span>
            <span className="text-red-600">Expense</span>
          </div>
        </div>
      </div>
    );
  };

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
            {filteredPayableBills.slice(0, 4).map((item, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                item.status === 'Overdue' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{item.vendor}</p>
                    <p className="text-xs text-gray-600">Due: {item.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">৳{item.amount.toLocaleString()}</p>
                    <div className="flex items-center space-x-1">
                      {item.status === 'Overdue' && <AlertTriangle size={12} className="text-red-500" />}
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
            {filteredPayableBills.length === 0 && (
              <p className="text-gray-500 text-center py-4">No payable bills found for the selected branch.</p>
            )}
          </div>
          {filteredPayableBills.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>মোট প্রাপ্য:</span>
                <span className="font-semibold text-red-600">
                  ৳{filteredPayableBills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>অতিরিক্ত বকেয়া:</span>
                <span className="font-semibold text-red-700">
                  ৳{filteredPayableBills.filter(bill => bill.status === 'Overdue').reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          )}
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
            {filteredReceivableInvoices.slice(0, 4).map((item, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                item.status === 'Overdue' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{item.customer}</p>
                    <p className="text-xs text-gray-600">{item.order} • Due: {item.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">৳{item.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                      item.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {filteredReceivableInvoices.length === 0 && (
              <p className="text-gray-500 text-center py-4">No receivable invoices found for the selected branch.</p>
            )}
          </div>
          {filteredReceivableInvoices.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>মোট পাওনা:</span>
                <span className="font-semibold text-green-600">
                  ৳{filteredReceivableInvoices.reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>অতিরিক্ত বকেয়া:</span>
                <span className="font-semibold text-red-600">
                  ৳{filteredReceivableInvoices.filter(invoice => invoice.status === 'Overdue').reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          )}
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
          <Button size="sm" onClick={() => setShowLedgerModal(true)}>
            <Plus size={16} className="mr-2" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Ledger Entry Modal */}
      <Dialog open={showLedgerModal} onClose={() => setShowLedgerModal(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          {/* Backdrop for modal */}
          <div className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md z-10">
            <Dialog.Title className="text-lg font-bold mb-4">Add Ledger Entry</Dialog.Title>
            <form onSubmit={handleLedgerSubmit} className="space-y-4">
              <input name="date" type="date" value={ledgerForm.date} onChange={handleLedgerInput} className="w-full border rounded px-3 py-2" required />
              <input name="account" placeholder="Account" value={ledgerForm.account} onChange={handleLedgerInput} className="w-full border rounded px-3 py-2" required />
              <input name="description" placeholder="Description" value={ledgerForm.description} onChange={handleLedgerInput} className="w-full border rounded px-3 py-2" required />
              <input name="reference" placeholder="Reference" value={ledgerForm.reference} onChange={handleLedgerInput} className="w-full border rounded px-3 py-2" />
              <div className="flex gap-2">
                <input name="debit" type="number" placeholder="Debit" value={ledgerForm.debit} onChange={handleLedgerInput} className="w-1/2 border rounded px-3 py-2" />
                <input name="credit" type="number" placeholder="Credit" value={ledgerForm.credit} onChange={handleLedgerInput} className="w-1/2 border rounded px-3 py-2" />
              </div>
              <input name="balance" type="number" placeholder="Balance" value={ledgerForm.balance} onChange={handleLedgerInput} className="w-full border rounded px-3 py-2" />
              <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={() => setShowLedgerModal(false)}>Cancel</Button>
                <Button type="submit" variant="success">Add Entry</Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

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
              {customLedger.concat(filteredTransactions).length > 0 ? (
                customLedger.concat(filteredTransactions).map((entry, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm">{entry.date}</td>
                    <td className="p-3 text-sm font-medium">{entry.account}</td>
                    <td className="p-3 text-sm">{entry.description}</td>
                    <td className="p-3 text-sm text-blue-600">{entry.reference}</td>
                    <td className="p-3 text-sm font-semibold text-green-600">
                      {entry.debit > 0 ? `৳${entry.debit.toLocaleString()}` : '-'}
                    </td>
                    <td className="p-3 text-sm font-semibold text-red-600">
                      {entry.credit > 0 ? `৳${entry.credit.toLocaleString()}` : '-'}
                    </td>
                    <td className="p-3 text-sm font-semibold">৳{entry.balance.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No transactions found for the selected branch.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAccountsPayable = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Account Payable (Cost)</h3>
        <div className="flex space-x-3">
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setShowBillModal(true)}>
            <Plus size={16} className="mr-2" />
            New Bill
          </Button>
        </div>
      </div>

      {/* Bill Entry Modal */}
      <Dialog open={showBillModal} onClose={() => setShowBillModal(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md z-10">
            <Dialog.Title className="text-lg font-bold mb-4">Add Payable Bill</Dialog.Title>
            <form onSubmit={handleBillSubmit} className="space-y-4">
              <input name="vendor" placeholder="Vendor" value={billForm.vendor} onChange={handleBillInput} className="w-full border rounded px-3 py-2" required />
              <input name="invoice" placeholder="Invoice #" value={billForm.invoice} onChange={handleBillInput} className="w-full border rounded px-3 py-2" required />
              <input name="date" type="date" value={billForm.date} onChange={handleBillInput} className="w-full border rounded px-3 py-2" required />
              <input name="dueDate" type="date" value={billForm.dueDate} onChange={handleBillInput} className="w-full border rounded px-3 py-2" required />
              <input name="amount" type="number" placeholder="Amount" value={billForm.amount} onChange={handleBillInput} className="w-full border rounded px-3 py-2" required />
              <select name="category" value={billForm.category} onChange={handleBillInput} className="w-full border rounded px-3 py-2">
                <option value="Regular Cost">Regular Cost</option>
                <option value="Development Cost">Development Cost</option>
              </select>
              <select name="status" value={billForm.status} onChange={handleBillInput} className="w-full border rounded px-3 py-2">
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={() => setShowBillModal(false)}>Cancel</Button>
                <Button type="submit" variant="success">Add Bill</Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Payable</p>
              <p className="text-2xl font-bold text-red-600">
                ৳{filteredPayableBills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}
              </p>
            </div>
            <CreditCard className="text-red-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                ৳{filteredPayableBills.filter(bill => bill.status === 'Overdue').reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}
              </p>
            </div>
            <TrendingDown className="text-red-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Paid This Month</p>
              <p className="text-2xl font-bold text-blue-600">
                ৳{filteredPayableBills.filter(bill => bill.status === 'Paid' && new Date(bill.date).getMonth() === new Date().getMonth()).reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}
              </p>
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
                <th className="p-3 font-semibold text-sm">Vendor</th>
                <th className="p-3 font-semibold text-sm">Invoice #</th>
                <th className="p-3 font-semibold text-sm">Date</th>
                <th className="p-3 font-semibold text-sm">Due Date</th>
                <th className="p-3 font-semibold text-sm">Amount</th>
                <th className="p-3 font-semibold text-sm">Category</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customBills.concat(filteredPayableBills).length > 0 ? (
                customBills.concat(filteredPayableBills).map((bill, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm font-medium">{bill.vendor}</td>
                    <td className="p-3 text-sm text-blue-600">{bill.invoice}</td>
                    <td className="p-3 text-sm">{bill.date}</td>
                    <td className="p-3 text-sm">{bill.dueDate}</td>
                    <td className="p-3 text-sm font-semibold">৳{bill.amount?.toLocaleString?.() ?? bill.amount}</td>
                    <td className="p-3 text-sm">{bill.category || 'Regular Cost'}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No payable bills found for the selected branch.
                  </td>
                </tr>
              )}
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
          <Button size="sm" onClick={() => setShowInvoiceModal(true)}>
            <Plus size={16} className="mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Invoice Entry Modal */}
      <Dialog open={showInvoiceModal} onClose={() => setShowInvoiceModal(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md z-10">
            <Dialog.Title className="text-lg font-bold mb-4">Add Receivable Invoice</Dialog.Title>
            <form onSubmit={handleInvoiceSubmit} className="space-y-4">
              <input name="customer" placeholder="Customer" value={invoiceForm.customer} onChange={handleInvoiceInput} className="w-full border rounded px-3 py-2" required />
              <input name="invoice" placeholder="Invoice #" value={invoiceForm.invoice} onChange={handleInvoiceInput} className="w-full border rounded px-3 py-2" required />
              <input name="order" placeholder="Order #" value={invoiceForm.order} onChange={handleInvoiceInput} className="w-full border rounded px-3 py-2" />
              <input name="date" type="date" value={invoiceForm.date} onChange={handleInvoiceInput} className="w-full border rounded px-3 py-2" required />
              <input name="dueDate" type="date" value={invoiceForm.dueDate} onChange={handleInvoiceInput} className="w-full border rounded px-3 py-2" required />
              <input name="amount" type="number" placeholder="Amount" value={invoiceForm.amount} onChange={handleInvoiceInput} className="w-full border rounded px-3 py-2" required />
              <select name="category" value={invoiceForm.category} onChange={handleInvoiceInput} className="w-full border rounded px-3 py-2">
                <option value="Regular">Regular</option>
                <option value="Extra">Extra</option>
                <option value="Asset">Asset</option>
              </select>
              <select name="status" value={invoiceForm.status} onChange={handleInvoiceInput} className="w-full border rounded px-3 py-2">
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={() => setShowInvoiceModal(false)}>Cancel</Button>
                <Button type="submit" variant="success">Add Invoice</Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Receivable</p>
              <p className="text-2xl font-bold text-green-600">
                ৳{filteredReceivableInvoices.reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}
              </p>
            </div>
            <Receipt className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                ৳{filteredReceivableInvoices.filter(invoice => invoice.status === 'Overdue').reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}
              </p>
            </div>
            <TrendingDown className="text-red-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Collected This Month</p>
              <p className="text-2xl font-bold text-blue-600">
                ৳{filteredReceivableInvoices.filter(invoice => invoice.status === 'Paid' && new Date(invoice.date).getMonth() === new Date().getMonth()).reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}
              </p>
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
                <th className="p-3 font-semibold text-sm">Category</th>
                <th className="p-3 font-semibold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {customInvoices.concat(filteredReceivableInvoices).length > 0 ? (
                customInvoices.concat(filteredReceivableInvoices).map((invoice, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm font-medium">{invoice.customer}</td>
                    <td className="p-3 text-sm text-blue-600">{invoice.invoice}</td>
                    <td className="p-3 text-sm text-purple-600">{invoice.order}</td>
                    <td className="p-3 text-sm">{invoice.date}</td>
                    <td className="p-3 text-sm">{invoice.dueDate}</td>
                    <td className="p-3 text-sm font-semibold">৳{invoice.amount?.toLocaleString?.() ?? invoice.amount}</td>
                    <td className="p-3 text-sm">{invoice.category || 'Regular'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No receivable invoices found for the selected branch.
                  </td>
                </tr>
              )}
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
              {filteredOrderCostingSummaries.length > 0 ? (
                filteredOrderCostingSummaries.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm text-blue-600 font-medium">{item.orderId}</td>
                    <td className="p-3 text-sm">{item.buyer}</td>
                    <td className="p-3 text-sm">{item.style}</td>
                    <td className="p-3 text-sm">{item.quantity.toLocaleString()}</td>
                    <td className="p-3 text-sm">৳{item.unitCost.toFixed(2)}</td>
                    <td className="p-3 text-sm font-semibold">৳{item.totalCost.toLocaleString()}</td>
                    <td className="p-3 text-sm font-semibold text-green-600">৳{item.salePrice.toFixed(2)}</td>
                    <td className="p-3 text-sm font-semibold text-green-600">৳{item.profit.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No order costing data found for the selected branch.
                  </td>
                </tr>
              )}
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
              {filteredCashBankTransactions.length > 0 ? (
                filteredCashBankTransactions.map((txn, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm">{txn.date}</td>
                    <td className="p-3 text-sm">{txn.description}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No cash/bank transactions found for the selected branch.
                  </td>
                </tr>
              )}
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
              {filteredFixedAssets.length > 0 ? (
                filteredFixedAssets.map((asset, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm font-medium">{asset.name}</td>
                    <td className="p-3 text-sm">{asset.category}</td>
                    <td className="p-3 text-sm">{asset.purchaseDate}</td>
                    <td className="p-3 text-sm">৳{asset.cost.toLocaleString()}</td>
                    <td className="p-3 text-sm text-red-600">৳{asset.depreciation.toLocaleString()}</td>
                    <td className="p-3 text-sm font-semibold">৳{asset.bookValue.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No fixed assets found for the selected branch.
                  </td>
                </tr>
              )}
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
              {filteredPayrollEntries.length > 0 ? (
                filteredPayrollEntries.map((emp, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm">{emp.employeeId}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No payroll entries found for the selected branch.
                  </td>
                </tr>
              )}
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
              <span className="font-semibold text-green-600">
                ৳{filteredReceivableInvoices.reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>মোট ব্যয়:</span>
              <span className="font-semibold text-red-600">
                ৳{filteredPayableBills.reduce((sum, bill) => sum + bill.amount, 0).toLocaleString()}
              </span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="font-semibold">নেট লাভ:</span>
              <span className="font-semibold text-blue-600">
                ৳{(filteredReceivableInvoices.reduce((sum, invoice) => sum + invoice.amount, 0) - filteredPayableBills.reduce((sum, bill) => sum + bill.amount, 0)).toLocaleString()}
              </span>
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

      {/* Branch-specific message */}
      {currentBranch && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> Financial data shown for {currentBranch.name} ({currentBranch.code}) only. 
            Switch to "All Branches" view to see consolidated financial reports.
          </p>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'summary':
        return renderFinanceSummary();
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