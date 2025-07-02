import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, ArrowUp, ArrowDown, Search } from 'lucide-react';
import { stockItems, CATEGORIES } from '../data/mockData';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { useToast } from '../hooks/useToast';
import { useBranch } from '../contexts/BranchContext';
import { useBranchFilter } from '../hooks/useBranchFilter';

const Stock: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const { showToast } = useToast();
  const { currentBranch } = useBranch();
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'in' | 'out'>('add');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPageTitle('Stock Control');
  }, [setPageTitle]);

  // Branch filtered stock items
  const branchStockItems = useBranchFilter(stockItems);

  const filteredStock = branchStockItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleSearch = () => {
    // Search is already handled by the filteredStock logic
    // This function can be used for additional search actions if needed
  };

  const handleStockAction = (action: 'in' | 'out', itemCode: string) => {
    setModalType(action);
    setSelectedItem(itemCode);
    setIsModalOpen(true);
  };

  const handleSaveStock = () => {
    showToast(`Stock ${modalType === 'add' ? 'item added' : modalType === 'in' ? 'received' : 'issued'} successfully!`);
    setIsModalOpen(false);
  };

  const renderColorTable = () => (
    <table className="w-full text-left">
      <thead className="bg-gray-50">
        <tr className="border-b">
          <th className="p-3 font-semibold text-sm">Color</th>
          <th className="p-3 font-semibold text-sm">Name</th>
          <th className="p-3 font-semibold text-sm">Code</th>
        </tr>
      </thead>
      <tbody>
        {filteredStock.map((item) => (
          <tr key={item.code} className="border-b">
            <td className="p-3">
              <span 
                className="inline-block w-8 h-5 rounded border"
                style={{ backgroundColor: item.value }}
              />
            </td>
            <td className="p-3">{item.name}</td>
            <td className="p-3">{item.code}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderStockTable = () => (
    <table className="w-full text-left">
      <thead>
        <tr className="bg-gray-50">
          <th className="p-3 font-semibold text-sm">Item Code</th>
          <th className="p-3 font-semibold text-sm">Item Name</th>
          <th className="p-3 font-semibold text-sm">Category</th>
          <th className="p-3 font-semibold text-sm">Available Stock</th>
          <th className="p-3 font-semibold text-sm">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredStock.map((item) => (
          <tr key={item.code} className="border-b">
            <td className="p-3">{item.code}</td>
            <td className="p-3">{item.name}</td>
            <td className="p-3">{item.category}</td>
            <td className="p-3 font-bold">{item.stock.toLocaleString()} {item.unit}</td>
            <td className="p-3 whitespace-nowrap">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleStockAction('in', item.code)}
                >
                  <ArrowUp size={14} className="mr-1" />
                  In
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleStockAction('out', item.code)}
                >
                  <ArrowDown size={14} className="mr-1" />
                  Out
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by code, name, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button onClick={handleSearch} variant="secondary">
            <Search size={16} className="mr-2" />
            Search
          </Button>
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Searching for: <span className="font-semibold">"{searchTerm}"</span> - Found {filteredStock.length} items
          </p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex border-b">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 border-b-2 -mb-px ${
              activeCategory === 'All' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 border-b-2 -mb-px ${
                activeCategory === category 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <Button onClick={() => { setModalType('add'); setIsModalOpen(true); }}>
          <Plus size={16} className="mr-2" />
          Add New Item
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        {activeCategory === 'Color' ? renderColorTable() : renderStockTable()}
        {filteredStock.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No items found matching your search criteria.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalType === 'add' ? 'Add New Stock Item' :
          modalType === 'in' ? 'Stock In' : 'Stock Out'
        }
      >
        <form className="space-y-4">
          {modalType === 'add' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Code
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter item code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                    <option value="Yds">Yds</option>
                    <option value="Kg">Kg</option>
                    <option value="Pc">Pc</option>
                    <option value="L">L</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Code
                </label>
                <input
                  type="text"
                  value={selectedItem || ''}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter remarks"
                />
              </div>
            </>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStock}>
              {modalType === 'add' ? 'Add Item' : modalType === 'in' ? 'Stock In' : 'Stock Out'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Stock;