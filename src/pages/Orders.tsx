import React, { useEffect, useState } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { Plus, ChevronDown, ChevronUp, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { orders, priceQuotations, buyers, buyingHouses } from '../data/mockData';
import Button from '../components/UI/Button';
import StatusBadge from '../components/UI/StatusBadge';
import CostBreakdown from '../components/Orders/CostBreakdown';
import OrderBreakdownTable from '../components/Orders/OrderBreakdownTable';
import Modal from '../components/UI/Modal';
import { useToast } from '../hooks/useToast';

const Orders: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders-list');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [refreshQuotations, setRefreshQuotations] = useState(0);
  const [quotationData, setQuotationData] = useState(priceQuotations);
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [showCostingDetails, setShowCostingDetails] = useState(false);
  const [expandedQuotations, setExpandedQuotations] = useState<Record<string, boolean>>({});
  const [newOrderInput, setNewOrderInput] = useState({
    buyingHouseId: '',
    buyerId: '',
    numberOfStyles: 1,
    orderDate: new Date().toISOString().split('T')[0],
    shipmentDate: ''
  });

  useEffect(() => {
    setPageTitle('Order Management');
  }, [setPageTitle]);

  useEffect(() => {
    setQuotationData([...priceQuotations]);
  }, [refreshQuotations]);

  useEffect(() => {
    // Set default shipment date to 3 months from order date
    const orderDate = new Date(newOrderInput.orderDate);
    const shipmentDate = new Date(orderDate);
    shipmentDate.setMonth(shipmentDate.getMonth() + 3);
    
    setNewOrderInput(prev => ({
      ...prev,
      shipmentDate: shipmentDate.toISOString().split('T')[0]
    }));
  }, [newOrderInput.orderDate]);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const toggleQuotationExpansion = (quotationKey: string) => {
    setExpandedQuotations(prev => ({
      ...prev,
      [quotationKey]: !prev[quotationKey]
    }));
  };

  const forceRefresh = () => {
    setRefreshKey(prev => prev + 1);
    showToast('Order list refreshed!');
  };

  const generateOrderId = () => {
    const existingIds = orders.map(order => {
      const match = order.id.match(/#ORD-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    const maxId = Math.max(...existingIds, 0);
    return `#ORD-${String(maxId + 1).padStart(3, '0')}`;
  };

  const handleCreateNewOrder = () => {
    setIsCreateOrderModalOpen(true);
  };

  const resetNewOrderForm = () => {
    const today = new Date().toISOString().split('T')[0];
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 3);
    
    setNewOrderInput({
      buyingHouseId: '',
      buyerId: '',
      numberOfStyles: 1,
      orderDate: today,
      shipmentDate: futureDate.toISOString().split('T')[0]
    });
  };

  const confirmCreateOrder = () => {
    // Validation
    if (!newOrderInput.buyingHouseId || !newOrderInput.buyerId || newOrderInput.numberOfStyles <= 0) {
      showToast('Please fill in all required fields!', 'error');
      return;
    }

    const selectedBuyer = buyers.find(b => b.id === newOrderInput.buyerId);
    const selectedBuyingHouse = buyingHouses.find(bh => bh.id === newOrderInput.buyingHouseId);
    
    if (!selectedBuyer) {
      showToast('Selected buyer not found!', 'error');
      return;
    }

    if (!selectedBuyingHouse) {
      showToast('Selected buying house not found!', 'error');
      return;
    }

    const newOrderId = generateOrderId();

    const newOrder = {
      id: newOrderId,
      buyer: selectedBuyer.name,
      style: '',
      quantity: 0,
      orderDate: newOrderInput.orderDate,
      shipDate: newOrderInput.shipmentDate,
      managementStatus: 'Negotiation' as const,
      description: '',
      productionStatus: 'Pending',
      productionStatusColor: 'gray',
      progress: 0,
      sampleProgress: { 
        'Sample Receive': 'pending', 
        'Supply from godown': 'pending' 
      },
      costingHistory: [],
      buyingHouseId: newOrderInput.buyingHouseId,
      numberOfStyles: newOrderInput.numberOfStyles,
      orderIntroduction: {
        merchandiser: '',
        orderNumber: '',
        orderTitle: '',
        orderDescription: '',
        season: '',
        year: new Date().getFullYear().toString(),
        contactDate: newOrderInput.orderDate,
        startDate: newOrderInput.orderDate,
        expiryDate: newOrderInput.shipmentDate,
        consignee: `${selectedBuyer.company}, ${selectedBuyer.country}`,
        managementStatus: 'Negotiation',
        negotiationPeriod: '',
        paymentTerms: '',
        paymentMode: '',
        bankAccount: '',
        portOfLoading: '',
        portOfDischarge: '',
        items: []
      },
      programPlan: {
        initialStage: { 
          receiveFromBuyer: [], 
          approval: [],
          referenceItems: [],
          colorSwagItems: []
        },
        samplePlan: [],
        rbb: [],
        requisitionBudget: {},
        production: {}
      }
    };

    // Add the new order to the orders array
    orders.push(newOrder);

    showToast(`New order created successfully with ${newOrderInput.numberOfStyles} style slots!`);
    resetNewOrderForm();
    setIsCreateOrderModalOpen(false);
    
    // Force refresh the order list
    setRefreshKey(prev => prev + 1);      // Auto-expand the new order to show breakdown table with animation
    setTimeout(() => {
      setExpandedOrders(prev => ({
        ...prev,
        [newOrderId]: true
      }));
      showToast('New order created successfully!');
    }, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'green';
      case 'Negotiation': return 'blue';
      case 'On Hold': return 'yellow';
      case 'Cancelled': return 'red';
      default: return 'gray';
    }
  };

  const handleCostingClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setActiveTab('cost-breakdown');
  };

  const handleQuotationSubmitted = () => {
    const currentOrderId = selectedOrderId;
    setRefreshQuotations(prev => prev + 1);
    // Don't switch tabs, stay on Cost Breakdown
    setSelectedOrderId(currentOrderId);
    showToast('Price quotation updated successfully!');
  };

  const updateQuotationField = (index: number, field: string, value: any) => {
    const updatedQuotations = [...quotationData];
    updatedQuotations[index] = { ...updatedQuotations[index], [field]: value };
    setQuotationData(updatedQuotations);
  };

  const handleSaveAllQuotations = () => {
    // Validate if there are any approved quotations
    const hasApprovedQuotations = quotationData.some(q => q.status === 'Approve');
    if (!hasApprovedQuotations) {
      showToast('Please approve at least one quotation before proceeding!', 'error');
      return;
    }

    // Update the global priceQuotations array
    priceQuotations.length = 0;
    priceQuotations.push(...quotationData);
    
    // Get the first approved quotation's order ID
    const firstApprovedQuotation = quotationData.find(q => q.status === 'Approve');
    if (firstApprovedQuotation) {
      showToast('All quotations saved successfully! Navigating to Order Introduction...', 'success');
      
      // Navigate after a small delay to ensure the toast is shown
      setTimeout(() => {
        navigate('/order-introduction', { 
          state: { 
            orderId: firstApprovedQuotation.orderId,
            tab: 'management-details'
          } 
        });
      }, 500);
    } else {
      showToast('No quotations to save!', 'error');
    }
  };

  const canApprove = (quotation: any) => {
    return quotation.fPrice > 0;
  };

  const getBuyingHouseName = (buyingHouseId?: string) => {
    if (!buyingHouseId) return '-';
    const buyingHouse = buyingHouses.find(bh => bh.id === buyingHouseId);
    return buyingHouse ? buyingHouse.name : '-';
  };

  const getCostingDetailsForQuotation = (quotation: any) => {
    const order = orders.find(o => o.id === quotation.orderId);
    if (!order) return null;

    // Find the latest costing revision for this order item
    const matchingRevisions = order.costingHistory.filter(
      revision => revision.orderItemId === quotation.orderItemId
    );

    if (matchingRevisions.length === 0) return null;

    // Get the latest revision
    const latestRevision = matchingRevisions[matchingRevisions.length - 1];
    return latestRevision;
  };

  const tabs = [
    { id: 'orders-list', label: 'Orders' },
    { id: 'cost-breakdown', label: 'Cost Breakdown' },
    { id: 'price-quotation', label: 'Price Quotation' }
  ];

  return (
    <div className="space-y-6">
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
      {activeTab === 'orders-list' && (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Orders List</h3>
            <div className="flex space-x-2">
              <Button onClick={forceRefresh} variant="secondary" size="sm">
                <RefreshCw size={16} className="mr-2" />
                Refresh
              </Button>
              <Button onClick={handleCreateNewOrder}>
                <Plus size={16} className="mr-2" />
                Create New Order
              </Button>
            </div>
          </div>
          
          <table key={refreshKey} className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 font-semibold text-sm w-12"></th>
                <th className="p-3 font-semibold text-sm">Order ID</th>
                <th className="p-3 font-semibold text-sm">Buyer</th>
                <th className="p-3 font-semibold text-sm">Style</th>
                <th className="p-3 font-semibold text-sm">Quantity</th>
                <th className="p-3 font-semibold text-sm">Order Date</th>
                <th className="p-3 font-semibold text-sm">Shipment Date</th>
                <th className="p-3 font-semibold text-sm">Status</th>
                <th className="p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const isConfirmed = order.managementStatus === 'Confirmed';
                const isExpanded = expandedOrders[order.id];
                
                return (
                  <React.Fragment key={order.id}>
                    {/* Main Order Row */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <button
                          onClick={() => toggleOrderExpansion(order.id)}
                          className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded hover:bg-gray-200"
                          title={isExpanded ? "Collapse items" : "Expand items"}
                        >
                          {isExpanded ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                      </td>
                      <td className="p-3">
                        <Link 
                          to="/order-progress" 
                          state={{ orderId: order.id }}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="p-3">{order.buyer || <span className="text-gray-400 italic">Not set</span>}</td>
                      <td className="p-3">
                        <div className="flex flex-col">
                          <span>{order.style || <span className="text-gray-400 italic">Not set</span>}</span>
                          {order.numberOfStyles && (
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full inline-block w-fit mt-1">
                              {order.numberOfStyles} style{order.numberOfStyles > 1 ? 's' : ''} planned
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">{order.quantity ? order.quantity.toLocaleString() : <span className="text-gray-400 italic">0</span>}</td>
                      <td className="p-3">{order.orderDate}</td>
                      <td className="p-3">{order.shipDate}</td>
                      <td className="p-3">
                        <StatusBadge status={order.managementStatus} variant="management" />
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Link
                            to="/order-introduction"
                            state={{ orderId: order.id }}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </Link>
                          <button 
                            onClick={() => handleCostingClick(order.id)}
                            className="text-purple-600 hover:underline"
                          >
                            Costing
                          </button>
                          <Link
                            to="/program-plan"
                            state={{ orderId: order.id }}
                            className={`${
                              isConfirmed 
                                ? 'text-green-600 hover:underline' 
                                : 'text-gray-400 cursor-not-allowed'
                            }`}
                            onClick={(e) => !isConfirmed && e.preventDefault()}
                          >
                            Plan
                          </Link>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Order Items Row with Animation */}
                    <tr>
                      <td colSpan={9} className="p-0">
                        <div 
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="p-4 bg-gray-50 border-t">
                            <OrderBreakdownTable order={order} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          
          {orders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No orders found. Create your first order to get started.</p>
              <Button onClick={handleCreateNewOrder}>
                <Plus size={16} className="mr-2" />
                Create First Order
              </Button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'cost-breakdown' && (
        <CostBreakdown 
          selectedOrderId={selectedOrderId} 
          onQuotationSubmitted={handleQuotationSubmitted}
        />
      )}

      {activeTab === 'price-quotation' && (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Submitted Price Quotations</h3>
            <Button 
              onClick={() => setShowCostingDetails(!showCostingDetails)}
              variant={showCostingDetails ? "success" : "secondary"}
              size="sm"
            >
              {showCostingDetails ? <EyeOff size={16} className="mr-2" /> : <Eye size={16} className="mr-2" />}
              {showCostingDetails ? 'Hide' : 'Show'} Costing Details
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {showCostingDetails && <th className="p-2 font-semibold w-12"></th>}
                  <th className="p-2 font-semibold">Style</th>
                  <th className="p-2 font-semibold">Item</th>
                  <th className="p-2 font-semibold">O.Qnty</th>
                  <th className="p-2 font-semibold">U.Price</th>
                  <th className="p-2 font-semibold">BP1</th>
                  <th className="p-2 font-semibold">RP1</th>
                  <th className="p-2 font-semibold">BP2</th>
                  <th className="p-2 font-semibold">RP2</th>
                  <th className="p-2 font-semibold">BP3</th>
                  <th className="p-2 font-semibold">RP3</th>
                  <th className="p-2 font-semibold">BP4</th>
                  <th className="p-2 font-semibold">RP4</th>
                  <th className="p-2 font-semibold">F.Price</th>
                  <th className="p-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {quotationData.length > 0 ? (
                  quotationData.map((q, index) => {
                    const quotationKey = `${q.orderId}-${q.orderItemId || 'default'}`;
                    const isExpanded = expandedQuotations[quotationKey];
                    const costingDetails = getCostingDetailsForQuotation(q);
                    
                    return (
                      <React.Fragment key={index}>
                        {/* Main Quotation Row */}
                        <tr className="border-b">
                          {showCostingDetails && (
                            <td className="p-2">
                              {costingDetails && (
                                <button
                                  onClick={() => toggleQuotationExpansion(quotationKey)}
                                  className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded hover:bg-gray-200"
                                  title={isExpanded ? "Hide costing details" : "Show costing details"}
                                >
                                  {isExpanded ? (
                                    <ChevronUp size={16} />
                                  ) : (
                                    <ChevronDown size={16} />
                                  )}
                                </button>
                              )}
                            </td>
                          )}
                          <td className="p-2">
                            <div className="flex flex-col">
                              <span>{q.style}</span>
                              {q.orderItemId && (
                                <span className="text-xs text-gray-500">ID: {q.orderItemId}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-2">{q.item}</td>
                          <td className="p-2">{q.oqnty.toLocaleString()}</td>
                          <td className="p-2 font-semibold">${q.uPrice.toFixed(2)}</td>
                          <td className="p-1">
                            <input 
                              type="number" 
                              step="0.01"
                              value={q.bp1}
                              onChange={(e) => updateQuotationField(index, 'bp1', parseFloat(e.target.value) || 0)}
                              className="w-20 p-1 border rounded" 
                            />
                          </td>
                          <td className="p-1">
                            <input 
                              type="number" 
                              step="0.01"
                              value={q.rp1}
                              onChange={(e) => updateQuotationField(index, 'rp1', parseFloat(e.target.value) || 0)}
                              className="w-20 p-1 border rounded" 
                            />
                          </td>
                          <td className="p-1">
                            <input 
                              type="number" 
                              step="0.01"
                              value={q.bp2}
                              onChange={(e) => updateQuotationField(index, 'bp2', parseFloat(e.target.value) || 0)}
                              className="w-20 p-1 border rounded" 
                            />
                          </td>
                          <td className="p-1">
                            <input 
                              type="number" 
                              step="0.01"
                              value={q.rp2}
                              onChange={(e) => updateQuotationField(index, 'rp2', parseFloat(e.target.value) || 0)}
                              className="w-20 p-1 border rounded" 
                            />
                          </td>
                          <td className="p-1">
                            <input 
                              type="number" 
                              step="0.01"
                              value={q.bp3}
                              onChange={(e) => updateQuotationField(index, 'bp3', parseFloat(e.target.value) || 0)}
                              className="w-20 p-1 border rounded" 
                            />
                          </td>
                          <td className="p-1">
                            <input 
                              type="number" 
                              step="0.01"
                              value={q.rp3}
                              onChange={(e) => updateQuotationField(index, 'rp3', parseFloat(e.target.value) || 0)}
                              className="w-20 p-1 border rounded" 
                            />
                          </td>
                          <td className="p-1">
                            <input 
                              type="number" 
                              step="0.01"
                              value={q.bp4}
                              onChange={(e) => updateQuotationField(index, 'bp4', parseFloat(e.target.value) || 0)}
                              className="w-20 p-1 border rounded" 
                            />
                          </td>
                          <td className="p-1">
                            <input 
                              type="number" 
                              step="0.01"
                              value={q.rp4}
                              onChange={(e) => updateQuotationField(index, 'rp4', parseFloat(e.target.value) || 0)}
                              className="w-20 p-1 border rounded" 
                            />
                          </td>
                          <td className="p-1">
                            <input 
                              type="number" 
                              step="0.01"
                              value={q.fPrice}
                              onChange={(e) => updateQuotationField(index, 'fPrice', parseFloat(e.target.value) || 0)}
                              className="w-20 p-1 border rounded font-semibold" 
                            />
                          </td>
                          <td className="p-1">
                            <select 
                              value={q.status}
                              onChange={(e) => updateQuotationField(index, 'status', e.target.value)}
                              className="p-1 border rounded"
                              disabled={!canApprove(q)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approve" disabled={!canApprove(q)}>Approve</option>
                              <option value="Reject">Reject</option>
                            </select>
                          </td>
                        </tr>

                        {/* Expanded Costing Details Row */}
                        {showCostingDetails && costingDetails && (
                          <tr>
                            <td colSpan={showCostingDetails ? 15 : 14} className="p-0">
                              <div 
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                  isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                              >
                                <div className="p-4 bg-blue-50 border-t">
                                  <h5 className="font-semibold text-md mb-3 text-gray-800">
                                    Costing Details - {q.style} (Rev-{costingDetails.revision})
                                  </h5>
                                  
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Fabric Details */}
                                    <div>
                                      <h6 className="font-medium text-sm mb-2 text-gray-700">Fabric Breakdown</h6>
                                      <div className="bg-white rounded-lg p-3">
                                        <table className="w-full text-xs">
                                          <thead>
                                            <tr className="bg-gray-100">
                                              <th className="p-2 text-left">Fabric</th>
                                              <th className="p-2 text-right">Qty (KG)</th>
                                              <th className="p-2 text-right">Price</th>
                                              <th className="p-2 text-right">Total</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {costingDetails.fabrics.map((fabric, fabricIndex) => (
                                              <tr key={fabricIndex} className="border-b">
                                                <td className="p-2">{fabric.name}</td>
                                                <td className="p-2 text-right">{fabric.qty}</td>
                                                <td className="p-2 text-right">${fabric.price.toFixed(2)}</td>
                                                <td className="p-2 text-right font-semibold">${(fabric.qty * fabric.price).toFixed(2)}</td>
                                              </tr>
                                            ))}
                                            <tr className="bg-gray-100 font-semibold">
                                              <td className="p-2" colSpan={3}>Fabric Total</td>
                                              <td className="p-2 text-right">
                                                ${costingDetails.fabrics.reduce((sum, f) => sum + (f.qty * f.price), 0).toFixed(2)}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>

                                    {/* Other Costs */}
                                    <div>
                                      <h6 className="font-medium text-sm mb-2 text-gray-700">Other Costs</h6>
                                      <div className="bg-white rounded-lg p-3">
                                        <table className="w-full text-xs">
                                          <tbody>
                                            <tr className="border-b">
                                              <td className="p-2">Trims & Accessories</td>
                                              <td className="p-2 text-right font-semibold">${costingDetails.trims.toFixed(2)}</td>
                                            </tr>
                                            <tr className="border-b">
                                              <td className="p-2">Print</td>
                                              <td className="p-2 text-right font-semibold">${costingDetails.print.toFixed(2)}</td>
                                            </tr>
                                            <tr className="border-b">
                                              <td className="p-2">Embroidery</td>
                                              <td className="p-2 text-right font-semibold">${costingDetails.embroidery.toFixed(2)}</td>
                                            </tr>
                                            <tr className="border-b">
                                              <td className="p-2">Wash</td>
                                              <td className="p-2 text-right font-semibold">${costingDetails.wash.toFixed(2)}</td>
                                            </tr>
                                            <tr className="border-b">
                                              <td className="p-2">Cost of Making (CM)</td>
                                              <td className="p-2 text-right font-semibold">${costingDetails.cm.toFixed(2)}</td>
                                            </tr>
                                            <tr className="border-b">
                                              <td className="p-2">Commercial</td>
                                              <td className="p-2 text-right font-semibold">${costingDetails.commercial.toFixed(2)}</td>
                                            </tr>
                                            <tr className="border-b">
                                              <td className="p-2">Miscellaneous</td>
                                              <td className="p-2 text-right font-semibold">${costingDetails.misc.toFixed(2)}</td>
                                            </tr>
                                            <tr className="bg-blue-100 font-bold">
                                              <td className="p-2">Total Other Costs</td>
                                              <td className="p-2 text-right">
                                                ${(costingDetails.trims + costingDetails.print + costingDetails.embroidery + 
                                                   costingDetails.wash + costingDetails.cm + costingDetails.commercial + 
                                                   costingDetails.misc).toFixed(2)}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Summary */}
                                  <div className="mt-4 bg-white rounded-lg p-3">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                      <div>
                                        <p className="text-xs text-gray-600">Dozen Price</p>
                                        <p className="text-lg font-bold text-black">
                                          ${(costingDetails.fabrics.reduce((sum, f) => sum + (f.qty * f.price), 0) + 
                                             costingDetails.trims + costingDetails.print + costingDetails.embroidery + 
                                             costingDetails.wash + costingDetails.cm + costingDetails.commercial + 
                                             costingDetails.misc).toFixed(2)}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-600">Unit Price</p>
                                        <p className="text-lg font-bold text-green-600">${q.uPrice.toFixed(2)}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-600">Total Value</p>
                                        <p className="text-lg font-bold text-orange-600">
                                          ${(q.uPrice * q.oqnty).toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-3 text-xs text-gray-500">
                                    <p>Revision Date: {new Date(costingDetails.date).toLocaleString()}</p>
                                    <p>Quantity: {costingDetails.quantity.toLocaleString()} pieces</p>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={showCostingDetails ? 15 : 14} className="p-4 text-center text-gray-500">
                      No quotations submitted yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {quotationData.length > 0 && (
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSaveAllQuotations} variant="success">
                Save All Quotations & Go to Order Introduction
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Create New Order Modal */}
      <Modal
        isOpen={isCreateOrderModalOpen}
        onClose={() => {
          setIsCreateOrderModalOpen(false);
          resetNewOrderForm();
        }}
        title="Create New Order"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buying House *
              </label>
              <select
                value={newOrderInput.buyingHouseId}
                onChange={(e) => setNewOrderInput(prev => ({ ...prev, buyingHouseId: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Choose a buying house...</option>
                {buyingHouses.map(buyingHouse => (
                  <option key={buyingHouse.id} value={buyingHouse.id}>
                    {buyingHouse.name} - {buyingHouse.locationDist}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Buyer *
              </label>
              <select
                value={newOrderInput.buyerId}
                onChange={(e) => setNewOrderInput(prev => ({ ...prev, buyerId: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Choose a buyer...</option>
                {buyers.map(buyer => (
                  <option key={buyer.id} value={buyer.id}>
                    {buyer.name} - {buyer.company}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Styles *
              </label>
              <input
                type="number"
                value={newOrderInput.numberOfStyles}
                onChange={(e) => setNewOrderInput(prev => ({ ...prev, numberOfStyles: parseInt(e.target.value) || 1 }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter number of styles"
                min="1"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                This will create {newOrderInput.numberOfStyles || 0} empty row{newOrderInput.numberOfStyles !== 1 ? 's' : ''} in the Order Items Breakdown table
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Date *
              </label>
              <input
                type="date"
                value={newOrderInput.orderDate}
                onChange={(e) => setNewOrderInput(prev => ({ ...prev, orderDate: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipment Date *
              </label>
              <input
                type="date"
                value={newOrderInput.shipmentDate}
                onChange={(e) => setNewOrderInput(prev => ({ ...prev, shipmentDate: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="secondary" 
              onClick={() => {
                setIsCreateOrderModalOpen(false);
                resetNewOrderForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={confirmCreateOrder}>
              Create Order & Styles
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Orders;