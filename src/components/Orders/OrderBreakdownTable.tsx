import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { COSTING_ITEMS, orders } from '../../data/mockData';
import { OrderItem } from '../../types';
import Button from '../UI/Button';
import { useToast } from '../../hooks/useToast';

interface OrderBreakdownTableProps {
  order: any;
}

const OrderBreakdownTable: React.FC<OrderBreakdownTableProps> = ({ order }) => {
  const { showToast } = useToast();
  const [currentOrderItems, setCurrentOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    // Initialize order items based on numberOfStyles or existing items
    if (order.orderIntroduction?.items && order.orderIntroduction.items.length > 0) {
      setCurrentOrderItems(order.orderIntroduction.items);
    } else if (order.numberOfStyles && order.numberOfStyles > 0) {
      // Create empty items based on numberOfStyles
      const newItems: OrderItem[] = Array.from({ length: order.numberOfStyles }, (_, index) => ({
        id: Date.now() + index,
        style: '',
        item: '',
        fabricCategory: '',
        fabricName: '',
        colors: [],
        sizes: [],
        startDate: '',
        unitPrice: 0,
        shipmentDate: '',
        oqnty: 0,
        breakdown: []
      }));
      setCurrentOrderItems(newItems);
    }
  }, [order.numberOfStyles, order.orderIntroduction?.items]);

  const handleAddItem = () => {
    const newItem: OrderItem = {
      id: Date.now(),
      style: '',
      item: '',
      fabricCategory: '',
      fabricName: '',
      colors: [],
      sizes: [],
      startDate: '',
      unitPrice: 0,
      shipmentDate: '',
      oqnty: 0,
      breakdown: []
    };
    setCurrentOrderItems([...currentOrderItems, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    setCurrentOrderItems(currentOrderItems.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, field: keyof OrderItem, value: any) => {
    const updatedItems = [...currentOrderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setCurrentOrderItems(updatedItems);
  };

  const calculateTotalQuantity = () => {
    return currentOrderItems.reduce((sum, item) => sum + (item.oqnty || 0), 0);
  };

  const handleSaveChanges = () => {
    // Find the order in the global orders array and update it
    const orderIndex = orders.findIndex(o => o.id === order.id);
    if (orderIndex >= 0) {
      if (!orders[orderIndex].orderIntroduction) {
        orders[orderIndex].orderIntroduction = {
          items: []
        };
      }
      
      // Update order items
      orders[orderIndex].orderIntroduction.items = currentOrderItems;
      
      // Update main order quantity based on total quantity from breakdown
      const totalQuantity = calculateTotalQuantity();
      orders[orderIndex].quantity = totalQuantity;
      
      // Update style name if there's only one item or use a combined name
      if (currentOrderItems.length === 1 && currentOrderItems[0].style) {
        orders[orderIndex].style = currentOrderItems[0].style;
      } else if (currentOrderItems.length > 1) {
        const styleNames = currentOrderItems
          .filter(item => item.style)
          .map(item => item.style)
          .slice(0, 2); // Take first 2 styles
        
        if (styleNames.length > 0) {
          orders[orderIndex].style = styleNames.length > 1 
            ? `${styleNames.join(', ')}${currentOrderItems.length > 2 ? ` +${currentOrderItems.length - 2} more` : ''}`
            : styleNames[0];
        }
      }
      
      showToast('Order items saved successfully! Main order quantity updated.');
    } else {
      showToast('Order not found!', 'error');
    }
  };

  const totalQuantity = calculateTotalQuantity();

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-md text-gray-800">Order Items Breakdown</h4>
        {order.numberOfStyles && (
          <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
            Expected Styles: {order.numberOfStyles}
          </span>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-semibold text-sm">SN</th>
              <th className="p-3 font-semibold text-sm">Style Name</th>
              <th className="p-3 font-semibold text-sm">Item</th>
              <th className="p-3 font-semibold text-sm">Quantity</th>
              <th className="p-3 font-semibold text-sm">Unit Price</th>
              <th className="p-3 font-semibold text-sm">Total Value</th>
              <th className="p-3 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrderItems.length > 0 ? (
              currentOrderItems.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3 text-sm font-medium">{index + 1}</td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={item.style}
                      onChange={(e) => handleUpdateItem(index, 'style', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Enter style name"
                    />
                  </td>
                  <td className="p-3">
                    <select
                      value={item.item}
                      onChange={(e) => handleUpdateItem(index, 'item', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="">Select Item...</option>
                      {COSTING_ITEMS.map(costingItem => (
                        <option key={costingItem} value={costingItem}>{costingItem}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={item.oqnty || 0}
                      onChange={(e) => handleUpdateItem(index, 'oqnty', parseInt(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="0"
                      min="0"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="number"
                      step="0.01"
                      value={item.unitPrice || 0}
                      onChange={(e) => handleUpdateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="0.00"
                      min="0"
                    />
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-semibold text-green-600">
                      ${((item.oqnty || 0) * (item.unitPrice || 0)).toFixed(2)}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500 text-sm">
                  {order.numberOfStyles > 0 
                    ? `Ready to add ${order.numberOfStyles} style(s). Items will be auto-created based on your order.`
                    : "No items added yet. Click 'Add Item' to get started."
                  }
                </td>
              </tr>
            )}
            
            {/* Summary Row */}
            {currentOrderItems.length > 0 && (
              <tr className="bg-blue-50 font-semibold">
                <td className="p-3 text-sm" colSpan={3}>Total Summary</td>
                <td className="p-3 text-sm text-blue-600">{totalQuantity.toLocaleString()}</td>
                <td className="p-3 text-sm">-</td>
                <td className="p-3 text-sm text-green-600">
                  ${currentOrderItems.reduce((sum, item) => sum + ((item.oqnty || 0) * (item.unitPrice || 0)), 0).toFixed(2)}
                </td>
                <td className="p-3"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button onClick={handleAddItem} variant="secondary" size="sm">
          <Plus size={16} className="mr-2" />
          Add Item
        </Button>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Total Items: {currentOrderItems.length}
            {order.numberOfStyles && ` / ${order.numberOfStyles} expected`}
          </span>
          <span className="text-sm font-semibold text-blue-600">
            Total Quantity: {totalQuantity.toLocaleString()}
          </span>
          {currentOrderItems.length > 0 && (
            <Button onClick={handleSaveChanges} variant="success" size="sm">
              Save Changes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderBreakdownTable;