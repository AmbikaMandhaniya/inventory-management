import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  Edit2, 
  Trash2, 
  Filter, 
  ArrowUpDown, 
  CheckCircle2,
  XCircle 
} from 'lucide-react';

const AdvancedInventoryManagement = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'MacBook Pro', category: 'Electronics', quantity: 15, price: 1999.99, supplier: 'Apple Inc.' },
    { id: 2, name: 'Ergonomic Chair', category: 'Furniture', quantity: 8, price: 549.99, supplier: 'Herman Miller' },
    { id: 3, name: '4K Monitor', category: 'Electronics', quantity: 5, price: 599.99, supplier: 'Dell' },
    { id: 4, name: 'Mechanical Keyboard', category: 'Electronics', quantity: 20, price: 129.99, supplier: 'Razer' }
  ]);

  const [newItem, setNewItem] = useState({
    name: '', category: '', quantity: 0, price: 0, supplier: ''
  });

  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'quantity', direction: 'ascending' });
  const [editingItem, setEditingItem] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category) {
      showNotification('Please fill all required fields', 'error');
      return;
    }
    
    const itemToAdd = {
      ...newItem,
      id: Date.now()
    };

    setInventory([...inventory, itemToAdd]);
    setNewItem({ name: '', category: '', quantity: 0, price: 0, supplier: '' });
    showNotification('Item added successfully');
  };

  const handleDeleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
    showNotification('Item deleted successfully');
  };

  const sortedInventory = [...inventory]
    .sort((a, b) => {
      const key = sortConfig.key;
      return sortConfig.direction === 'ascending'
        ? a[key] - b[key]
        : b[key] - a[key];
    })
    .filter(item => 
      item.category.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Notification System */}
        {notification && (
          <div className={`
            fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg
            ${notification.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'}
          `}>
            {notification.type === 'success' 
              ? <CheckCircle2 className="inline mr-2" /> 
              : <XCircle className="inline mr-2" />}
            {notification.message}
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h1 className="text-4xl font-extrabold text-center text-white">
            Dynamic Inventory Management Table
          </h1>
        </div>

        {/* Item Input Section */}
        <div className="p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input 
              type="text" 
              placeholder="Item Name" 
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              className="border-2 border-blue-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input 
              type="text" 
              placeholder="Category" 
              value={newItem.category}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              className="border-2 border-blue-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input 
              type="number" 
              placeholder="Quantity" 
              value={newItem.quantity}
              onChange={(e) => setNewItem({...newItem, quantity: Number(e.target.value)})}
              className="border-2 border-blue-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input 
              type="text" 
              placeholder="Supplier" 
              value={newItem.supplier}
              onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
              className="border-2 border-blue-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <button 
              onClick={handleAddItem}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <PlusCircle className="mr-2" /> Add Item
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="px-6 py-4 bg-gray-100">
          <input 
            type="text" 
            placeholder="Filter by Category" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full border-2 border-blue-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Quantity</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Supplier</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedInventory.map(item => (
                <tr 
                  key={item.id} 
                  className={`
                    ${item.quantity < 10 
                      ? 'bg-red-50 text-red-900' 
                      : 'hover:bg-gray-100'}
                    border-b
                  `}
                >
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">
                    {item.quantity}
                    {item.quantity < 10 && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Low Stock
                      </span>
                    )}
                  </td>
                  <td className="p-4">${item.price.toFixed(2)}</td>
                  <td className="p-4">{item.supplier}</td>
                  <td className="p-4 flex space-x-2">
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdvancedInventoryManagement;