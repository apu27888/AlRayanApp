import React, { useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Package, Cog, Ship, User as UserTie } from 'lucide-react';
import { orders, buyers } from '../data/mockData';
import StatusBadge from '../components/UI/StatusBadge';
import ProgressBar from '../components/UI/ProgressBar';

const Dashboard: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();

  useEffect(() => {
    setPageTitle('Dashboard');
  }, [setPageTitle]);

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: Package,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'In Production',
      value: orders.filter(o => o.progress > 0 && o.progress < 100).length,
      icon: Cog,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Shipment Pending',
      value: orders.filter(o => o.productionStatus !== 'Shipped').length,
      icon: Ship,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Total Buyers',
      value: buyers.length,
      icon: UserTie,
      color: 'bg-green-100 text-green-600'
    }
  ];

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'yellow': return 'yellow';
      case 'green': return 'green';
      case 'red': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`${stat.color} rounded-full h-12 w-12 flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Orders Status</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 font-semibold text-sm">Order ID</th>
                <th className="p-3 font-semibold text-sm">Buyer</th>
                <th className="p-3 font-semibold text-sm">Style</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Progress</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(-4).map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-3">
                    <Link 
                      to="/order-progress" 
                      state={{ orderId: order.id }}
                      className="text-blue-600 hover:underline"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td className="p-3">{order.buyer}</td>
                  <td className="p-3">{order.style}</td>
                  <td className="p-3">
                    <StatusBadge status={order.managementStatus} variant="management" />
                  </td>
                  <td className="p-3">
                    <ProgressBar 
                      progress={order.progress} 
                      color={getProgressColor(order.productionStatusColor)} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;