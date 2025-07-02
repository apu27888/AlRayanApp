import React, { useEffect, useState } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { orders, stockItems, COSTING_ITEMS, CATEGORIES, BREAKDOWN_SIZES, priceQuotations } from '../data/mockData';
import { OrderItem, BreakdownItem } from '../types';
import { useToast } from '../hooks/useToast';
import Button from '../components/UI/Button';
import MultiSelectDropdown from '../components/UI/MultiSelectDropdown';

const OrderIntroduction: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const { showToast } = useToast();
  const location = useLocation();
  const [selectedOrderId, setSelectedOrderId] = useState(
    location.state?.orderId || orders[0]?.id || ''
  );
  const [activeTab, setActiveTab] = useState(
    location.state?.tab || 'buyer-details'
  );
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    setPageTitle('Order Introduction');
  }, [setPageTitle]);

  useEffect(() => {
    const selectedOrder = orders.find(o => o.id === selectedOrderId);
    if (selectedOrder?.orderIntroduction?.items) {
      setOrderItems(selectedOrder.orderIntroduction.items);
    } else {
      setOrderItems([]);
    }
  }, [selectedOrderId]);

  const handleSave = () => {
    showToast('Order introduction saved successfully!');
  };

  const tabs = [
    { id: 'buyer-details', label: 'Buyer Details' },
    { id: 'commercial-details', label: 'Commercial Details' },
    { id: 'management-details', label: 'Management Details' },
    { id: 'order-details', label: 'Order Details' },
    { id: 'style-breakdown', label: 'Style Break Down' },
    { id: 'artwork-measurement', label: 'Artwork & Measurement' },
    { id: 'consumption', label: 'Consumption' }
  ];

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  if (!selectedOrder) {
    return <div>Order not found!</div>;
  }

  const getColorOptions = () => {
    return stockItems.filter(item => item.category === 'Color').map(color => ({
      value: color.code,
      label: color.name,
      color: color.value
    }));
  };

  const getSizeOptions = () => {
    return BREAKDOWN_SIZES.map(size => ({
      value: size,
      label: size
    }));
  };

  const getFabricOptions = (category: string) => {
    return stockItems.filter(item => item.category === category);
  };

  const addNewOrderItem = () => {
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
    setOrderItems([...orderItems, newItem]);
  };

  const removeOrderItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateOrderItem = (index: number, field: keyof OrderItem, value: any) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setOrderItems(updatedItems);
  };

  const calculateTotalPrice = (oqnty: number, unitPrice: number) => {
    return (oqnty * unitPrice).toFixed(2);
  };

  const getTotalOrderQnty = () => {
    return orderItems.reduce((sum, item) => sum + (item.oqnty || 0), 0);
  };

  const getTotalOrderAmount = () => {
    return orderItems.reduce((sum, item) => sum + ((item.oqnty || 0) * (item.unitPrice || 0)), 0).toFixed(2);
  };

  const generateBreakdownFromStyleData = () => {
    const updatedItems = [...orderItems];
    
    updatedItems.forEach((item, itemIndex) => {
      if (item.colors && item.colors.length > 0 && item.sizes && item.sizes.length > 0) {
        // Generate breakdown rows based on selected fabric colors
        const newBreakdown: BreakdownItem[] = item.colors.map(colorCode => {
          const breakdownItem: BreakdownItem = {
            fabricColor: colorCode,
            printColor: '',
            embColor: '',
            qnty: 0
          };
          
          // Initialize all breakdown sizes to 0
          BREAKDOWN_SIZES.forEach(size => {
            breakdownItem[size] = 0;
          });
          
          return breakdownItem;
        });
        
        updatedItems[itemIndex].breakdown = newBreakdown;
      }
    });
    
    setOrderItems(updatedItems);
  };

  const updateMasterStyleAndGoToBreakdown = () => {
    // Update the order's items in mock data
    const orderIndex = orders.findIndex(o => o.id === selectedOrderId);
    if (orderIndex >= 0) {
      orders[orderIndex].orderIntroduction.items = orderItems;
    }
    
    // Generate breakdown based on fabric colors and sizes
    generateBreakdownFromStyleData();
    
    setActiveTab('style-breakdown');
    showToast('Style updated and breakdown generated successfully!');
  };

  const addBreakdownVariation = (itemIndex: number) => {
    const updatedItems = [...orderItems];
    if (!updatedItems[itemIndex].breakdown) {
      updatedItems[itemIndex].breakdown = [];
    }
    
    const newBreakdown: BreakdownItem = {
      fabricColor: '',
      printColor: '',
      embColor: '',
      qnty: 0
    };
    
    // Initialize all breakdown sizes to 0
    BREAKDOWN_SIZES.forEach(size => {
      newBreakdown[size] = 0;
    });
    
    updatedItems[itemIndex].breakdown!.push(newBreakdown);
    setOrderItems(updatedItems);
  };

  const updateBreakdownItem = (itemIndex: number, breakdownIndex: number, field: string, value: any) => {
    const updatedItems = [...orderItems];
    if (!updatedItems[itemIndex].breakdown) return;
    
    updatedItems[itemIndex].breakdown![breakdownIndex] = {
      ...updatedItems[itemIndex].breakdown![breakdownIndex],
      [field]: value
    };
    setOrderItems(updatedItems);
  };

  const removeBreakdownVariation = (itemIndex: number, breakdownIndex: number) => {
    const updatedItems = [...orderItems];
    if (!updatedItems[itemIndex].breakdown) return;
    
    updatedItems[itemIndex].breakdown!.splice(breakdownIndex, 1);
    setOrderItems(updatedItems);
  };

  const getApprovedQuotations = () => {
    return priceQuotations.filter(q => q.status === 'Approve' && q.orderId === selectedOrderId);
  };

  const handleCreateMasterStyle = () => {
    const approvedQuotations = getApprovedQuotations();
    
    if (approvedQuotations.length === 0) {
      showToast('No approved quotations found!', 'error');
      return;
    }

    const newItems: OrderItem[] = approvedQuotations.map(q => ({
      id: Date.now() + Math.random(),
      style: q.style,
      item: q.item,
      fabricCategory: '',
      fabricName: '',
      colors: [],
      sizes: [],
      startDate: '',
      unitPrice: q.fPrice,
      shipmentDate: '',
      oqnty: q.oqnty,
      breakdown: []
    }));

    setOrderItems([...orderItems, ...newItems]);
    setActiveTab('order-details');
    showToast('Master styles created from approved quotations!');
  };

  const handleSubmitToReceiveFromBuyer = (itemIndex: number) => {
    const item = orderItems[itemIndex];
    
    // Get fabric type name
    const fabricItem = stockItems.find(stock => stock.code === item.fabricName);
    const fabricTypeName = fabricItem ? fabricItem.name : item.fabricCategory;
    
    // Create reference item for Program Plan
    const newReferenceItem = {
      style: item.style,
      fabricType: fabricTypeName,
      originalSample: {
        startDate: '',
        deadline: ''
      },
      measurementSheet: {
        startDate: '',
        deadline: ''
      },
      colorSwatch: {
        startDate: '',
        deadline: ''
      }
    };
    
    // Create color swag items for each fabric color
    const colorOptions = getColorOptions();
    const newColorSwagItems = item.colors?.map(colorCode => {
      const colorItem = colorOptions.find(c => c.value === colorCode);
      return {
        fabricType: fabricTypeName,
        color: colorItem?.label || colorCode,
        pantone: '',
        startDate: '',
        endDate: ''
      };
    }) || [];
    
    // Find the order and add to reference items and color swag items
    const orderIndex = orders.findIndex(o => o.id === selectedOrderId);
    if (orderIndex >= 0) {
      if (!orders[orderIndex].programPlan.initialStage.referenceItems) {
        orders[orderIndex].programPlan.initialStage.referenceItems = [];
      }
      if (!orders[orderIndex].programPlan.initialStage.colorSwagItems) {
        orders[orderIndex].programPlan.initialStage.colorSwagItems = [];
      }
      orders[orderIndex].programPlan.initialStage.referenceItems.push(newReferenceItem);
      orders[orderIndex].programPlan.initialStage.colorSwagItems.push(...newColorSwagItems);
    }
    
    showToast(`${item.style} submitted and sent to Receive from Buyer!`);
  };

  // Helper function to calculate row total (TTL)
  const calculateRowTotal = (breakdown: BreakdownItem, selectedSizes: string[]) => {
    const sizesToSum = selectedSizes.length > 0 ? selectedSizes : BREAKDOWN_SIZES;
    return sizesToSum.reduce((sum, size) => {
      const value = breakdown[size];
      return sum + (typeof value === 'number' ? value : 0);
    }, 0);
  };

  // Helper function to calculate grand total for a style
  const calculateGrandTotal = (breakdowns: BreakdownItem[], selectedSizes: string[]) => {
    return breakdowns.reduce((sum, breakdown) => {
      return sum + calculateRowTotal(breakdown, selectedSizes);
    }, 0);
  };

  const renderBuyerDetails = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4 border-b pb-2">Buyer Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Name</label>
          <input
            type="text"
            value={selectedOrder.buyer}
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Merchandiser</label>
          <input
            type="text"
            defaultValue={selectedOrder.orderIntroduction.merchandiser || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
          <input
            type="text"
            defaultValue={selectedOrder.orderIntroduction.orderNumber || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order Title</label>
          <input
            type="text"
            defaultValue={selectedOrder.orderIntroduction.orderTitle || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
          <input
            type="text"
            defaultValue={selectedOrder.orderIntroduction.season || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <input
            type="text"
            defaultValue={selectedOrder.orderIntroduction.year || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Date</label>
          <input
            type="date"
            defaultValue={selectedOrder.orderIntroduction.contactDate || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            defaultValue={selectedOrder.orderIntroduction.startDate || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
          <input
            type="date"
            defaultValue={selectedOrder.orderIntroduction.expiryDate || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Consignee & Notify</label>
          <textarea
            rows={3}
            defaultValue={selectedOrder.orderIntroduction.consignee || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter consignee and notify party details"
          />
        </div>
      </div>
    </div>
  );

  const renderCommercialDetails = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4 border-b pb-2">Commercial Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Negotiation Period</label>
          <input
            type="text"
            defaultValue={selectedOrder.orderIntroduction.negotiationPeriod || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
          <input
            type="text"
            defaultValue={selectedOrder.orderIntroduction.paymentTerms || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
          <input
            type="text"
            defaultValue={selectedOrder.orderIntroduction.paymentMode || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
          <input
            type="text"
            defaultValue={selectedOrder.orderIntroduction.bankAccount || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Port of Loading</label>
          <input
            type="text"
            defaultValue={selectedOrder.orderIntroduction.portOfLoading || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Port of Discharge</label>
          <input
            type="text"
            defaultValue={selectedOrder.orderIntroduction.portOfDischarge || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderManagementDetails = () => {
    const approvedQuotations = getApprovedQuotations();
    
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Management Details</h3>
          <div className="max-w-sm">
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
            <select
              defaultValue={selectedOrder.managementStatus}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Negotiation">Negotiation</option>
              <option value="Confirmed">Confirmed</option>
              <option value="On Hold">On Hold</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Approved Price Quotations Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Approved Price Quotations Summary</h3>
          {approvedQuotations.length > 0 ? (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 font-semibold">Style</th>
                      <th className="p-2 font-semibold">Item</th>
                      <th className="p-2 font-semibold">O.Qnty</th>
                      <th className="p-2 font-semibold">F.Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedQuotations.map((q, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{q.style}</td>
                        <td className="p-2">{q.item}</td>
                        <td className="p-2">{q.oqnty.toLocaleString()}</td>
                        <td className="p-2 font-semibold">${q.fPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleCreateMasterStyle} variant="success">
                  Create Master Style
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No approved quotations yet. Please approve quotations in Order Management first.
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderOrderDetails = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4 border-b pb-2">Style List</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 font-semibold">Style</th>
              <th className="p-2 font-semibold">O.Qnty</th>
              <th className="p-2 font-semibold">Item</th>
              <th className="p-2 font-semibold">Fabric Cat.</th>
              <th className="p-2 font-semibold">Fabric Type</th>
              <th className="p-2 font-semibold">Fabric Color</th>
              <th className="p-2 font-semibold">Size</th>
              <th className="p-2 font-semibold">Start Date</th>
              <th className="p-2 font-semibold">Unit Price</th>
              <th className="p-2 font-semibold">TTL Price</th>
              <th className="p-2 font-semibold">Ship. Date</th>
              <th className="p-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, index) => {
              const fabricOptions = getFabricOptions(item.fabricCategory);
              const colorOptions = getColorOptions();
              const sizeOptions = getSizeOptions();
              
              return (
                <tr key={item.id} className="border-b">
                  <td className="p-2">
                    <input
                      type="text"
                      value={item.style}
                      onChange={(e) => updateOrderItem(index, 'style', e.target.value)}
                      className="w-full p-1 border rounded text-sm"
                      placeholder="Style name"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.oqnty || 0}
                      onChange={(e) => updateOrderItem(index, 'oqnty', parseInt(e.target.value) || 0)}
                      className="w-20 p-1 border rounded text-sm"
                    />
                  </td>
                  <td className="p-2">
                    <select
                      value={item.item}
                      onChange={(e) => updateOrderItem(index, 'item', e.target.value)}
                      className="w-full p-1 border rounded text-sm"
                    >
                      <option value="">Select Item</option>
                      {COSTING_ITEMS.map(costingItem => (
                        <option key={costingItem} value={costingItem}>{costingItem}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">
                    <select
                      value={item.fabricCategory}
                      onChange={(e) => updateOrderItem(index, 'fabricCategory', e.target.value)}
                      className="w-full p-1 border rounded text-sm"
                    >
                      <option value="">Select Category</option>
                      {CATEGORIES.filter(cat => cat.includes('Fabric')).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">
                    <select
                      value={item.fabricName}
                      onChange={(e) => updateOrderItem(index, 'fabricName', e.target.value)}
                      className="w-full p-1 border rounded text-sm"
                      disabled={!item.fabricCategory}
                    >
                      <option value="">Select Fabric Type</option>
                      {fabricOptions.map(fabric => (
                        <option key={fabric.code} value={fabric.code}>{fabric.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">
                    <MultiSelectDropdown
                      options={colorOptions}
                      selectedValues={item.colors || []}
                      onChange={(values) => updateOrderItem(index, 'colors', values)}
                      placeholder="Select colors..."
                      className="min-w-[150px]"
                    />
                  </td>
                  <td className="p-2">
                    <MultiSelectDropdown
                      options={sizeOptions}
                      selectedValues={item.sizes || []}
                      onChange={(values) => updateOrderItem(index, 'sizes', values)}
                      placeholder="Select sizes..."
                      className="min-w-[180px]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="date"
                      value={item.startDate}
                      onChange={(e) => updateOrderItem(index, 'startDate', e.target.value)}
                      className="w-full p-1 border rounded text-sm"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      step="0.01"
                      value={item.unitPrice || 0}
                      onChange={(e) => updateOrderItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-20 p-1 border rounded text-sm"
                    />
                  </td>
                  <td className="p-2 font-semibold">
                    ${calculateTotalPrice(item.oqnty || 0, item.unitPrice || 0)}
                  </td>
                  <td className="p-2">
                    <input
                      type="date"
                      value={item.shipmentDate}
                      onChange={(e) => updateOrderItem(index, 'shipmentDate', e.target.value)}
                      className="w-full p-1 border rounded text-sm"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => removeOrderItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <Button onClick={addNewOrderItem} variant="secondary">
          <Plus size={16} className="mr-2" />
          Create New Style
        </Button>
        
        <div className="flex space-x-6 text-sm">
          <span className="font-semibold">Total Order Qnty: {getTotalOrderQnty().toLocaleString()}</span>
          <span className="font-semibold">Total Order Amount: ${getTotalOrderAmount()}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <Button onClick={updateMasterStyleAndGoToBreakdown} variant="success">
          Update Style & Go to Breakdown
        </Button>
      </div>
    </div>
  );

  const renderStyleBreakdown = () => (
    <div className="space-y-6">
      {orderItems.map((item, itemIndex) => {
        const fabricItem = stockItems.find(stock => stock.code === item.fabricName);
        const fabricTypeName = fabricItem ? fabricItem.name : item.fabricName;
        
        // Filter breakdown sizes to only show selected sizes for this item
        const selectedSizes = item.sizes || [];
        const displaySizes = selectedSizes.length > 0 ? selectedSizes : BREAKDOWN_SIZES;
        
        return (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-bold text-lg mb-4 border-b pb-2">
              {item.style} - {fabricTypeName || item.fabricCategory} - {item.oqnty?.toLocaleString() || 0}
            </h4>
            
            {item.breakdown && item.breakdown.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 font-semibold">Fabric Color</th>
                      <th className="p-3 font-semibold">Qnty</th>
                      <th className="p-3 font-semibold">Print Color</th>
                      <th className="p-3 font-semibold">Emb. Color</th>
                      {displaySizes.map(size => (
                        <th key={size} className="p-2 font-semibold text-center">{size}</th>
                      ))}
                      <th className="p-3 font-semibold">TTL</th>
                      <th className="p-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.breakdown.map((breakdown, breakdownIndex) => {
                      const colorOptions = getColorOptions();
                      const fabricColor = colorOptions.find(c => c.value === breakdown.fabricColor);
                      const printColor = colorOptions.find(c => c.value === breakdown.printColor);
                      const embColor = colorOptions.find(c => c.value === breakdown.embColor);
                      const rowTotal = calculateRowTotal(breakdown, selectedSizes);
                      
                      return (
                        <tr key={breakdownIndex} className="border-b">
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              {fabricColor && (
                                <div
                                  className="w-4 h-4 rounded border"
                                  style={{ backgroundColor: fabricColor.color }}
                                />
                              )}
                              <select
                                value={breakdown.fabricColor}
                                onChange={(e) => updateBreakdownItem(itemIndex, breakdownIndex, 'fabricColor', e.target.value)}
                                className="w-full min-w-[140px] p-2 border rounded text-sm"
                              >
                                <option value="">Select</option>
                                {colorOptions.map(color => (
                                  <option key={color.value} value={color.value}>{color.label}</option>
                                ))}
                              </select>
                            </div>
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              value={breakdown.qnty || 0}
                              onChange={(e) => updateBreakdownItem(itemIndex, breakdownIndex, 'qnty', parseInt(e.target.value) || 0)}
                              className="w-20 p-2 border rounded text-sm"
                              placeholder="0"
                            />
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              {printColor && (
                                <div
                                  className="w-4 h-4 rounded border"
                                  style={{ backgroundColor: printColor.color }}
                                />
                              )}
                              <select
                                value={breakdown.printColor}
                                onChange={(e) => updateBreakdownItem(itemIndex, breakdownIndex, 'printColor', e.target.value)}
                                className="w-full min-w-[140px] p-2 border rounded text-sm"
                              >
                                <option value="">Select</option>
                                {colorOptions.map(color => (
                                  <option key={color.value} value={color.value}>{color.label}</option>
                                ))}
                              </select>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              {embColor && (
                                <div
                                  className="w-4 h-4 rounded border"
                                  style={{ backgroundColor: embColor.color }}
                                />
                              )}
                              <select
                                value={breakdown.embColor}
                                onChange={(e) => updateBreakdownItem(itemIndex, breakdownIndex, 'embColor', e.target.value)}
                                className="w-full min-w-[140px] p-2 border rounded text-sm"
                              >
                                <option value="">Select</option>
                                {colorOptions.map(color => (
                                  <option key={color.value} value={color.value}>{color.label}</option>
                                ))}
                              </select>
                            </div>
                          </td>
                          {displaySizes.map(size => (
                            <td key={size} className="p-2">
                              <input
                                type="number"
                                value={breakdown[size] || 0}
                                onChange={(e) => updateBreakdownItem(itemIndex, breakdownIndex, size, parseInt(e.target.value) || 0)}
                                className="w-16 p-1 border rounded text-sm text-center"
                              />
                            </td>
                          ))}
                          <td className="p-3">
                            <span className="font-semibold text-blue-600">
                              {rowTotal.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => removeBreakdownVariation(itemIndex, breakdownIndex)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No breakdown variations added yet.</p>
            )}
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-4">
                <Button onClick={() => addBreakdownVariation(itemIndex)} variant="secondary" size="sm">
                  <Plus size={16} className="mr-2" />
                  Add Variation
                </Button>
                
                {item.breakdown && item.breakdown.length > 0 && (
                  <span className="font-semibold text-lg text-green-600">
                    Total = {calculateGrandTotal(item.breakdown, selectedSizes).toLocaleString()}
                  </span>
                )}
              </div>
              
              <Button 
                onClick={() => handleSubmitToReceiveFromBuyer(itemIndex)} 
                variant="success" 
                size="sm"
              >
                Submit & Send to Rcv from Buyer
              </Button>
            </div>
          </div>
        );
      })}
      
      {orderItems.length === 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 text-center">No styles created yet. Please go to Order Details to create master styles first.</p>
        </div>
      )}
    </div>
  );

  const renderArtworkMeasurement = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4 border-b pb-2">Artwork & Measurement</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Picture</label>
          <input
            type="file"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Measurement Sheet</label>
          <input
            type="file"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Print Picture</label>
          <input
            type="file"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Print Position</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderConsumption = () => {
    // Get unique fabrics and colors from order items
    const fabricsInOrder = orderItems.map(item => ({
      fabricName: item.fabricName,
      fabricCategory: item.fabricCategory,
      colors: item.colors || [],
      oqnty: item.oqnty || 0
    })).filter(item => item.fabricName);

    return (
      <div className="space-y-6">
        {/* Fabric Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Fabric Consumption</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 font-semibold text-sm">Fabric Type</th>
                  <th className="p-3 font-semibold text-sm">Color</th>
                  <th className="p-3 font-semibold text-sm">O.Qnty</th>
                  <th className="p-3 font-semibold text-sm">Qnty/pc</th>
                  <th className="p-3 font-semibold text-sm">Total Qnty</th>
                  <th className="p-3 font-semibold text-sm">W%</th>
                  <th className="p-3 font-semibold text-sm">Grand TTL</th>
                </tr>
              </thead>
              <tbody>
                {fabricsInOrder.length > 0 ? (
                  fabricsInOrder.map((fabric, index) => {
                    const fabricItem = stockItems.find(item => item.code === fabric.fabricName);
                    const colorOptions = getColorOptions();
                    
                    return fabric.colors.map((colorCode, colorIndex) => {
                      const colorItem = colorOptions.find(c => c.value === colorCode);
                      return (
                        <tr key={`${index}-${colorIndex}`} className="border-b">
                          <td className="p-3">
                            <input
                              type="text"
                              value={fabricItem?.name || fabric.fabricName}
                              className="w-full p-2 border rounded bg-gray-100"
                              readOnly
                            />
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              {colorItem && (
                                <div
                                  className="w-4 h-4 rounded border"
                                  style={{ backgroundColor: colorItem.color }}
                                />
                              )}
                              <input
                                type="text"
                                value={colorItem?.label || colorCode}
                                className="w-full p-2 border rounded bg-gray-100"
                                readOnly
                              />
                            </div>
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              value={fabric.oqnty}
                              className="w-full p-2 border rounded bg-gray-100"
                              readOnly
                            />
                          </td>
                          <td className="p-3">
                            <input type="number" step="0.01" className="w-full p-2 border rounded" placeholder="0.25" />
                          </td>
                          <td className="p-3">
                            <input type="number" className="w-full p-2 border rounded" placeholder="1250" readOnly />
                          </td>
                          <td className="p-3">
                            <input type="number" className="w-full p-2 border rounded" placeholder="5" />
                          </td>
                          <td className="p-3">
                            <input type="number" className="w-full p-2 border rounded" placeholder="1312.5" readOnly />
                          </td>
                        </tr>
                      );
                    });
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-gray-500">
                      No fabrics defined in Order Details. Please add styles with fabrics first.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trims Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Trims Consumption</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 font-semibold text-sm">Name</th>
                  <th className="p-3 font-semibold text-sm">Remarks</th>
                  <th className="p-3 font-semibold text-sm">Qnty/pc</th>
                  <th className="p-3 font-semibold text-sm">TTL Qnty</th>
                  <th className="p-3 font-semibold text-sm">W%</th>
                  <th className="p-3 font-semibold text-sm">Grand TTL</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">
                    <select className="w-full p-2 border rounded">
                      <option>Sewing Thread</option>
                      <option>Care Label</option>
                      <option>Size Label</option>
                      <option>Button</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input type="text" className="w-full p-2 border rounded" placeholder="Main sewing thread" />
                  </td>
                  <td className="p-3">
                    <input type="number" step="0.01" className="w-full p-2 border rounded" placeholder="1" />
                  </td>
                  <td className="p-3">
                    <input type="number" className="w-full p-2 border rounded" placeholder="5000" readOnly />
                  </td>
                  <td className="p-3">
                    <input type="number" className="w-full p-2 border rounded" placeholder="3" />
                  </td>
                  <td className="p-3">
                    <input type="number" className="w-full p-2 border rounded" placeholder="5150" readOnly />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Accessories Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Accessories Consumption</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 font-semibold text-sm">Name</th>
                  <th className="p-3 font-semibold text-sm">Remarks</th>
                  <th className="p-3 font-semibold text-sm">Qnty/pc</th>
                  <th className="p-3 font-semibold text-sm">Total Qnty</th>
                  <th className="p-3 font-semibold text-sm">W%</th>
                  <th className="p-3 font-semibold text-sm">Grand TTL</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">
                    <select className="w-full p-2 border rounded">
                      <option>Cartoon</option>
                      <option>Gum Tape</option>
                      <option>Poly Bag</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input type="text" className="w-full p-2 border rounded" placeholder="Export carton" />
                  </td>
                  <td className="p-3">
                    <input type="number" step="0.01" className="w-full p-2 border rounded" placeholder="0.02" />
                  </td>
                  <td className="p-3">
                    <input type="number" className="w-full p-2 border rounded" placeholder="100" readOnly />
                  </td>
                  <td className="p-3">
                    <input type="number" className="w-full p-2 border rounded" placeholder="2" />
                  </td>
                  <td className="p-3">
                    <input type="number" className="w-full p-2 border rounded" placeholder="102" readOnly />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold">Order Introduction</h2>
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
        {activeTab === 'buyer-details' && renderBuyerDetails()}
        {activeTab === 'commercial-details' && renderCommercialDetails()}
        {activeTab === 'management-details' && renderManagementDetails()}
        {activeTab === 'order-details' && renderOrderDetails()}
        {activeTab === 'style-breakdown' && renderStyleBreakdown()}
        {activeTab === 'artwork-measurement' && renderArtworkMeasurement()}
        {activeTab === 'consumption' && renderConsumption()}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Entire Order Introduction
        </button>
      </form>
    </div>
  );
};

export default OrderIntroduction;