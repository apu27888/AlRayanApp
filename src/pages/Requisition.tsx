import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import StatusBadge from '../components/UI/StatusBadge';
import { useToast } from '../hooks/useToast';
import { useBranchFilter } from '../hooks/useBranchFilter';

interface Requisition {
  id: string;
  date: string;
  department: string;
  requestedBy: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'In Progress' | 'Completed';
  totalAmount: number;
  items: RequisitionItem[];
  branchId?: string;
}

interface RequisitionItem {
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const Requisition: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState<Requisition | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data for requisitions
  const [requisitions, setRequisitions] = useState<Requisition[]>([
    {
      id: 'REQ-001',
      date: '2025-01-15',
      department: 'Production',
      requestedBy: 'Abul Kalam',
      status: 'Pending',
      totalAmount: 25000,
      items: [
        { itemName: 'Sewing Thread', quantity: 100, unitPrice: 50, totalPrice: 5000 },
        { itemName: 'Buttons', quantity: 500, unitPrice: 40, totalPrice: 20000 }
      ],
      branchId: 'BR-002'
    },
    {
      id: 'REQ-002',
      date: '2025-01-14',
      department: 'Quality Control',
      requestedBy: 'Fatima Begum',
      status: 'Approved',
      totalAmount: 15000,
      items: [
        { itemName: 'Measuring Tape', quantity: 10, unitPrice: 500, totalPrice: 5000 },
        { itemName: 'Scissors', quantity: 20, unitPrice: 500, totalPrice: 10000 }
      ],
      branchId: 'BR-002'
    },
    {
      id: 'REQ-003',
      date: '2025-01-13',
      department: 'Cutting',
      requestedBy: 'Karim Uddin',
      status: 'In Progress',
      totalAmount: 45000,
      items: [
        { itemName: 'Fabric Scissors', quantity: 5, unitPrice: 2000, totalPrice: 10000 },
        { itemName: 'Cutting Table', quantity: 1, unitPrice: 35000, totalPrice: 35000 }
      ],
      branchId: 'BR-003'
    },
    {
      id: 'REQ-004',
      date: '2025-01-12',
      department: 'Maintenance',
      requestedBy: 'Shahid Hasan',
      status: 'Completed',
      totalAmount: 8000,
      items: [
        { itemName: 'Machine Oil', quantity: 4, unitPrice: 1000, totalPrice: 4000 },
        { itemName: 'Spare Parts', quantity: 2, unitPrice: 2000, totalPrice: 4000 }
      ],
      branchId: 'BR-004'
    },
    {
      id: 'REQ-005',
      date: '2025-01-11',
      department: 'Embroidery',
      requestedBy: 'Rashida Begum',
      status: 'Rejected',
      totalAmount: 12000,
      items: [
        { itemName: 'Embroidery Thread', quantity: 50, unitPrice: 200, totalPrice: 10000 },
        { itemName: 'Needles', quantity: 100, unitPrice: 20, totalPrice: 2000 }
      ],
      branchId: 'BR-005'
    },
    {
      id: 'REQ-006',
      date: '2025-01-10',
      department: 'Printing',
      requestedBy: 'Nasir Ahmed',
      status: 'Approved',
      totalAmount: 35000,
      items: [
        { itemName: 'Printing Ink', quantity: 10, unitPrice: 3000, totalPrice: 30000 },
        { itemName: 'Screen Mesh', quantity: 5, unitPrice: 1000, totalPrice: 5000 }
      ],
      branchId: 'BR-004'
    }
  ]);

  const [newRequisition, setNewRequisition] = useState({
    department: '',
    requestedBy: '',
    items: [{ itemName: '', quantity: 0, unitPrice: 0, totalPrice: 0 }]
  });

  // Filter requisitions by branch
  const filteredByBranch = useBranchFilter(requisitions);

  useEffect(() => {
    setPageTitle('Requisition Management');
  }, [setPageTitle]);

  // Filter and search logic
  const filteredRequisitions = filteredByBranch.filter(req => {
    const matchesSearch = searchTerm === '' || 
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredRequisitions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequisitions = filteredRequisitions.slice(startIndex, endIndex);

  const handleAddRequisition = () => {
    setIsAddModalOpen(true);
  };

  const handleViewRequisition = (requisition: Requisition) => {
    setSelectedRequisition(requisition);
    setIsViewModalOpen(true);
  };

  const handleEditRequisition = (id: string) => {
    showToast(`Edit functionality for ${id} will be implemented`, 'success');
  };

  const handleDeleteRequisition = (id: string) => {
    setRequisitions(prev => prev.filter(req => req.id !== id));
    showToast(`Requisition ${id} deleted successfully`, 'success');
  };

  const generateRequisitionId = () => {
    const existingIds = requisitions.map(req => {
      const match = req.id.match(/REQ-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    const maxId = Math.max(...existingIds, 0);
    return `REQ-${String(maxId + 1).padStart(3, '0')}`;
  };

  const handleSaveRequisition = () => {
    if (!newRequisition.department || !newRequisition.requestedBy) {
      showToast('Please fill in all required fields!', 'error');
      return;
    }

    const totalAmount = newRequisition.items.reduce((sum, item) => sum + item.totalPrice, 0);
    
    const requisition: Requisition = {
      id: generateRequisitionId(),
      date: new Date().toISOString().split('T')[0],
      department: newRequisition.department,
      requestedBy: newRequisition.requestedBy,
      status: 'Pending',
      totalAmount,
      items: newRequisition.items.filter(item => item.itemName && item.quantity > 0),
      branchId: 'BR-002' // Default to main garments branch
    };

    setRequisitions(prev => [requisition, ...prev]);
    setNewRequisition({
      department: '',
      requestedBy: '',
      items: [{ itemName: '', quantity: 0, unitPrice: 0, totalPrice: 0 }]
    });
    setIsAddModalOpen(false);
    showToast('Requisition created successfully!', 'success');
  };

  const addRequisitionItem = () => {
    setNewRequisition(prev => ({
      ...prev,
      items: [...prev.items, { itemName: '', quantity: 0, unitPrice: 0, totalPrice: 0 }]
    }));
  };

  const updateRequisitionItem = (index: number, field: keyof RequisitionItem, value: string | number) => {
    setNewRequisition(prev => {
      const updatedItems = [...prev.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      
      // Auto-calculate total price
      if (field === 'quantity' || field === 'unitPrice') {
        updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].unitPrice;
      }
      
      return { ...prev, items: updatedItems };
    });
  };

  const removeRequisitionItem = (index: number) => {
    setNewRequisition(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Requisition Management</h2>
          <p className="text-gray-600 mt-1">Manage department requisitions and approvals</p>
        </div>
        <Button 
          onClick={handleAddRequisition}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <Plus size={20} className="mr-2" />
          Add Requisition
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search requisitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Export Button */}
          <Button variant="secondary" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>

        {/* Results Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {currentRequisitions.length} of {filteredRequisitions.length} requisitions
          {searchTerm && ` for "${searchTerm}"`}
          {statusFilter !== 'All' && ` with status "${statusFilter}"`}
        </div>
      </div>

      {/* Requisitions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-sm text-gray-900">Requisition ID</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-900">Date</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-900">Department</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-900">Requested By</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-900">Status</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-900">Total Amount</th>
                <th className="px-6 py-4 font-semibold text-sm text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentRequisitions.length > 0 ? (
                currentRequisitions.map((requisition) => (
                  <tr key={requisition.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <span className="font-medium text-blue-600">{requisition.id}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(requisition.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{requisition.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{requisition.requestedBy}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(requisition.status)}`}>
                        {requisition.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ৳{requisition.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewRequisition(requisition)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditRequisition(requisition.id)}
                          className="text-green-600 hover:text-green-800 transition-colors p-1 rounded hover:bg-green-50"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteRequisition(requisition.id)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">No requisitions found</p>
                      <p className="text-sm mt-1">
                        {searchTerm || statusFilter !== 'All' 
                          ? 'Try adjusting your search or filter criteria'
                          : 'Create your first requisition to get started'
                        }
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredRequisitions.length)} of {filteredRequisitions.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Requisition Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Requisition"
        size="xl"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <select
                value={newRequisition.department}
                onChange={(e) => setNewRequisition(prev => ({ ...prev, department: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Department</option>
                <option value="Production">Production</option>
                <option value="Quality Control">Quality Control</option>
                <option value="Cutting">Cutting</option>
                <option value="Sewing">Sewing</option>
                <option value="Finishing">Finishing</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Embroidery">Embroidery</option>
                <option value="Printing">Printing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requested By *
              </label>
              <input
                type="text"
                value={newRequisition.requestedBy}
                onChange={(e) => setNewRequisition(prev => ({ ...prev, requestedBy: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter requester name"
                required
              />
            </div>
          </div>

          {/* Requisition Items */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Requisition Items</h4>
              <Button onClick={addRequisitionItem} variant="secondary" size="sm">
                <Plus size={16} className="mr-1" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {newRequisition.items.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Item Name</label>
                    <input
                      type="text"
                      value={item.itemName}
                      onChange={(e) => updateRequisitionItem(index, 'itemName', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter item name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateRequisitionItem(index, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Unit Price</label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateRequisitionItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Total Price</label>
                    <input
                      type="number"
                      value={item.totalPrice}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeRequisitionItem(index)}
                      className="w-full p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                      disabled={newRequisition.items.length === 1}
                    >
                      <Trash2 size={16} className="mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                <span className="text-xl font-bold text-blue-600">
                  ৳{newRequisition.items.reduce((sum, item) => sum + item.totalPrice, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button 
              variant="secondary" 
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveRequisition}>
              Create Requisition
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Requisition Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Requisition Details - ${selectedRequisition?.id}`}
        size="lg"
      >
        {selectedRequisition && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <p className="mt-1 text-sm text-gray-900">{new Date(selectedRequisition.date).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequisition.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Requested By</label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequisition.requestedBy}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequisition.status)}`}>
                    {selectedRequisition.status}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Items</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-sm font-medium text-gray-900">Item Name</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-900">Quantity</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-900">Unit Price</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-900">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedRequisition.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.itemName}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">৳{item.unitPrice.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">৳{item.totalPrice.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">Total Amount:</td>
                      <td className="px-4 py-3 text-sm font-bold text-blue-600">৳{selectedRequisition.totalAmount.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Requisition;