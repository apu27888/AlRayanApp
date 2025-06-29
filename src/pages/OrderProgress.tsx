import React, { useEffect, useState } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { orders, sampleSteps, productionSteps } from '../data/mockData';
import { CheckCircle, Clock, Circle } from 'lucide-react';

const OrderProgress: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const location = useLocation();
  const [selectedOrderId, setSelectedOrderId] = useState(
    location.state?.orderId || orders[0]?.id || ''
  );

  useEffect(() => {
    setPageTitle('Order Progress Tracker');
  }, [setPageTitle]);

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  if (!selectedOrder) {
    return <div>Order not found!</div>;
  }

  const currentStepIndex = productionSteps.findIndex(s => s.key === selectedOrder.productionStatus);

  const renderProgressStep = (step: any, index: number, isCompleted: boolean, isCurrent: boolean) => {
    const IconComponent = isCompleted ? CheckCircle : isCurrent ? Clock : Circle;
    const iconColor = isCompleted ? 'text-blue-600' : isCurrent ? 'text-yellow-500' : 'text-gray-300';
    const textColor = isCompleted ? 'text-gray-900 font-semibold' : isCurrent ? 'text-gray-900 font-semibold' : 'text-gray-500';
    const statusText = isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending';

    return (
      <div key={step.key} className="flex items-start space-x-3 pb-8 relative">
        {index < productionSteps.length - 1 && (
          <div className={`absolute left-3 top-8 w-0.5 h-full ${
            isCompleted ? 'bg-blue-600' : 'bg-gray-300'
          }`} />
        )}
        <div className={`${iconColor} z-10 bg-white`}>
          <IconComponent size={24} />
        </div>
        <div>
          <p className={textColor}>{step.key}</p>
          <p className="text-sm text-gray-500">{statusText}</p>
        </div>
      </div>
    );
  };

  const renderSampleProgress = () => {
    return sampleSteps.map((step, index) => {
      const status = selectedOrder.sampleProgress[step.key];
      const isCompleted = status === 'completed';
      return renderProgressStep(step, index, isCompleted, false);
    });
  };

  const renderProductionProgress = () => {
    return productionSteps.map((step, index) => {
      const isCompleted = index < currentStepIndex;
      const isCurrent = index === currentStepIndex;
      return renderProgressStep(step, index, isCompleted, isCurrent);
    });
  };

  const productionColumns = productionSteps.reduce((acc: any[][], step, index) => {
    const columnIndex = index < 6 ? 0 : 1;
    if (!acc[columnIndex]) acc[columnIndex] = [];
    
    const isCompleted = index < currentStepIndex;
    const isCurrent = index === currentStepIndex;
    acc[columnIndex].push(renderProgressStep(step, index, isCompleted, isCurrent));
    
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">Order Progress Tracker</h2>
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

      {/* Sample & Supply Progress */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-4 border-b pb-2">Sample & Supply</h3>
        <div className="pl-2 pt-2">
          {renderSampleProgress()}
        </div>
      </div>

      {/* Production Progress */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-4 border-b pb-2">Production Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {productionColumns.map((column, columnIndex) => (
            <div key={columnIndex}>
              {column}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;