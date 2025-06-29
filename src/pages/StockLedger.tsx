import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { stockLedger } from '../data/mockData';

const StockLedger: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();

  useEffect(() => {
    setPageTitle('Stock Ledger');
  }, [setPageTitle]);

  const sortedLedger = [...stockLedger].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Stock Ledger</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 font-semibold text-sm">Date & Time</th>
              <th className="p-3 font-semibold text-sm">Item Code</th>
              <th className="p-3 font-semibold text-sm">Item Name</th>
              <th className="p-3 font-semibold text-sm">Type</th>
              <th className="p-3 font-semibold text-sm">Quantity</th>
              <th className="p-3 font-semibold text-sm">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {sortedLedger.map((entry, index) => (
              <tr key={index} className="border-b text-sm">
                <td className="p-2">{new Date(entry.date).toLocaleString()}</td>
                <td className="p-2">{entry.itemCode}</td>
                <td className="p-2">{entry.itemName}</td>
                <td className="p-2">
                  <div className={`flex items-center font-semibold ${
                    entry.type === 'IN' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {entry.type === 'IN' ? (
                      <ArrowUp size={16} className="mr-1" />
                    ) : (
                      <ArrowDown size={16} className="mr-1" />
                    )}
                    {entry.type}
                  </div>
                </td>
                <td className={`p-2 font-semibold ${
                  entry.type === 'IN' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {entry.quantity.toLocaleString()}
                </td>
                <td className="p-2">{entry.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockLedger;