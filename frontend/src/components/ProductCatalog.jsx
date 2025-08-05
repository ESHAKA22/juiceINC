import React, { useState, useEffect } from 'react';
import { productApi } from '../services/api';
import { useCart } from '../context/CartContext';
import ProductDetailModal from './ProductDetailModal';
import Notification from './Notification';
import './ProductCatalog.css';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [notification, setNotification] = useState({ isVisible: false, message: '', type: 'success' });
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productApi.getAll();
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
      console.error('Error fetching products:', err);
    }
  };

  const categories = [
    { id: 'all', name: 'All Products', icon: '🍎' },
    { id: 'fruit_salad', name: 'Fruit Salads', icon: '🥗' },
    { id: 'fruit_juice', name: 'Fruit Juices', icon: '🥤' },
    { id: 'ice_cream', name: 'Ice Creams', icon: '🍦' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? (Array.isArray(products) ? products : [])
    : (Array.isArray(products) ? products.filter(product => product.category === selectedCategory) : []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleAddToCartFromModal = (product, quantity) => {
    addToCart(product, quantity);
    setNotification({
      isVisible: true,
      message: `${quantity} ${quantity === 1 ? 'item' : 'items'} of "${product.name}" added to cart!`,
      type: 'success'
    });
  };

  const closeNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };

  if (loading) {
    return (
      <div className="product-catalog">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-catalog">
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={fetchProducts}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-catalog">
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {Array.isArray(filteredProducts) && filteredProducts.map(product => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
            <div className="product-image">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} />
              ) : (
                <div className="product-placeholder">
                  {product.category === 'fruit_salad' && '🥗'}
                  {product.category === 'fruit_juice' && '🥤'}
                  {product.category === 'ice_cream' && '🍦'}
                </div>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <div className="ingredients">
                <strong>Ingredients:</strong> {Array.isArray(product.ingredients) ? product.ingredients.join(', ') : 'N/A'}
              </div>
              <div className="price">${(product.price || 0).toFixed(2)}</div>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                  setNotification({
                    isVisible: true,
                    message: `"${product.name}" added to cart!`,
                    type: 'success'
                  });
                }}
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCartFromModal}
      />

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </div>
  );
};

export default ProductCatalog;