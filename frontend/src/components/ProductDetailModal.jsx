import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductDetailModal.css';

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = React.useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'fruit_salad': return '🥗';
      case 'fruit_juice': return '🥤';
      case 'ice_cream': return '🍦';
      default: return '🍎';
    }
  };

  const getCategoryName = (category) => {
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="product-detail-header">
          <div className="header-content">
            <div className="header-icon">{getCategoryIcon(product.category)}</div>
            <div className="header-text">
              <h2>{product.name}</h2>
              <span className="header-subtitle">Premium Quality Product</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <span>×</span>
          </button>
        </div>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <div className="image-container">
              <div className="product-detail-placeholder">
                {getCategoryIcon(product.category)}
              </div>
              <div className="floating-elements">
                <div className="floating-circle circle-1"></div>
                <div className="floating-circle circle-2"></div>
                <div className="floating-circle circle-3"></div>
              </div>
            </div>
            <div className="product-category-badge">
              <span className="badge-icon">{getCategoryIcon(product.category)}</span>
              {getCategoryName(product.category)}
            </div>
          </div>

          <div className="product-detail-info">
            <div className="info-section product-description">
              <div className="section-header">
                <span className="section-icon">📝</span>
                <h3>Description</h3>
              </div>
              <p>{product.description}</p>
            </div>

            <div className="info-section product-ingredients">
              <div className="section-header">
                <span className="section-icon">🌱</span>
                <h3>Fresh Ingredients</h3>
              </div>
              <div className="ingredients-list">
                {product.ingredients.map((ingredient, index) => (
                  <span key={index} className="ingredient-tag">
                    <span className="ingredient-icon">🍃</span>
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-section product-price-section">
              <div className="price-display">
                <span className="price-label">💰 Price:</span>
                <span className="price-value">${product.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="info-section quantity-section">
              <div className="section-header">
                <span className="section-icon">🔢</span>
                <h3>Quantity</h3>
              </div>
              <div className="quantity-control">
                <button 
                  className="quantity-btn decrease"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <span>−</span>
                </button>
                <div className="quantity-display">
                  <span className="quantity-number">{quantity}</span>
                  <span className="quantity-label">items</span>
                </div>
                <button 
                  className="quantity-btn increase"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <span>+</span>
                </button>
              </div>
            </div>

            <div className="total-section">
              <div className="total-content">
                <span className="total-label">
                  <span className="total-icon">🧾</span>
                  Total Amount:
                </span>
                <span className="total-value">${(product.price * quantity).toFixed(2)}</span>
              </div>
              <div className="savings-badge">
                <span>💝 Fresh & Healthy Choice!</span>
              </div>
            </div>

            <button 
              className="add-to-cart-detail-btn"
              onClick={handleAddToCart}
            >
              <span className="btn-icon">🛒</span>
              <span className="btn-text">Add {quantity} to Cart</span>
              <div className="btn-ripple"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;