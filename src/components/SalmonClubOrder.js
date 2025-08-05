import React, { useState, useEffect } from 'react';
import './SalmonClubOrder.css';

const SalmonClubOrder = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Load menu items from localStorage
  useEffect(() => {
    const loadMenuItems = () => {
      const savedMenu = localStorage.getItem('reefnetMenuItems');
      if (savedMenu) {
        setMenuItems(JSON.parse(savedMenu));
      } else {
        // Default menu items if none exist
        setMenuItems([
          {
            id: 1,
            name: 'Pink Salmon - H&G',
            description: 'Fresh reefnet-caught Pink Salmon, headed and gutted',
            price: 4.50,
            unit: 'lb',
            category: 'Salmon',
            available: true,
            minOrder: 100
          },
          {
            id: 2,
            name: 'Coho Salmon - H&G',
            description: 'Premium Coho Salmon with rich flavor and firm texture',
            price: 8.75,
            unit: 'lb',
            category: 'Salmon',
            available: true,
            minOrder: 50
          },
          {
            id: 3,
            name: 'Keta Salmon - H&G',
            description: 'Lean Keta Salmon perfect for smoking and processing',
            price: 3.25,
            unit: 'lb',
            category: 'Salmon',
            available: true,
            minOrder: 100
          },
          {
            id: 4,
            name: 'Pink Salmon Roe',
            description: 'Premium salmon roe, salt-cured and flash-frozen',
            price: 15.00,
            unit: 'lb',
            category: 'Roe',
            available: true,
            minOrder: 10
          }
        ]);
      }
    };

    loadMenuItems();

    // Listen for storage changes to update menu items in real-time
    const handleStorageChange = (e) => {
      if (e.key === 'reefnetMenuItems') {
        loadMenuItems();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events for same-tab updates
    const handleMenuUpdate = () => {
      loadMenuItems();
    };
    
    window.addEventListener('menuItemsUpdated', handleMenuUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('menuItemsUpdated', handleMenuUpdate);
    };
  }, []);

  // Save menu items to localStorage when they change
  useEffect(() => {
    localStorage.setItem('reefnetMenuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== itemId));
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate minimum orders
    const invalidItems = cart.filter(item => {
      const menuItem = menuItems.find(mi => mi.id === item.id);
      return menuItem && item.quantity < menuItem.minOrder;
    });

    if (invalidItems.length > 0) {
      alert(`Some items don't meet minimum order requirements. Please check quantities.`);
      setIsSubmitting(false);
      return;
    }

    const order = {
      id: Date.now(),
      customerInfo,
      items: cart,
      total: getCartTotal(),
      notes: orderNotes,
      status: 'pending',
      date: new Date().toISOString(),
      orderNumber: `ORD-${Date.now()}`
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('reefnetOrders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('reefnetOrders', JSON.stringify(existingOrders));

    // Send email notification (simplified for demo)
    try {
      const emailData = {
        to: 'roger.kubalek@gmail.com',
        subject: `New Salmon Club Order - ${order.orderNumber}`,
        body: `
New Salmon Club Order

Order Number: ${order.orderNumber}
Date: ${new Date().toLocaleString()}

Customer Information:
Name: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}
City: ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}

Order Items:
${cart.map(item => `- ${item.name}: ${item.quantity} ${item.unit} @ $${item.price}/${item.unit}`).join('\n')}

Total: $${getCartTotal().toFixed(2)}

Notes: ${orderNotes || 'None'}
        `.trim()
      };

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '2642fe5b-689d-415f-82b0-56cbf7769776',
          ...emailData
        })
      });
    } catch (error) {
      console.error('Error sending order notification:', error);
    }

    setOrderSubmitted(true);
    setCart([]);
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    });
    setOrderNotes('');
    setIsSubmitting(false);
  };

  if (orderSubmitted) {
    return (
      <div className="salmon-club-order">
        <div className="order-success">
          <h2>🎉 Order Submitted Successfully!</h2>
          <p>Thank you for your order. We'll contact you within 24 hours to confirm details and arrange delivery.</p>
          <button 
            onClick={() => setOrderSubmitted(false)}
            className="new-order-button"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="salmon-club-order">
      <div className="order-header">
        <h1>🐟 Salmon Club Order</h1>
        <p>Browse our premium reefnet-caught salmon and place your order</p>
        <button 
          onClick={() => {
            const savedMenu = localStorage.getItem('reefnetMenuItems');
            if (savedMenu) {
              setMenuItems(JSON.parse(savedMenu));
            }
          }}
          className="refresh-menu-button"
          title="Refresh menu items"
        >
          🔄 Refresh Menu
        </button>
      </div>

      <div className="order-container">
        <div className="menu-section">
          <h2>Available Products</h2>
          <div className="menu-grid">
            {menuItems.filter(item => item.available).map(item => (
              <div key={item.id} className="menu-item">
                <div className="item-header">
                  <h3>{item.name}</h3>
                  <span className="price">${item.price}/{item.unit}</span>
                </div>
                <p className="description">{item.description}</p>
                <div className="item-details">
                  <span className="min-order">Min Order: {item.minOrder} {item.unit}</span>
                  <span className="category">{item.category}</span>
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  className="add-to-cart-button"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-section">
          <h2>Your Order</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <p>Add items from the menu to get started</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>${item.price}/{item.unit}</p>
                    </div>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-total">
                <h3>Total: ${getCartTotal().toFixed(2)}</h3>
              </div>

              <form onSubmit={handleSubmitOrder} className="order-form">
                <h3>Customer Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={customerInfo.state}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={customerInfo.zipCode}
                      onChange={handleCustomerInfoChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="orderNotes">Order Notes</label>
                  <textarea
                    id="orderNotes"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    rows="3"
                    placeholder="Special instructions, delivery preferences, or additional information..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="submit-order-button"
                  disabled={isSubmitting || cart.length === 0}
                >
                  {isSubmitting ? 'Submitting Order...' : 'Submit Order'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalmonClubOrder; 