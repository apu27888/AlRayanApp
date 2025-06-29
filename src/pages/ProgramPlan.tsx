import React, { useEffect, useState } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { orders, stockItems } from '../data/mockData';
import { useToast } from '../hooks/useToast';

const ProgramPlan: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const { showToast } = useToast();
  const location = useLocation();
  const [selectedOrderId, setSelectedOrderId] = useState(
    location.state?.orderId || orders[0]?.id || ''
  );
  const [activeTab, setActiveTab] = useState('receive-from-buyer');

  useEffect(() => {
    setPageTitle('Program Plan');
  }, [setPageTitle]);

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const handleSave = () => {
    showToast('Program plan saved successfully!');
  };

  const handleColorSwagChange = (index: number, field: string, value: string) => {
    const orderIndex = orders.findIndex(o => o.id === selectedOrderId);
    if (orderIndex >= 0 && orders[orderIndex].programPlan.initialStage.colorSwagItems) {
      orders[orderIndex].programPlan.initialStage.colorSwagItems[index] = {
        ...orders[orderIndex].programPlan.initialStage.colorSwagItems[index],
        [field]: value
      };
    }
  };

  const tabs = [
    { id: 'receive-from-buyer', label: 'Receive From Buyer' },
    { id: 'approval', label: 'Approval' },
    { id: 'sample-plan', label: 'Sample Plan' },
    { id: 'requisition-budget', label: 'Requisition & Budget' },
    { id: 'production-plan', label: 'Production Plan' }
  ];

  if (!selectedOrder) {
    return <div>Order not found!</div>;
  }

  const renderReceiveFromBuyer = () => (
    <div className="space-y-6">
      {/* Buyer Contract Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 text-gray-800">Buyer Contract</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 font-semibold text-sm">Item</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Starting Date</th>
                <th className="p-3 font-semibold text-sm">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {['Sales Contract', 'PO Sheet', 'TT', 'LC'].map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 font-medium">{item}</td>
                  <td className="p-3">
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                      <option value="Pending">Pending</option>
                      <option value="Received">Received</option>
                      <option value="In Progress">In Progress</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Color Swag Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 text-gray-800">Color Swag</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 font-semibold text-sm">Fabric Type</th>
                <th className="p-3 font-semibold text-sm">Color</th>
                <th className="p-3 font-semibold text-sm">Pantone</th>
                <th className="p-3 font-semibold text-sm">Start Date</th>
                <th className="p-3 font-semibold text-sm">End Date</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.programPlan.initialStage.colorSwagItems && selectedOrder.programPlan.initialStage.colorSwagItems.length > 0 ? (
                selectedOrder.programPlan.initialStage.colorSwagItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">
                      <input
                        type="text"
                        value={item.fabricType}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        readOnly
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={item.color}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        readOnly
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={item.pantone}
                        onChange={(e) => handleColorSwagChange(index, 'pantone', e.target.value)}
                        placeholder="19-4052 TPX"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="date"
                        value={item.startDate}
                        onChange={(e) => handleColorSwagChange(index, 'startDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="date"
                        value={item.endDate}
                        onChange={(e) => handleColorSwagChange(index, 'endDate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No color swag items submitted yet. Please submit styles from Order Introduction first.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reference Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 text-gray-800">Reference</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 font-semibold text-sm">Style</th>
                <th className="p-3 font-semibold text-sm">Fabric Type</th>
                <th className="p-3 font-semibold text-sm" colSpan={2}>Original Sample</th>
                <th className="p-3 font-semibold text-sm" colSpan={2}>Measurement Sheet</th>
                <th className="p-3 font-semibold text-sm" colSpan={2}>Color Swatch</th>
              </tr>
              <tr className="bg-gray-50 border-t">
                <th className="p-2"></th>
                <th className="p-2"></th>
                <th className="p-2 font-medium text-xs">Start Date</th>
                <th className="p-2 font-medium text-xs">Deadline</th>
                <th className="p-2 font-medium text-xs">Start Date</th>
                <th className="p-2 font-medium text-xs">Deadline</th>
                <th className="p-2 font-medium text-xs">Start Date</th>
                <th className="p-2 font-medium text-xs">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.programPlan.initialStage.referenceItems.length > 0 ? (
                selectedOrder.programPlan.initialStage.referenceItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 font-medium">{item.style}</td>
                    <td className="p-3">{item.fabricType}</td>
                    <td className="p-2">
                      <input
                        type="date"
                        value={item.originalSample.startDate}
                        className="w-full p-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        value={item.originalSample.deadline}
                        className="w-full p-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        value={item.measurementSheet.startDate}
                        className="w-full p-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        value={item.measurementSheet.deadline}
                        className="w-full p-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        value={item.colorSwatch.startDate}
                        className="w-full p-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        value={item.colorSwatch.deadline}
                        className="w-full p-1 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No reference items submitted yet. Please submit styles from Order Introduction first.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderApproval = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="font-semibold text-lg mb-4 text-gray-800">Approval</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 font-semibold text-sm">Item for Approval</th>
              <th className="p-3 font-semibold text-sm">Followed By</th>
              <th className="p-3 font-semibold text-sm">Executor</th>
              <th className="p-3 font-semibold text-sm">Starting Date</th>
              <th className="p-3 font-semibold text-sm">Deadline</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">Lab Dip</td>
              <td className="p-3">
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Quality Manager</option>
                  <option>Sample Master</option>
                  <option>Pattern Master</option>
                </select>
              </td>
              <td className="p-3">
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Sample Master</option>
                  <option>Quality Manager</option>
                  <option>Pattern Master</option>
                </select>
              </td>
              <td className="p-3">
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
              <td className="p-3">
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3">Print and Embroidery Strike-off</td>
              <td className="p-3">
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Quality Manager</option>
                  <option>Sample Master</option>
                  <option>Pattern Master</option>
                </select>
              </td>
              <td className="p-3">
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Sample Master</option>
                  <option>Quality Manager</option>
                  <option>Pattern Master</option>
                </select>
              </td>
              <td className="p-3">
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
              <td className="p-3">
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3">Care Label</td>
              <td className="p-3">
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Quality Manager</option>
                  <option>Sample Master</option>
                  <option>Pattern Master</option>
                </select>
              </td>
              <td className="p-3">
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Sample Master</option>
                  <option>Quality Manager</option>
                  <option>Pattern Master</option>
                </select>
              </td>
              <td className="p-3">
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
              <td className="p-3">
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3">Size Label</td>
              <td className="p-3">
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Quality Manager</option>
                  <option>Sample Master</option>
                  <option>Pattern Master</option>
                </select>
              </td>
              <td className="p-3">
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Sample Master</option>
                  <option>Quality Manager</option>
                  <option>Pattern Master</option>
                </select>
              </td>
              <td className="p-3">
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
              <td className="p-3">
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3">Elastic</td>
              <td className="p-3">
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Quality Manager</option>
                  <option>Sample Master</option>
                  <option>Pattern Master</option>
                </select>
              </td>
              <td className="p-3">
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Sample Master</option>
                  <option>Quality Manager</option>
                  <option>Pattern Master</option>
                </select>
              </td>
              <td className="p-3">
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
              <td className="p-3">
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSamplePlan = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="font-semibold text-lg mb-4 text-gray-800">Sample Plan</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 font-semibold text-sm">Sample Type</th>
              <th className="p-3 font-semibold text-sm">Style</th>
              <th className="p-3 font-semibold text-sm">Color</th>
              <th className="p-3 font-semibold text-sm">Item</th>
              <th className="p-3 font-semibold text-sm">Garments QTY</th>
              <th className="p-3 font-semibold text-sm">Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <option>Fit Sample</option>
                  <option>SMS</option>
                  <option>PP Sample</option>
                </select>
              </td>
              <td className="p-3">
                <input type="text" value={selectedOrder.style} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
              <td className="p-3">
                <input type="text" placeholder="Navy Blue" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
              <td className="p-3">
                <input type="text" placeholder="Polo Fabric" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
              <td className="p-3">
                <input type="number" placeholder="12" className="w-20 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
              <td className="p-3">
                <input type="text" placeholder="Check fit carefully" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRequisitionBudget = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="font-semibold text-lg mb-4 text-gray-800">Requisition & Budget</h4>
      <p className="text-gray-500">Requisition and budget planning will be implemented here.</p>
    </div>
  );

  const renderProductionPlan = () => (
    <div className="space-y-6">
      {/* Knitting Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-bold text-lg mb-3 flex items-center">
          <span className="mr-3">🧶</span>Knitting
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium">Fabric</label>
            <select className="mt-1 w-full p-2 border rounded bg-white">
              <option>KF-001 - Single Jersey</option>
              <option>KF-008 - PK</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Quantity</label>
            <input type="number" defaultValue="1250" className="mt-1 w-full p-2 border rounded" />
          </div>
          <div>
            <label className="text-sm font-medium">Yarn</label>
            <select className="mt-1 w-full p-2 border rounded bg-white">
              <option>YRN-G3 - 26/1 Cotton - Grey</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Factory</label>
            <input type="text" defaultValue="ABC Knitwear" className="mt-1 w-full p-2 border rounded" />
          </div>
        </div>
      </div>

      {/* Dyeing Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-bold text-lg mb-3 flex items-center">
          <span className="mr-3">🎨</span>Dyeing
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium">Fabric</label>
            <select className="mt-1 w-full p-2 border rounded bg-white">
              <option>Select from Knitting</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Color</label>
            <input type="text" placeholder="Navy Blue" className="mt-1 w-full p-2 border rounded" />
          </div>
          <div>
            <label className="text-sm font-medium">Quantity</label>
            <input type="number" className="mt-1 w-full p-2 border rounded" />
          </div>
          <div>
            <label className="text-sm font-medium">W. Rate</label>
            <input type="number" step="0.01" className="mt-1 w-full p-2 border rounded" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">Program Plan</h2>
        <select
          value={selectedOrderId}
          onChange={(e) => setSelectedOrderId(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
        >
          {orders.map(order => (
            <option key={order.id} value={order.id}>
              {order.id} - {order.buyer} - {order.style}
            </option>
          ))}
        </select>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
        {activeTab === 'receive-from-buyer' && renderReceiveFromBuyer()}
        {activeTab === 'approval' && renderApproval()}
        {activeTab === 'sample-plan' && renderSamplePlan()}
        {activeTab === 'requisition-budget' && renderRequisitionBudget()}
        {activeTab === 'production-plan' && renderProductionPlan()}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Full Program Plan
        </button>
      </form>
    </div>
  );
};

export default ProgramPlan;