import React, { useState, useEffect } from 'react';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('reefnetOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage when they change
  useEffect(() => {
    localStorage.setItem('reefnetOrders', JSON.stringify(orders));
  }, [orders]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const deleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(prev => prev.filter(order => order.id !== orderId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f6ad55';
      case 'confirmed': return '#4299e1';
      case 'shipped': return '#9f7aea';
      case 'delivered': return '#48bb78';
      case 'cancelled': return '#f56565';
      default: return '#718096';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      case 'shipped': return '📦';
      case 'delivered': return '🎉';
      case 'cancelled': return '❌';
      default: return '❓';
    }
  };

  const filteredOrders = orders
    .filter(order => {
      if (filterStatus !== 'all' && order.status !== filterStatus) return false;
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          order.customerInfo.name.toLowerCase().includes(searchLower) ||
          order.customerInfo.email.toLowerCase().includes(searchLower) ||
          order.orderNumber.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const getTotalRevenue = () => {
    return orders
      .filter(order => order.status !== 'cancelled')
      .reduce((total, order) => total + order.total, 0);
  };

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status).length;
  };

  return (
    <div className="order-management">
      <h2>📋 Order Management</h2>
      <p>View and manage customer orders from the salmon club</p>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">${getTotalRevenue().toFixed(2)}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{getOrdersByStatus('pending')}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{getOrdersByStatus('delivered')}</div>
          <div className="stat-label">Delivered</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by customer name, email, or order number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="status-filter">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-container">
        {filteredOrders.length === 0 ? (
          <div className="empty-orders">
            <p>No orders found matching your criteria.</p>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h4>{order.orderNumber}</h4>
                    <p className="customer-name">{order.customerInfo.name}</p>
                    <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="order-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusIcon(order.status)} {order.status}
                    </span>
                    <div className="order-total">${order.total.toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="order-items">
                  <h5>Items:</h5>
                  <div className="items-list">
                    {order.items.map((item, index) => (
                      <div key={index} className="item-summary">
                        <span>{item.name}</span>
                        <span>{item.quantity} {item.unit}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-actions">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="view-details-button"
                  >
                    View Details
                  </button>
                  <div className="status-actions">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="status-update-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button 
                      onClick={() => deleteOrder(order.id)}
                      className="delete-order-button"
                      title="Delete order"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="order-modal" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details - {selectedOrder.orderNumber}</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="customer-details">
                <h4>Customer Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <strong>Name:</strong> {selectedOrder.customerInfo.name}
                  </div>
                  <div className="detail-item">
                    <strong>Email:</strong> {selectedOrder.customerInfo.email}
                  </div>
                  <div className="detail-item">
                    <strong>Phone:</strong> {selectedOrder.customerInfo.phone}
                  </div>
                  <div className="detail-item">
                    <strong>Address:</strong> {selectedOrder.customerInfo.address}
                  </div>
                  <div className="detail-item">
                    <strong>City:</strong> {selectedOrder.customerInfo.city}, {selectedOrder.customerInfo.state} {selectedOrder.customerInfo.zipCode}
                  </div>
                </div>
              </div>

              <div className="order-details">
                <h4>Order Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <strong>Order Date:</strong> {new Date(selectedOrder.date).toLocaleString()}
                  </div>
                  <div className="detail-item">
                    <strong>Status:</strong> 
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
                    >
                      {getStatusIcon(selectedOrder.status)} {selectedOrder.status}
                    </span>
                  </div>
                  <div className="detail-item">
                    <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="items-details">
                <h4>Order Items</h4>
                <div className="items-table">
                  <div className="table-header">
                    <div>Item</div>
                    <div>Quantity</div>
                    <div>Price</div>
                    <div>Total</div>
                  </div>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="table-row">
                      <div>{item.name}</div>
                      <div>{item.quantity} {item.unit}</div>
                      <div>${item.price}/{item.unit}</div>
                      <div>${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="order-notes">
                  <h4>Order Notes</h4>
                  <p>{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="close-button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement; 