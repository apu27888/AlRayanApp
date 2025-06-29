import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { orders, COSTING_ITEMS, priceQuotations, stockItems, CATEGORIES } from '../../data/mockData';
import Button from '../UI/Button';
import { useToast } from '../../hooks/useToast';

interface CostBreakdownProps {
  selectedOrderId: string | null;
  onQuotationSubmitted?: () => void;
}

interface FabricRow {
  fabricCategory: string;
  fabricCode: string;
  qty: number;
  price: number;
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({ selectedOrderId, onQuotationSubmitted }) => {
  const { showToast } = useToast();
  const [currentOrder, setCurrentOrder] = useState(selectedOrderId || orders[0]?.id || '');
  const [selectedOrderItemId, setSelectedOrderItemId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    style: '',
    item: '',
    quantity: 0,
    trims: 0,
    print: 0,
    embroidery: 0,
    wash: 0,
    cm: 0,
    commercial: 0,
    misc: 0
  });
  const [fabricRows, setFabricRows] = useState<FabricRow[]>([
    { fabricCategory: '', fabricCode: '', qty: 0, price: 0 }
  ]);
  const [totals, setTotals] = useState({
    dozenPrice: 0,
    unitPrice: 0,
    totalCost: 0
  });

  // Keep selected order when component updates
  useEffect(() => {
    if (selectedOrderId && selectedOrderId !== currentOrder) {
      setCurrentOrder(selectedOrderId);
      const order = orders.find(o => o.id === selectedOrderId);
      if (order?.orderIntroduction?.items?.[0]?.id) {
        setSelectedOrderItemId(order.orderIntroduction.items[0].id);
      }
    }
  }, [selectedOrderId, currentOrder]);

  useEffect(() => {
    const order = orders.find(o => o.id === currentOrder);
    if (order && selectedOrderItemId) {
      const selectedOrderItem = order.orderIntroduction?.items?.find(item => item.id === selectedOrderItemId);
      
      if (selectedOrderItem) {
        setFormData({
          style: selectedOrderItem.style,
          item: selectedOrderItem.item,
          quantity: selectedOrderItem.oqnty || 0,
          trims: 0,
          print: 0,
          embroidery: 0,
          wash: 0,
          cm: 0,
          commercial: 0,
          misc: 0
        });

        // Load latest costing revision for this specific order item
        const matchingRevisions = order.costingHistory.filter(
          revision => revision.orderItemId === selectedOrderItemId
        );
        
        if (matchingRevisions.length > 0) {
          const latest = matchingRevisions[matchingRevisions.length - 1];
          setFormData(prev => ({
            ...prev,
            trims: latest.trims,
            print: latest.print,
            embroidery: latest.embroidery,
            wash: latest.wash,
            cm: latest.cm,
            commercial: latest.commercial,
            misc: latest.misc
          }));
          
          // Convert fabric data to new format
          const convertedFabricRows = latest.fabrics.map(f => {
            const fabricItem = stockItems.find(item => item.code === f.name || item.name === f.name);
            return {
              fabricCategory: fabricItem?.category || '',
              fabricCode: f.name,
              qty: f.qty,
              price: f.price
            };
          });
          setFabricRows(convertedFabricRows);
        } else {
          // Reset to default if no history for this order item
          setFabricRows([{ fabricCategory: '', fabricCode: '', qty: 0, price: 0 }]);
        }
      }
    } else {
      // Reset form if no order item selected
      setFormData({
        style: '',
        item: '',
        quantity: 0,
        trims: 0,
        print: 0,
        embroidery: 0,
        wash: 0,
        cm: 0,
        commercial: 0,
        misc: 0
      });
      setFabricRows([{ fabricCategory: '', fabricCode: '', qty: 0, price: 0 }]);
    }
  }, [currentOrder, selectedOrderItemId]);

  useEffect(() => {
    calculateTotals();
  }, [formData, fabricRows]);

  const calculateTotals = () => {
    // Calculate total cost for 1 dozen (12 pieces)
    const fabricTotal = fabricRows.reduce((sum, row) => sum + (row.qty * row.price), 0);
    const otherCosts = formData.trims + formData.print + formData.embroidery + formData.wash + formData.cm + formData.commercial + formData.misc;
    
    // This is the cost for 1 dozen (12 pieces)
    const dozenPrice = fabricTotal + otherCosts;
    
    // Calculate unit price (cost per single piece)
    const unitPrice = dozenPrice / 12;
    
    // Calculate total cost for the entire order quantity
    const totalCost = unitPrice * formData.quantity;

    setTotals({ dozenPrice, unitPrice, totalCost });
  };

  const addFabricRow = () => {
    setFabricRows([...fabricRows, { fabricCategory: '', fabricCode: '', qty: 0, price: 0 }]);
  };

  const removeFabricRow = (index: number) => {
    setFabricRows(fabricRows.filter((_, i) => i !== index));
  };

  const updateFabricRow = (index: number, field: keyof FabricRow, value: string | number) => {
    const newRows = [...fabricRows];
    
    if (field === 'fabricCategory') {
      // Reset fabricCode when category changes
      newRows[index] = { 
        ...newRows[index], 
        fabricCategory: value as string,
        fabricCode: ''
      };
    } else {
      newRows[index] = { ...newRows[index], [field]: value };
    }
    
    setFabricRows(newRows);
  };

  const handleInputChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const order = orders.find(o => o.id === currentOrder);
    if (!order || !selectedOrderItemId) {
      showToast('Order or style not selected!', 'error');
      return;
    }

    const selectedOrderItem = order.orderIntroduction?.items?.find(item => item.id === selectedOrderItemId);
    if (!selectedOrderItem) {
      showToast('Selected style not found!', 'error');
      return;
    }

    // Get existing revisions for this order item
    const existingRevisions = order.costingHistory.filter(
      revision => revision.orderItemId === selectedOrderItemId
    );

    const newRevision = {
      revision: existingRevisions.length > 0 ? Math.max(...existingRevisions.map(h => h.revision)) + 1 : 1,
      date: new Date().toISOString(),
      style: selectedOrderItem.style,
      quantity: selectedOrderItem.oqnty || 0,
      item: selectedOrderItem.item,
      fabrics: fabricRows.map(f => ({ name: f.fabricCode, qty: f.qty, price: f.price })),
      trims: formData.trims,
      print: formData.print,
      embroidery: formData.embroidery,
      wash: formData.wash,
      cm: formData.cm,
      commercial: formData.commercial,
      misc: formData.misc,
      orderItemId: selectedOrderItemId
    };

    order.costingHistory.push(newRevision);
    showToast('Costing revision saved successfully!');
  };

  const handleSubmitQuotation = () => {
    if (totals.unitPrice <= 0) {
      showToast('Cannot submit quotation with zero price.', 'error');
      return;
    }

    const order = orders.find(o => o.id === currentOrder);
    if (!order || !selectedOrderItemId) {
      showToast('Order or style not selected!', 'error');
      return;
    }

    const selectedOrderItem = order.orderIntroduction?.items?.find(item => item.id === selectedOrderItemId);
    if (!selectedOrderItem) {
      showToast('Selected style not found!', 'error');
      return;
    }

    // Find existing quotation for this order and order item
    const existingQuotationIndex = priceQuotations.findIndex(
      q => q.orderId === currentOrder && q.orderItemId === selectedOrderItemId
    );
    
    if (existingQuotationIndex >= 0) {
      // Update existing quotation with revision tracking
      const existingQuotation = priceQuotations[existingQuotationIndex];
      
      // Find the first empty RP field
      if (existingQuotation.rp1 === 0) {
        existingQuotation.rp1 = totals.unitPrice;
      } else if (existingQuotation.rp2 === 0) {
        existingQuotation.rp2 = totals.unitPrice;
      } else if (existingQuotation.rp3 === 0) {
        existingQuotation.rp3 = totals.unitPrice;
      } else {
        existingQuotation.rp4 = totals.unitPrice;
      }
      
      // Update other fields
      existingQuotation.style = selectedOrderItem.style;
      existingQuotation.item = selectedOrderItem.item;
      existingQuotation.oqnty = selectedOrderItem.oqnty || 0;
      
    } else {
      // Create new quotation
      const newQuotation = {
        orderId: currentOrder,
        orderItemId: selectedOrderItemId,
        style: selectedOrderItem.style,
        item: selectedOrderItem.item,
        oqnty: selectedOrderItem.oqnty || 0,
        uPrice: totals.unitPrice,
        bp1: 0,
        rp1: totals.unitPrice,
        bp2: 0,
        rp2: 0,
        bp3: 0,
        rp3: 0,
        bp4: 0,
        rp4: 0,
        fPrice: 0,
        status: 'Pending'
      };

      priceQuotations.push(newQuotation);
    }

    showToast('Price quotation submitted!');
    
    // Notify parent component if callback provided
    if (onQuotationSubmitted) {
      onQuotationSubmitted();
    }
  };

  const loadRevision = (revisionIndex: number) => {
    const order = orders.find(o => o.id === currentOrder);
    if (!order || !selectedOrderItemId) return;

    // Filter revisions for the selected order item
    const orderItemRevisions = order.costingHistory.filter(
      revision => revision.orderItemId === selectedOrderItemId
    );

    if (!orderItemRevisions[revisionIndex]) return;

    const revision = orderItemRevisions[revisionIndex];
    setFormData({
      style: revision.style,
      item: revision.item,
      quantity: revision.quantity,
      trims: revision.trims,
      print: revision.print,
      embroidery: revision.embroidery,
      wash: revision.wash,
      cm: revision.cm,
      commercial: revision.commercial,
      misc: revision.misc
    });
    
    // Convert fabric data to new format
    const convertedFabricRows = revision.fabrics.map(f => {
      const fabricItem = stockItems.find(item => item.code === f.name || item.name === f.name);
      return {
        fabricCategory: fabricItem?.category || '',
        fabricCode: f.name,
        qty: f.qty,
        price: f.price
      };
    });
    setFabricRows(convertedFabricRows);
  };

  const getFabricCategories = () => {
    return CATEGORIES.filter(cat => cat.includes('Fabric') || cat === 'Rib');
  };

  const getFabricOptions = (category: string) => {
    return stockItems.filter(item => item.category === category);
  };

  const getFabricDisplayName = (fabricCode: string) => {
    const fabricItem = stockItems.find(item => item.code === fabricCode);
    return fabricItem ? fabricItem.name : fabricCode;
  };

  const order = orders.find(o => o.id === currentOrder);
  const selectedOrderItem = order?.orderIntroduction?.items?.find(item => item.id === selectedOrderItemId);
  const orderItemRevisions = order?.costingHistory.filter(
    revision => revision.orderItemId === selectedOrderItemId
  ) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Order
                </label>
                <select
                  value={currentOrder}
                  onChange={(e) => setCurrentOrder(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {orders.map(order => (
                    <option key={order.id} value={order.id}>
                      {order.id} - {order.buyer} - {order.style}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Style
                </label>
                <select
                  value={selectedOrderItemId || ''}
                  onChange={(e) => setSelectedOrderItemId(parseInt(e.target.value) || null)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  disabled={!order?.orderIntroduction?.items || order.orderIntroduction.items.length === 0}
                >
                  <option value="">Select Style...</option>
                  {order?.orderIntroduction?.items?.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.style} - {item.item} ({item.oqnty || 0} pcs)
                    </option>
                  ))}
                </select>
                {(!order?.orderIntroduction?.items || order.orderIntroduction.items.length === 0) && (
                  <p className="text-xs text-gray-500 mt-1">
                    No styles available. Please add styles in Order Introduction first.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  readOnly
                />
              </div>
            </div>

            {selectedOrderItem && (
              <>
                <hr className="my-4" />

                {/* Costing Details Section */}
                <div className="space-y-6">
                  <h4 className="font-semibold text-lg text-gray-800 border-b pb-2">Costing Details</h4>
                  
                  {/* Fabric Section */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-semibold text-gray-700">Fabric</h5>
                        <Button size="sm" onClick={addFabricRow}>
                          <Plus size={16} className="mr-1" />
                          Add Fabric
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {fabricRows.map((row, index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Fabric Cat.</label>
                              <select
                                value={row.fabricCategory}
                                onChange={(e) => updateFabricRow(index, 'fabricCategory', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Select Category</option>
                                {getFabricCategories().map(category => (
                                  <option key={category} value={category}>{category}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Fabric Type</label>
                              <select
                                value={row.fabricCode}
                                onChange={(e) => updateFabricRow(index, 'fabricCode', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                disabled={!row.fabricCategory}
                              >
                                <option value="">Select Type</option>
                                {getFabricOptions(row.fabricCategory).map(fabric => (
                                  <option key={fabric.code} value={fabric.code}>{fabric.name}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Qty (KG)</label>
                              <input
                                type="number"
                                step="0.01"
                                value={row.qty}
                                onChange={(e) => updateFabricRow(index, 'qty', parseFloat(e.target.value) || 0)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">Unit Price</label>
                              <input
                                type="number"
                                step="0.01"
                                value={row.price}
                                onChange={(e) => updateFabricRow(index, 'price', parseFloat(e.target.value) || 0)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="p-2 bg-gray-100 rounded-md min-w-[80px] text-center">
                                ${(row.qty * row.price).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeFabricRow(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            {row.fabricCode && (
                              <div className="md:col-span-6 text-sm text-gray-600 italic">
                                Fabric: {getFabricDisplayName(row.fabricCode)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Other Costs */}
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Other Costs</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { key: 'trims', label: 'Trims & Accessories' },
                          { key: 'print', label: 'Print' },
                          { key: 'embroidery', label: 'Embroidery' },
                          { key: 'wash', label: 'Wash' },
                          { key: 'cm', label: 'Cost Of Making (CM)' },
                          { key: 'commercial', label: 'Commercial' },
                          { key: 'misc', label: 'Misc.' }
                        ].map(({ key, label }) => (
                          <div key={key}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                            <input
                              type="number"
                              step="0.01"
                              value={formData[key as keyof typeof formData]}
                              onChange={(e) => handleInputChange(key, parseFloat(e.target.value) || 0)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Totals */}
                  <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg flex-wrap gap-4">
                    <div className="text-lg font-bold text-black">Dozen TTL: <span>${totals.dozenPrice.toFixed(2)}</span></div>
                    <div className="text-lg font-bold text-green-600">Unit: <span>${totals.unitPrice.toFixed(2)}</span></div>
                    <div className="text-lg font-bold text-orange-600">Total: <span>${totals.totalCost.toFixed(2)}</span></div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button onClick={handleSave}>Save as New Revision</Button>
                    <Button variant="success" onClick={handleSubmitQuotation}>
                      Submit Price Quotation
                    </Button>
                  </div>
                </div>
              </>
            )}

            {!selectedOrderItem && (
              <div className="text-center py-8">
                <p className="text-gray-500">Please select a style to start costing.</p>
              </div>
            )}
          </div>
        </div>

        {/* Revision History */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Revision History</h3>
            {selectedOrderItem ? (
              <div className="space-y-2">
                {orderItemRevisions.map((revision, index) => {
                  // Calculate revision total for display
                  const revisionTotal = revision.fabrics.reduce((sum, f) => sum + (f.qty * f.price), 0) + 
                    revision.trims + revision.print + revision.embroidery + revision.wash + 
                    revision.cm + revision.commercial + revision.misc;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => loadRevision(index)}
                      className="text-left w-full p-2 text-sm hover:bg-gray-100 rounded-md border"
                    >
                      <span className="font-semibold">Rev-{revision.revision}</span>
                      <span className="text-xs text-gray-500 block">
                        {new Date(revision.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-blue-600 block">
                        Dozen: ${revisionTotal.toFixed(2)}
                      </span>
                      <span className="text-xs text-green-600 block">
                        Unit: ${(revisionTotal / 12).toFixed(2)}
                      </span>
                    </button>
                  );
                })}
                {orderItemRevisions.length === 0 && (
                  <p className="text-gray-500 text-sm">No revisions yet</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Select a style to view revisions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdown;