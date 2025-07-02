import React, { useState } from 'react';
import { Users, Warehouse, DollarSign, Activity, PieChart, Package, ClipboardList, CreditCard, Banknote, UserCheck, Building } from 'lucide-react';
import { employees, branches } from '../data/mockData';

// You can import more mock data as needed for other modules

// Instead of static branchList, use real branch names and ids
const branchList = branches.map(b => ({ code: b.id, name: b.name }));

// Mock branch-wise data for demo
const branchSummaryData = [
  {
    metric: 'Employees',
    icon: Users,
    color: '#3b82f6',
    data: [120, 80, 45]
  },
  {
    metric: 'Stock Items',
    icon: Warehouse,
    color: '#a21caf',
    data: [150, 100, 70]
  },
  {
    metric: 'Finance',
    icon: DollarSign,
    color: '#16a34a',
    data: [7000000, 4000000, 1500000]
  },
  {
    metric: 'Production',
    icon: Activity,
    color: '#f59e42',
    data: [60, 40, 20]
  },
  {
    metric: 'Order Summary',
    icon: Package,
    color: '#6366f1',
    data: [50, 40, 30]
  },
  {
    metric: 'Requisition',
    icon: ClipboardList,
    color: '#db2777',
    data: [12, 10, 10]
  },
  {
    metric: 'Receivable Balance',
    icon: CreditCard,
    color: '#15803d',
    data: [1200000, 800000, 500000]
  },
  {
    metric: 'Payable Balance',
    icon: Banknote,
    color: '#dc2626',
    data: [900000, 600000, 300000]
  },
  {
    metric: 'Salary',
    icon: UserCheck,
    color: '#0891b2',
    data: [600000, 400000, 250000]
  },
  {
    metric: 'Performance',
    icon: Activity,
    color: '#eab308',
    data: [90, 85, 80]
  },
  {
    metric: 'Loss-Profit',
    icon: DollarSign,
    color: '#e11d48',
    data: [1200000, 900000, 600000]
  },
  {
    metric: 'Income',
    icon: DollarSign,
    color: '#84cc16',
    data: [5000000, 4000000, 3500000]
  },
  {
    metric: 'Cost',
    icon: Banknote,
    color: '#a21caf',
    data: [3000000, 2500000, 2000000]
  },
  {
    metric: 'Fixed Assets',
    icon: Building,
    color: '#60a5fa',
    data: [2000000, 1500000, 700000]
  },
  {
    metric: 'Asset Loss',
    icon: Banknote,
    color: '#f87171',
    data: [50000, 60000, 40000]
  },
  {
    metric: 'Extra Income',
    icon: DollarSign,
    color: '#34d399',
    data: [120000, 100000, 100000]
  },
  {
    metric: 'This Year Asset Inclution',
    icon: Building,
    color: '#0ea5e9',
    data: [300000, 200000, 100000]
  }
];

const Summary: React.FC = () => {
  // HRM summary
  const totalEmployees = employees.length;
  const present = Math.floor(totalEmployees * 0.91);
  const onLeave = 12;

  // Stock summary (demo values)
  const totalStockItems = 320; // Replace with real data if available
  const lowStock = 18;

  // Finance summary (demo values)
  const totalRevenue = 12500000;
  const totalExpenses = 9800000;

  // Production summary (demo values)
  const totalOrders = 120;
  const completedOrders = 95;

  const [activeTab, setActiveTab] = useState<'summary' | 'branch'>('summary');

  // Pie chart helper
  const renderPieChart = (values: number[], colors: string[]) => {
    const total = values.reduce((a, b) => a + b, 0);
    let prev = 0;
    return (
      <svg width={64} height={64} viewBox="0 0 36 36" className="-rotate-90">
        {values.map((val, i) => {
          const percent = total === 0 ? 0 : (val / total) * 100;
          const dash = `${percent} ${100 - percent}`;
          const el = (
            <circle
              key={i}
              cx="18" cy="18" r="16"
              fill="transparent"
              stroke={colors[i]}
              strokeWidth="6"
              strokeDasharray={dash}
              strokeDashoffset={-prev}
            />
          );
          prev -= percent;
          return el;
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold flex items-center gap-2"><PieChart size={28}/> Universal Summary</h2>
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b mb-6">
        <button
          className={`py-2 px-4 font-semibold border-b-2 ${activeTab === 'summary' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
          onClick={() => setActiveTab('summary')}
        >Summary</button>
        <button
          className={`py-2 px-4 font-semibold border-b-2 ${activeTab === 'branch' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
          onClick={() => setActiveTab('branch')}
        >Branch Wise</button>
      </div>
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* HRM */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Users className="text-blue-500 mb-2" size={32} />
            <div className="text-lg font-semibold">Employees</div>
            <div className="text-2xl font-bold text-blue-600">{employees.length}</div>
            <div className="text-sm text-green-600 mt-1">Present: {Math.floor(employees.length * 0.91)} | On Leave: 12</div>
          </div>
          {/* Stock */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Warehouse className="text-purple-500 mb-2" size={32} />
            <div className="text-lg font-semibold">Stock Items</div>
            <div className="text-2xl font-bold text-purple-600">{totalStockItems}</div>
            <div className="text-sm text-red-600 mt-1">Low Stock: {lowStock}</div>
          </div>
          {/* Finance */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <DollarSign className="text-green-500 mb-2" size={32} />
            <div className="text-lg font-semibold">Finance</div>
            <div className="text-2xl font-bold text-green-600">৳{totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">Expenses: ৳{totalExpenses.toLocaleString()}</div>
          </div>
          {/* Production */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Activity className="text-orange-500 mb-2" size={32} />
            <div className="text-lg font-semibold">Production</div>
            <div className="text-2xl font-bold text-orange-600">{totalOrders}</div>
            <div className="text-sm text-green-600 mt-1">Completed: {completedOrders}</div>
          </div>
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Package className="text-indigo-500 mb-2" size={32} />
            <div className="text-lg font-semibold">Order Summary</div>
            <div className="text-2xl font-bold text-indigo-600">{totalOrders}</div>
            <div className="text-sm text-green-600 mt-1">Completed: {completedOrders}</div>
          </div>
          {/* Requisition Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <ClipboardList className="text-pink-500 mb-2" size={32} />
            <div className="text-lg font-semibold">Requisition</div>
            <div className="text-2xl font-bold text-pink-600">32</div>
            <div className="text-sm text-gray-600 mt-1">Pending: 5</div>
          </div>
          {/* Receivable Balance Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <CreditCard className="text-green-700 mb-2" size={32} />
            <div className="text-lg font-semibold">Receivable Balance</div>
            <div className="text-2xl font-bold text-green-700">৳2,500,000</div>
            <div className="text-sm text-gray-600 mt-1">Overdue: ৳300,000</div>
          </div>
          {/* Payable Balance Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Banknote className="text-red-700 mb-2" size={32} />
            <div className="text-lg font-semibold">Payable Balance</div>
            <div className="text-2xl font-bold text-red-700">৳1,800,000</div>
            <div className="text-sm text-gray-600 mt-1">Due Soon: ৳200,000</div>
          </div>
          {/* Salary Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <UserCheck className="text-cyan-600 mb-2" size={32} />
            <div className="text-lg font-semibold">Salary</div>
            <div className="text-2xl font-bold text-cyan-600">৳1,250,000</div>
            <div className="text-sm text-gray-600 mt-1">This Month</div>
          </div>
          {/* Performance Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Activity className="text-yellow-500 mb-2" size={32} />
            <div className="text-lg font-semibold">Performance</div>
            <div className="text-2xl font-bold text-yellow-600">87%</div>
            <div className="text-sm text-gray-600 mt-1">Target Met: 92%</div>
          </div>
          {/* Loss-Profit Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <DollarSign className="text-rose-500 mb-2" size={32} />
            <div className="text-lg font-semibold">Loss-Profit</div>
            <div className="text-2xl font-bold text-rose-600">৳2,700,000</div>
            <div className="text-sm text-green-600 mt-1">Profit</div>
          </div>
          {/* Income Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <DollarSign className="text-lime-500 mb-2" size={32} />
            <div className="text-lg font-semibold">Income</div>
            <div className="text-2xl font-bold text-lime-600">৳13,500,000</div>
            <div className="text-sm text-gray-600 mt-1">This Month</div>
          </div>
          {/* Cost Summary - Regular Cost */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Banknote className="text-fuchsia-500 mb-2" size={32} />
            <div className="text-lg font-semibold">Regular Cost</div>
            <div className="text-2xl font-bold text-fuchsia-600">৳7,800,000</div>
            <div className="text-sm text-gray-600 mt-1">This Month</div>
          </div>
          {/* Cost Summary - Development Cost */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Banknote className="text-violet-500 mb-2" size={32} />
            <div className="text-lg font-semibold">Development Cost</div>
            <div className="text-2xl font-bold text-violet-600">৳2,000,000</div>
            <div className="text-sm text-gray-600 mt-1">This Month</div>
          </div>
          {/* Fixed Asset Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Building className="text-blue-400 mb-2" size={32} />
            <div className="text-lg font-semibold">Fixed Assets</div>
            <div className="text-2xl font-bold text-blue-500">৳4,200,000</div>
            <div className="text-sm text-gray-600 mt-1">Total Book Value</div>
          </div>
          {/* Asset Loss Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Banknote className="text-red-400 mb-2" size={32} />
            <div className="text-lg font-semibold">Asset Loss</div>
            <div className="text-2xl font-bold text-red-500">৳150,000</div>
            <div className="text-sm text-gray-600 mt-1">This Year</div>
          </div>
          {/* Extra Income Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <DollarSign className="text-emerald-400 mb-2" size={32} />
            <div className="text-lg font-semibold">Extra Income</div>
            <div className="text-2xl font-bold text-emerald-500">৳320,000</div>
            <div className="text-sm text-gray-600 mt-1">This Year</div>
          </div>
          {/* This Year Asset Inclution Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <Building className="text-sky-400 mb-2" size={32} />
            <div className="text-lg font-semibold">This Year Asset Inclution</div>
            <div className="text-2xl font-bold text-sky-500">৳600,000</div>
            <div className="text-sm text-gray-600 mt-1">This Year</div>
          </div>
        </div>
      )}
      {activeTab === 'branch' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branchSummaryData.map((metric, idx) => (
            <div key={metric.metric} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <metric.icon className="mb-2" size={32} color={metric.color} />
              <div className="text-lg font-semibold mb-2">{metric.metric}</div>
              {/* Pie chart for overall distribution */}
              {renderPieChart(metric.data, ['#3b82f6', '#16a34a', '#f59e42'])}
              {/* Branch-wise color cards with name and value */}
              <div className="flex flex-col w-full mt-4 gap-2">
                {branchList.map((b, i) => (
                  <div key={b.code} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: ['#3b82f6', '#16a34a', '#f59e42'][i] }}></span>
                      <span className="font-semibold" style={{ color: ['#3b82f6', '#16a34a', '#f59e42'][i] }}>{b.name}</span>
                    </div>
                    <span className="font-bold text-right" style={{ color: ['#3b82f6', '#16a34a', '#f59e42'][i] }}>
                      {typeof metric.data[i] === 'number' && metric.metric === 'Finance' ? `৳${metric.data[i].toLocaleString()}` : metric.data[i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summary;
