import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Reporting: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();

  useEffect(() => {
    setPageTitle('Reporting & Analytics');
  }, [setPageTitle]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Reporting & Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Order Volume */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-4">Monthly Order Volume</h3>
          <div className="space-y-4">
            {[
              { month: 'Jan', value: 65 },
              { month: 'Feb', value: 80 },
              { month: 'Mar', value: 70 },
              { month: 'Apr', value: 85 },
              { month: 'May', value: 75 },
              { month: 'Jun', value: 90 }
            ].map((item) => (
              <div key={item.month} className="flex items-center">
                <span className="w-20 text-sm text-gray-600">{item.month}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6">
                  <div 
                    className="bg-blue-500 h-6 rounded-full text-white text-sm flex items-center justify-center"
                    style={{ width: `${item.value}%` }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipment Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-4">Shipment Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 font-semibold text-sm">Month</th>
                  <th className="p-3 font-semibold text-sm">Shipped</th>
                  <th className="p-3 font-semibold text-sm">Pending</th>
                  <th className="p-3 font-semibold text-sm">On-Time %</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { month: 'Jan', shipped: 60, pending: 5, onTime: 98 },
                  { month: 'Feb', shipped: 75, pending: 5, onTime: 95 },
                  { month: 'Mar', shipped: 68, pending: 2, onTime: 99 },
                  { month: 'Apr', shipped: 82, pending: 3, onTime: 97 },
                  { month: 'May', shipped: 71, pending: 4, onTime: 96 },
                  { month: 'Jun', shipped: 89, pending: 1, onTime: 99 }
                ].map((row) => (
                  <tr key={row.month} className="border-b">
                    <td className="p-3">{row.month}</td>
                    <td className="p-3">{row.shipped}</td>
                    <td className="p-3">{row.pending}</td>
                    <td className="p-3">
                      <span className="text-green-600 font-semibold">{row.onTime}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Production Efficiency */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-4">Production Efficiency</h3>
          <div className="space-y-3">
            {[
              { department: 'Cutting', efficiency: 92 },
              { department: 'Sewing', efficiency: 88 },
              { department: 'Finishing', efficiency: 95 },
              { department: 'Quality Control', efficiency: 97 }
            ].map((item) => (
              <div key={item.department} className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.department}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${item.efficiency}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold">{item.efficiency}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-4">Order Status Distribution</h3>
          <div className="space-y-3">
            {[
              { status: 'Confirmed', count: 15, color: 'bg-green-500' },
              { status: 'In Production', count: 8, color: 'bg-blue-500' },
              { status: 'Negotiation', count: 5, color: 'bg-yellow-500' },
              { status: 'On Hold', count: 2, color: 'bg-orange-500' }
            ].map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium">{item.status}</span>
                </div>
                <span className="text-sm font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reporting;