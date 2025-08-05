import React from 'react';
import { useCart } from '../context/CartContext';
import './ShoppingCart.css';

const ShoppingCart = ({ isOpen, onClose, onCheckout }) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>🛒 Shopping Cart ({getTotalItems()} items)</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <p>Add some delicious products to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <h3>{item.product.name}</h3>
                      <p className="item-description">{item.product.description}</p>
                      {item.customIngredients && (
                        <div className="custom-ingredients">
                          <strong>Custom Ingredients:</strong>
                          <ul>
                            {Object.entries(item.customIngredients).map(([ingredient, quantity]) => (
                              <li key={ingredient}>{ingredient}: {quantity}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {item.specialInstructions && (
                        <p className="special-instructions">
                          <strong>Special Instructions:</strong> {item.specialInstructions}
                        </p>
                      )}
                    </div>
                    
                    <div className="item-controls">
                      <div className="quantity-control">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      
                      <div className="item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="total-section">
                  <h3>Order Summary</h3>
                  <div className="total-line">
                    <span>Subtotal:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="total-line">
                    <span>Tax (5%):</span>
                    <span>${(getTotalPrice() * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="total-line total">
                    <span>Total:</span>
                    <span>${(getTotalPrice() * 1.05).toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  className="checkout-btn"
                  onClick={onCheckout}
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart; 