import React, { useEffect, useState } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { orders } from '../data/mockData';
import { useToast } from '../hooks/useToast';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Execution: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const { showToast } = useToast();
  const location = useLocation();
  const [selectedOrderId, setSelectedOrderId] = useState(
    location.state?.orderId || orders[0]?.id || ''
  );
  const [activeTab, setActiveTab] = useState('initial-stage');

  useEffect(() => {
    setPageTitle('Execution Tracker');
  }, [setPageTitle]);

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const handleStatusUpdate = (section: string, item: string, newStatus: string) => {
    showToast(`${item} status updated to ${newStatus}!`);
  };

  const tabs = [
    { id: 'initial-stage', label: 'Initial Stage' },
    { id: 'sample-plan', label: 'Sample Plan' },
    { id: 'production-plan', label: 'Production Plan' }
  ];

  if (!selectedOrder) {
    return <div>Order not found!</div>;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Received':
      case 'Approved':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'In Progress':
        return <Clock className="text-yellow-500" size={20} />;
      case 'On Hold':
        return <AlertCircle className="text-orange-500" size={20} />;
      default:
        return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Received':
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Hold':
        return 'bg-orange-100 text-orange-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderInitialStageExecution = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Receive from Buyer - Execution Status</h4>
        <div className="space-y-4">
          {[
            { item: 'Purchase Order', status: 'Received', deadline: '2025-06-05' },
            { item: 'Original Sample', status: 'Pending', deadline: '2025-06-10' },
            { item: 'Measurement Sheet', status: 'Received', deadline: '2025-06-08' },
            { item: 'Sales Contract', status: 'In Progress', deadline: '2025-06-12' },
            { item: 'TT', status: 'Pending', deadline: '2025-06-15' }
          ].map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <div>
                  <h5 className="font-medium">{task.item}</h5>
                  <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusUpdate('receive', task.item, e.target.value)}
                  className="p-2 border rounded-md text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Received">Received</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Approval Items - Execution Status</h4>
        <div className="space-y-4">
          {[
            { item: 'Lab Dip', status: 'Approved', assignedTo: 'Quality Manager', deadline: '2025-06-18' },
            { item: 'Print Strike-off', status: 'In Progress', assignedTo: 'Sample Master', deadline: '2025-06-20' },
            { item: 'Care Label', status: 'Pending', assignedTo: 'Quality Manager', deadline: '2025-06-22' },
            { item: 'Size Label', status: 'Pending', assignedTo: 'Sample Master', deadline: '2025-06-22' },
            { item: 'Elastic', status: 'Pending', assignedTo: 'Quality Manager', deadline: '2025-06-25' }
          ].map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <div>
                  <h5 className="font-medium">{task.item}</h5>
                  <p className="text-sm text-gray-500">Assigned to: {task.assignedTo}</p>
                  <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusUpdate('approval', task.item, e.target.value)}
                  className="p-2 border rounded-md text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSamplePlanExecution = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Sample Plan - Execution Status</h4>
      <div className="space-y-4">
        {[
          { type: 'Fit Sample', style: selectedOrder.style, color: 'Navy Blue', qty: 12, status: 'Completed', deadline: '2025-06-25' },
          { type: 'SMS', style: selectedOrder.style, color: 'Navy Blue', qty: 8, status: 'In Progress', deadline: '2025-06-30' },
          { type: 'PP Sample', style: selectedOrder.style, color: 'Navy Blue', qty: 15, status: 'Pending', deadline: '2025-07-05' },
          { type: 'Size Sample', style: selectedOrder.style, color: 'Navy Blue', qty: 20, status: 'Pending', deadline: '2025-07-10' },
          { type: 'Shipment Sample', style: selectedOrder.style, color: 'Navy Blue', qty: 10, status: 'Pending', deadline: '2025-07-15' }
        ].map((sample, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              {getStatusIcon(sample.status)}
              <div>
                <h5 className="font-medium">{sample.type}</h5>
                <p className="text-sm text-gray-500">{sample.style} - {sample.color} - Qty: {sample.qty}</p>
                <p className="text-sm text-gray-500">Deadline: {sample.deadline}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sample.status)}`}>
                {sample.status}
              </span>
              <select
                value={sample.status}
                onChange={(e) => handleStatusUpdate('sample', sample.type, e.target.value)}
                className="p-2 border rounded-md text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProductionPlanExecution = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2 flex items-center">
          <span className="mr-3">🧶</span>Knitting - Execution Status
        </h4>
        <div className="space-y-4">
          {[
            { fabric: 'Single Jersey', qty: '1250 Yds', factory: 'ABC Knitwear', status: 'Completed', deadline: '2025-06-19' },
            { fabric: 'PK Fabric', qty: '800 Yds', factory: 'XYZ Knitting', status: 'In Progress', deadline: '2025-06-22' }
          ].map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <div>
                  <h5 className="font-medium">{task.fabric}</h5>
                  <p className="text-sm text-gray-500">Qty: {task.qty} - Factory: {task.factory}</p>
                  <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusUpdate('knitting', task.fabric, e.target.value)}
                  className="p-2 border rounded-md text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2 flex items-center">
          <span className="mr-3">🎨</span>Dyeing - Execution Status
        </h4>
        <div className="space-y-4">
          {[
            { fabric: 'Single Jersey', color: 'Navy Blue', qty: '1250 Yds', status: 'In Progress', deadline: '2025-06-25' },
            { fabric: 'PK Fabric', color: 'White', qty: '800 Yds', status: 'Pending', deadline: '2025-06-28' }
          ].map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <div>
                  <h5 className="font-medium">{task.fabric} - {task.color}</h5>
                  <p className="text-sm text-gray-500">Qty: {task.qty}</p>
                  <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusUpdate('dyeing', `${task.fabric} - ${task.color}`, e.target.value)}
                  className="p-2 border rounded-md text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">Execution Tracker</h2>
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
      <div className="space-y-6">
        {activeTab === 'initial-stage' && renderInitialStageExecution()}
        {activeTab === 'sample-plan' && renderSamplePlanExecution()}
        {activeTab === 'production-plan' && renderProductionPlanExecution()}
      </div>
    </div>
  );
};

export default Execution;