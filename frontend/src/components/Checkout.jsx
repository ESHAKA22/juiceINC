import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { orderApi } from '../services/api';
import './Checkout.css';

const Checkout = ({ isOpen, onClose, onOrderSuccess }) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'postalCode'];
    const missingFields = requiredFields.filter(field => !customerInfo[field].trim());
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderItems = items.map(item => ({
        productId: item.product?.id || 'custom-product',
        productName: item.product?.name || 'Custom Product',
        category: item.product?.category || 'custom',
        quantity: item.quantity,
        price: item.price,
        customIngredients: item.customIngredients ? JSON.stringify(item.customIngredients) : null
      }));

      const order = {
        customerInfo,
        items: orderItems,
        totalAmount: getTotalPrice() * 1.05, 
        status: 'pending'
      };

      const response = await orderApi.create(order);
      
      clearCart();
      
      const orderId = response?.id || response?.data?.id || 'Order placed successfully';
      alert(`Order placed successfully! Order ID: ${orderId}`);
      onOrderSuccess(response || { id: orderId });
      onClose();
      
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error('Error placing order:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <div className="header-content">
            <div className="header-icon">🛒</div>
            <div className="header-text">
              <h2>Secure Checkout</h2>
              <span className="header-subtitle">Complete Your Order</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <span>×</span>
          </button>
        </div>

        <div className="checkout-content">
          <form onSubmit={handleSubmit}>
            <div className="checkout-sections">
              
              <div className="section customer-info-section">
                <div className="section-header">
                  <span className="section-icon">👤</span>
                  <h3>Customer Information</h3>
                  <div className="section-decoration"></div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">
                      <span className="label-icon">📝</span>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                    <div className="input-underline"></div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">
                      <span className="label-icon">📧</span>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                    <div className="input-underline"></div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">
                      <span className="label-icon">📱</span>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                    <div className="input-underline"></div>
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="address">
                      <span className="label-icon">🏠</span>
                      Delivery Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      required
                      placeholder="Enter your complete delivery address"
                    />
                    <div className="input-underline"></div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="city">
                      <span className="label-icon">🏙️</span>
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      required
                      placeholder="Your city"
                    />
                    <div className="input-underline"></div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="postalCode">
                      <span className="label-icon">📮</span>
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={customerInfo.postalCode}
                      onChange={handleInputChange}
                      required
                      placeholder="12345"
                    />
                    <div className="input-underline"></div>
                  </div>
                </div>
              </div>

              <div className="section order-summary-section">
                <div className="section-header">
                  <span className="section-icon">📦</span>
                  <h3>Order Summary</h3>
                  <div className="section-decoration"></div>
                </div>
                <div className="order-items">
                  {items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-image">
                        <span className="item-emoji">
                          {item.product?.category === 'fruit_salad' && '🥗'}
                          {item.product?.category === 'fruit_juice' && '🥤'}
                          {item.product?.category === 'ice_cream' && '🍦'}
                          {!item.product?.category && '🍎'}
                        </span>
                      </div>
                      <div className="item-info">
                        <h4>{item.product?.name || 'Custom Product'}</h4>
                        <p className="item-category">
                          <span className="category-badge">
                            {item.product?.category || 'Custom'}
                          </span>
                        </p>
                        {item.customIngredients && (
                          <p className="custom-ingredients">
                            <span className="custom-badge">🌟 Custom Recipe</span>
                          </p>
                        )}
                      </div>
                      <div className="item-quantity">
                        <span className="quantity-badge">Qty: {item.quantity}</span>
                      </div>
                      <div className="item-price">
                        <span className="price-value">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="order-totals">
                  <div className="total-line">
                    <span className="total-label">
                      <span className="total-icon">🧾</span>
                      Subtotal:
                    </span>
                    <span className="total-value">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="total-line">
                    <span className="total-label">
                      <span className="total-icon">📊</span>
                      Tax (5%):
                    </span>
                    <span className="total-value">${tax.toFixed(2)}</span>
                  </div>
                  <div className="total-line final-total">
                    <span className="total-label">
                      <span className="total-icon">💰</span>
                      Final Total:
                    </span>
                    <span className="total-value">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="payment-security">
                  <div className="security-badge">
                    <span className="security-icon">🔒</span>
                    <span>Secure Payment Protected</span>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="checkout-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={onClose}
                disabled={loading}
              >
                <span className="btn-icon">❌</span>
                <span className="btn-text">Cancel Order</span>
              </button>
              <button
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >
                <span className="btn-icon">
                  {loading ? '⏳' : '🚀'}
                </span>
                <span className="btn-text">
                  {loading ? 'Processing...' : 'Place Order'}
                </span>
                <div className="btn-ripple"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;