import React, { useState, useEffect } from 'react';
import './MenuSettings.css';

const MenuSettings = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    unit: 'lb',
    category: 'Salmon',
    minOrder: '',
    available: true
  });

  // Load menu items from localStorage
  useEffect(() => {
    const savedMenu = localStorage.getItem('reefnetMenuItems');
    if (savedMenu) {
      setMenuItems(JSON.parse(savedMenu));
    }
  }, []);

  // Save menu items to localStorage when they change
  useEffect(() => {
    localStorage.setItem('reefnetMenuItems', JSON.stringify(menuItems));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('menuItemsUpdated'));
  }, [menuItems]);

  const handleNewItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingItem(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price || !newItem.minOrder) {
      alert('Please fill in all required fields');
      return;
    }

    const item = {
      ...newItem,
      id: Date.now(),
      price: parseFloat(newItem.price),
      minOrder: parseInt(newItem.minOrder)
    };

    setMenuItems(prev => [...prev, item]);
    setNewItem({
      name: '',
      description: '',
      price: '',
      unit: 'lb',
      category: 'Salmon',
      minOrder: '',
      available: true
    });
  };

  const handleEditItem = (item) => {
    setEditingItem({ ...item });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingItem.name || !editingItem.price || !editingItem.minOrder) {
      alert('Please fill in all required fields');
      return;
    }

    setMenuItems(prev => prev.map(item => 
      item.id === editingItem.id ? {
        ...editingItem,
        price: parseFloat(editingItem.price),
        minOrder: parseInt(editingItem.minOrder)
      } : item
    ));
    setEditingItem(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleToggleAvailability = (id) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="menu-settings">
      <h2>🍽️ Menu Management</h2>
      <p>Manage your salmon club menu items, prices, and availability</p>

      {/* Add New Item Form */}
      <div className="add-item-section">
        <h3>Add New Menu Item</h3>
        <form onSubmit={handleAddItem} className="add-item-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Item Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newItem.name}
                onChange={handleNewItemChange}
                required
                placeholder="e.g., Pink Salmon - H&G"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={newItem.price}
                onChange={handleNewItemChange}
                step="0.01"
                min="0"
                required
                placeholder="4.50"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="unit">Unit</label>
              <select
                id="unit"
                name="unit"
                value={newItem.unit}
                onChange={handleNewItemChange}
              >
                <option value="lb">lb</option>
                <option value="kg">kg</option>
                <option value="piece">piece</option>
                <option value="box">box</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="minOrder">Minimum Order *</label>
              <input
                type="number"
                id="minOrder"
                name="minOrder"
                value={newItem.minOrder}
                onChange={handleNewItemChange}
                min="1"
                required
                placeholder="100"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={newItem.category}
                onChange={handleNewItemChange}
              >
                <option value="Salmon">Salmon</option>
                <option value="Roe">Roe</option>
                <option value="Processed">Processed</option>
                <option value="Specialty">Specialty</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="available" className="checkbox-label">
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={newItem.available}
                  onChange={handleNewItemChange}
                />
                Available for Order
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newItem.description}
              onChange={handleNewItemChange}
              rows="3"
              placeholder="Describe the item, its characteristics, and best uses..."
            />
          </div>

          <button type="submit" className="add-item-button">
            Add Menu Item
          </button>
        </form>
      </div>

      {/* Menu Items List */}
      <div className="menu-items-section">
        <h3>Current Menu Items</h3>
        {menuItems.length === 0 ? (
          <div className="empty-menu">
            <p>No menu items yet. Add your first item above.</p>
          </div>
        ) : (
          <div className="menu-items-list">
            {menuItems.map(item => (
              <div key={item.id} className="menu-item-card">
                {editingItem && editingItem.id === item.id ? (
                  // Edit Form
                  <form onSubmit={handleSaveEdit} className="edit-item-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={editingItem.name}
                          onChange={handleEditItemChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Price *</label>
                        <input
                          type="number"
                          name="price"
                          value={editingItem.price}
                          onChange={handleEditItemChange}
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Unit</label>
                        <select
                          name="unit"
                          value={editingItem.unit}
                          onChange={handleEditItemChange}
                        >
                          <option value="lb">lb</option>
                          <option value="kg">kg</option>
                          <option value="piece">piece</option>
                          <option value="box">box</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Min Order *</label>
                        <input
                          type="number"
                          name="minOrder"
                          value={editingItem.minOrder}
                          onChange={handleEditItemChange}
                          min="1"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          name="category"
                          value={editingItem.category}
                          onChange={handleEditItemChange}
                        >
                          <option value="Salmon">Salmon</option>
                          <option value="Roe">Roe</option>
                          <option value="Processed">Processed</option>
                          <option value="Specialty">Specialty</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="available"
                            checked={editingItem.available}
                            onChange={handleEditItemChange}
                          />
                          Available
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={editingItem.description}
                        onChange={handleEditItemChange}
                        rows="3"
                      />
                    </div>

                    <div className="edit-actions">
                      <button type="submit" className="save-button">
                        Save Changes
                      </button>
                      <button 
                        type="button" 
                        onClick={handleCancelEdit}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // Display Item
                  <div className="item-display">
                    <div className="item-header">
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <span className="price">${item.price}/{item.unit}</span>
                        <span className={`status ${item.available ? 'available' : 'unavailable'}`}>
                          {item.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <div className="item-actions">
                        <button 
                          onClick={() => handleEditItem(item)}
                          className="edit-button"
                          title="Edit item"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleToggleAvailability(item.id)}
                          className={`toggle-button ${item.available ? 'unavailable' : 'available'}`}
                          title={item.available ? 'Mark unavailable' : 'Mark available'}
                        >
                          {item.available ? '🔴' : '🟢'}
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          className="delete-button"
                          title="Delete item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    <div className="item-details">
                      <p className="description">{item.description}</p>
                      <div className="item-specs">
                        <span className="category">{item.category}</span>
                        <span className="min-order">Min: {item.minOrder} {item.unit}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuSettings; 