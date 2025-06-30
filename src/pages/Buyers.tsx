import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { buyers } from '../data/mockData';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import { useToast } from '../hooks/useToast';
import { Buyer } from '../types';
import { useBranchFilter } from '../hooks/useBranchFilter';
import { useBranch } from '../contexts/BranchContext';

const Buyers: React.FC = () => {
  const { setPageTitle } = useOutletContext<{ setPageTitle: (title: string) => void }>();
  const { showToast } = useToast();
  const { currentBranch } = useBranch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBuyer, setNewBuyer] = useState<Partial<Buyer>>({
    name: '',
    company: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    currency: 'USD'
  });

  useEffect(() => {
    setPageTitle('Buyer Management');
  }, [setPageTitle]);

  // Filter buyers by current branch
  const filteredBuyers = useBranchFilter(buyers);

  const generateNewBuyerId = () => {
    const existingIds = buyers.map(buyer => {
      const match = buyer.id.match(/B-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    const maxId = Math.max(...existingIds, 0);
    return `B-${String(maxId + 1).padStart(3, '0')}`;
  };

  const handleAddBuyer = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (field: keyof Buyer, value: string) => {
    setNewBuyer(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setNewBuyer({
      name: '',
      company: '',
      contactPerson: '',
      email: '',
      phone: '',
      country: '',
      currency: 'USD'
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
      contactPerson: newBuyer.contactPerson!,
      email: newBuyer.email!,
      phone: newBuyer.phone || '',
      country: newBuyer.country || '',
      currency: newBuyer.currency || 'USD',
      branchId: currentBranch?.id // Assign current branch ID
    };

    // Add to buyers array
    buyers.push(completeBuyer);

    showToast('Buyer saved successfully!');
    resetForm();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Buyer Management</h2>
        <Button onClick={handleAddBuyer}>
          <Plus size={16} className="mr-2" />
          Add New Buyer
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 font-semibold text-sm">Buyer ID</th>
              <th className="p-3 font-semibold text-sm">Name</th>
              <th className="p-3 font-semibold text-sm">Company</th>
              <th className="p-3 font-semibold text-sm">Contact Person</th>
              <th className="p-3 font-semibold text-sm">Email</th>
              <th className="p-3 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuyers.map((buyer) => (
              <tr key={buyer.id} className="border-b">
                <td className="p-3">{buyer.id}</td>
                <td className="p-3">{buyer.name}</td>
                <td className="p-3">{buyer.company}</td>
                <td className="p-3">{buyer.contactPerson}</td>
                <td className="p-3">{buyer.email}</td>
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
          </tbody>
        </table>
        {filteredBuyers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No buyers found for the selected branch.</p>
            <p className="text-sm text-gray-400 mt-2">Add a new buyer to get started.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title="Add New Buyer"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buyer Name *
              </label>
              <input
                type="text"
                value={newBuyer.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter buyer name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                value={newBuyer.company || ''}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter company name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person *
              </label>
              <input
                type="text"
                value={newBuyer.contactPerson || ''}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
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
                onChange={(e) => handleInputChange('email', e.target.value)}
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
                onChange={(e) => handleInputChange('phone', e.target.value)}
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
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                value={newBuyer.currency || 'USD'}
                onChange={(e) => handleInputChange('currency', e.target.value)}
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
                resetForm();
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
    </div>
  );
};

export default Buyers;