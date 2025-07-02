import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { employees, buyers, suppliers, buyingHouses } from '../data/mockData';
import { Buyer, BuyingHouse } from '../types';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { useToast } from '../hooks/useToast';

const People: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('employees');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'buyer' | 'employee' | 'supplier' | 'buyingHouse'>('buyer');
  const [newBuyer, setNewBuyer] = useState<Partial<Buyer>>({
    name: '',
    company: '',
    companyType: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    currency: 'USD',
    buyingHouseId: ''
  });
  const [newBuyingHouse, setNewBuyingHouse] = useState<Partial<BuyingHouse>>({
    name: '',
    locationDist: '',
    grade: '',
    contactPersonName: '',
    phone: ''
  });

  useEffect(() => {
    setPageTitle('People Management');
  }, [setPageTitle]);

  const generateNewBuyerId = () => {
    const existingIds = buyers.map(buyer => {
      const match = buyer.id.match(/B-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    const maxId = Math.max(...existingIds, 0);
    return `B-${String(maxId + 1).padStart(3, '0')}`;
  };

  const generateNewBuyingHouseId = () => {
    const existingIds = buyingHouses.map(bh => {
      const match = bh.id.match(/BH-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    const maxId = Math.max(...existingIds, 0);
    return `BH-${String(maxId + 1).padStart(3, '0')}`;
  };

  const handleAddBuyer = () => {
    setModalType('buyer');
    setIsModalOpen(true);
  };

  const handleAddBuyingHouse = () => {
    setModalType('buyingHouse');
    setIsModalOpen(true);
  };

  const handleBuyerInputChange = (field: keyof Buyer, value: string) => {
    setNewBuyer(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBuyingHouseInputChange = (field: keyof BuyingHouse, value: string) => {
    setNewBuyingHouse(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetBuyerForm = () => {
    setNewBuyer({
      name: '',
      company: '',
      companyType: '',
      contactPerson: '',
      email: '',
      phone: '',
      country: '',
      currency: 'USD',
      buyingHouseId: ''
    });
  };

  const resetBuyingHouseForm = () => {
    setNewBuyingHouse({
      name: '',
      locationDist: '',
      grade: '',
      contactPersonName: '',
      phone: ''
    });
  };

  const handleSaveBuyer = () => {
    // Validation
    if (!newBuyer.name || !newBuyer.company || !newBuyer.contactPerson || !newBuyer.email) {
      showToast('Please fill in all required fields!', 'error');
      return;
    }

    // Generate new ID and create complete buyer object
    const newBuyerId = generateNewBuyerId();
    const completeBuyer: Buyer = {
      id: newBuyerId,
      name: newBuyer.name!,
      company: newBuyer.company!,
      companyType: newBuyer.companyType || '',
      contactPerson: newBuyer.contactPerson!,
      email: newBuyer.email!,
      phone: newBuyer.phone || '',
      country: newBuyer.country || '',
      currency: newBuyer.currency || 'USD',
      buyingHouseId: newBuyer.buyingHouseId || ''
    };

    // Add to buyers array
    buyers.push(completeBuyer);

    showToast('Buyer saved successfully!');
    resetBuyerForm();
    setIsModalOpen(false);
  };

  const handleSaveBuyingHouse = () => {
    // Validation
    if (!newBuyingHouse.name || !newBuyingHouse.locationDist || !newBuyingHouse.contactPersonName) {
      showToast('Please fill in all required fields!', 'error');
      return;
    }

    // Generate new ID and create complete buying house object
    const newBuyingHouseId = generateNewBuyingHouseId();
    const completeBuyingHouse: BuyingHouse = {
      id: newBuyingHouseId,
      name: newBuyingHouse.name!,
      locationDist: newBuyingHouse.locationDist!,
      grade: newBuyingHouse.grade || '',
      contactPersonName: newBuyingHouse.contactPersonName!,
      phone: newBuyingHouse.phone || ''
    };

    // Add to buying houses array
    buyingHouses.push(completeBuyingHouse);

    showToast('Buying House saved successfully!');
    resetBuyingHouseForm();
    setIsModalOpen(false);
  };

  const tabs = [
    { id: 'employees', label: 'Employees' },
    { id: 'buyers', label: 'Buyers' },
    { id: 'buying-houses', label: 'Buying Houses' },
    { id: 'suppliers', label: 'Suppliers' },
    { id: 'external-contacts', label: 'External Contacts' }
  ];

  const filterData = (data: any[], searchFields: string[]) => {
    if (!searchTerm) return data;
    return data.filter(item =>
      searchFields.some(field =>
        item[field]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const filteredEmployees = filterData(employees, ['name', 'designation', 'department', 'phone', 'email']);
  const filteredBuyers = filterData(buyers, ['name', 'company', 'contactPerson', 'email', 'country']);
  const filteredBuyingHouses = filterData(buyingHouses, ['name', 'locationDist', 'grade', 'contactPersonName', 'phone']);
  const filteredSuppliers = filterData(suppliers, ['company', 'contactPerson', 'phone', 'email', 'productType']);

  const getBuyingHouseName = (buyingHouseId: string) => {
    const buyingHouse = buyingHouses.find(bh => bh.id === buyingHouseId);
    return buyingHouse ? buyingHouse.name : '-';
  };

  const getBuyingHouseContactPerson = (buyingHouseId: string) => {
    const buyingHouse = buyingHouses.find(bh => bh.id === buyingHouseId);
    return buyingHouse ? buyingHouse.contactPersonName : '-';
  };

  const renderEmployees = () => (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Employees</h3>
        <Button onClick={() => { setModalType('employee'); setIsModalOpen(true); }}>
          <Plus size={16} className="mr-2" />
          Add Employee
        </Button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 font-semibold text-sm">Employee ID</th>
            <th className="p-3 font-semibold text-sm">Name</th>
            <th className="p-3 font-semibold text-sm">Designation</th>
            <th className="p-3 font-semibold text-sm">Department</th>
            <th className="p-3 font-semibold text-sm">Phone</th>
            <th className="p-3 font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="border-b">
              <td className="p-3">{employee.id}</td>
              <td className="p-3">{employee.name}</td>
              <td className="p-3">{employee.designation}</td>
              <td className="p-3">{employee.department}</td>
              <td className="p-3">{employee.phone}</td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit size={16} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredEmployees.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No employees found matching "{searchTerm}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderSuppliers = () => (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Suppliers</h3>
        <Button onClick={() => { setModalType('supplier'); setIsModalOpen(true); }}>
          <Plus size={16} className="mr-2" />
          Add Supplier
        </Button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 font-semibold text-sm">Supplier ID</th>
            <th className="p-3 font-semibold text-sm">Company</th>
            <th className="p-3 font-semibold text-sm">Contact Person</th>
            <th className="p-3 font-semibold text-sm">Product Type</th>
            <th className="p-3 font-semibold text-sm">Country</th>
            <th className="p-3 font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map((supplier) => (
            <tr key={supplier.id} className="border-b">
              <td className="p-3">{supplier.id}</td>
              <td className="p-3">{supplier.company}</td>
              <td className="p-3">{supplier.contactPerson}</td>
              <td className="p-3">{supplier.productType}</td>
              <td className="p-3">{supplier.country}</td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit size={16} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredSuppliers.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No suppliers found matching "{searchTerm}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderBuyersTab = () => (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Buyers</h3>
        <Button onClick={handleAddBuyer}>
          <Plus size={16} className="mr-2" />
          Add Buyer
        </Button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 font-semibold text-sm">Buyer ID</th>
            <th className="p-3 font-semibold text-sm">Brand</th>
            <th className="p-3 font-semibold text-sm">Company Name</th>
            <th className="p-3 font-semibold text-sm">Company Type</th>
            <th className="p-3 font-semibold text-sm">Contact Person</th>
            <th className="p-3 font-semibold text-sm">Country</th>
            <th className="p-3 font-semibold text-sm">Buying House</th>
            <th className="p-3 font-semibold text-sm">Cont. Person</th>
            <th className="p-3 font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBuyers.map((buyer) => (
            <tr key={buyer.id} className="border-b">
              <td className="p-3">{buyer.id}</td>
              <td className="p-3">{buyer.name}</td>
              <td className="p-3">{buyer.company}</td>
              <td className="p-3">{buyer.companyType || '-'}</td>
              <td className="p-3">{buyer.contactPerson}</td>
              <td className="p-3">{buyer.country}</td>
              <td className="p-3">{getBuyingHouseName(buyer.buyingHouseId || '')}</td>
              <td className="p-3">{getBuyingHouseContactPerson(buyer.buyingHouseId || '')}</td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit size={16} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredBuyers.length === 0 && (
            <tr>
              <td colSpan={9} className="p-4 text-center text-gray-500">
                No buyers found matching "{searchTerm}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderBuyingHouses = () => (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Buying Houses</h3>
        <Button onClick={handleAddBuyingHouse}>
          <Plus size={16} className="mr-2" />
          Add Buying House
        </Button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 font-semibold text-sm">Name</th>
            <th className="p-3 font-semibold text-sm">Location Dist</th>
            <th className="p-3 font-semibold text-sm">Grade</th>
            <th className="p-3 font-semibold text-sm">Contact Person Name</th>
            <th className="p-3 font-semibold text-sm">Phone</th>
            <th className="p-3 font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBuyingHouses.map((buyingHouse) => (
            <tr key={buyingHouse.id} className="border-b">
              <td className="p-3">{buyingHouse.name}</td>
              <td className="p-3">{buyingHouse.locationDist}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  buyingHouse.grade === 'A+' ? 'bg-green-100 text-green-800' :
                  buyingHouse.grade === 'A' ? 'bg-blue-100 text-blue-800' :
                  buyingHouse.grade === 'B+' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {buyingHouse.grade}
                </span>
              </td>
              <td className="p-3">{buyingHouse.contactPersonName}</td>
              <td className="p-3">{buyingHouse.phone}</td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit size={16} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filteredBuyingHouses.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No buying houses found matching "{searchTerm}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderExternalContacts = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">External Contacts</h3>
        <Button>
          <Plus size={16} className="mr-2" />
          Add Contact
        </Button>
      </div>
      <p className="text-gray-500">No external contacts added yet.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Searching for: <span className="font-semibold">"{searchTerm}"</span>
          </p>
        )}
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
      {activeTab === 'employees' && renderEmployees()}
      {activeTab === 'buyers' && renderBuyersTab()}
      {activeTab === 'buying-houses' && renderBuyingHouses()}
      {activeTab === 'suppliers' && renderSuppliers()}
      {activeTab === 'external-contacts' && renderExternalContacts()}

      {/* Add Buyer Modal */}
      <Modal
        isOpen={isModalOpen && modalType === 'buyer'}
        onClose={() => {
          setIsModalOpen(false);
          resetBuyerForm();
        }}
        title="Add New Buyer"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand *
              </label>
              <input
                type="text"
                value={newBuyer.name || ''}
                onChange={(e) => handleBuyerInputChange('name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter brand name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                value={newBuyer.company || ''}
                onChange={(e) => handleBuyerInputChange('company', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter company name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Type
              </label>
              <input
                type="text"
                value={newBuyer.companyType || ''}
                onChange={(e) => handleBuyerInputChange('companyType', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Retail Chain, Fashion Retailer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person *
              </label>
              <input
                type="text"
                value={newBuyer.contactPerson || ''}
                onChange={(e) => handleBuyerInputChange('contactPerson', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter contact person"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={newBuyer.email || ''}
                onChange={(e) => handleBuyerInputChange('email', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={newBuyer.phone || ''}
                onChange={(e) => handleBuyerInputChange('phone', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                value={newBuyer.country || ''}
                onChange={(e) => handleBuyerInputChange('country', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buying House
              </label>
              <select
                value={newBuyer.buyingHouseId || ''}
                onChange={(e) => handleBuyerInputChange('buyingHouseId', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Buying House</option>
                {buyingHouses.map(bh => (
                  <option key={bh.id} value={bh.id}>{bh.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                value={newBuyer.currency || 'USD'}
                onChange={(e) => handleBuyerInputChange('currency', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="BDT">BDT</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="secondary" 
              onClick={() => {
                setIsModalOpen(false);
                resetBuyerForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveBuyer}>
              Save Buyer
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Buying House Modal */}
      <Modal
        isOpen={isModalOpen && modalType === 'buyingHouse'}
        onClose={() => {
          setIsModalOpen(false);
          resetBuyingHouseForm();
        }}
        title="Add New Buying House"
        size="md"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={newBuyingHouse.name || ''}
              onChange={(e) => handleBuyingHouseInputChange('name', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter buying house name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Dist *
            </label>
            <input
              type="text"
              value={newBuyingHouse.locationDist || ''}
              onChange={(e) => handleBuyingHouseInputChange('locationDist', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter location district"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <select
              value={newBuyingHouse.grade || ''}
              onChange={(e) => handleBuyingHouseInputChange('grade', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Grade</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person Name *
            </label>
            <input
              type="text"
              value={newBuyingHouse.contactPersonName || ''}
              onChange={(e) => handleBuyingHouseInputChange('contactPersonName', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter contact person name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={newBuyingHouse.phone || ''}
              onChange={(e) => handleBuyingHouseInputChange('phone', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter phone number"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="secondary" 
              onClick={() => {
                setIsModalOpen(false);
                resetBuyingHouseForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveBuyingHouse}>
              Save Buying House
            </Button>
          </div>
        </form>
      </Modal>

      {/* Placeholder modals for other types */}
      <Modal
        isOpen={isModalOpen && modalType === 'employee'}
        onClose={() => setIsModalOpen(false)}
        title="Add New Employee"
      >
        <p className="text-gray-500">Employee form will be implemented here.</p>
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>
            Save Employee
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isModalOpen && modalType === 'supplier'}
        onClose={() => setIsModalOpen(false)}
        title="Add New Supplier"
      >
        <p className="text-gray-500">Supplier form will be implemented here.</p>
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>
            Save Supplier
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default People;