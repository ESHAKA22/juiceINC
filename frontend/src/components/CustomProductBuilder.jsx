import React, { useState, useEffect, useCallback } from 'react';
import { rawMaterialApi, customProductApi } from '../services/api';
import { useCart } from '../context/CartContext';
import Notification from './Notification';
import './CustomProductBuilder.css';

const CustomProductBuilder = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('salad');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ isVisible: false, message: '', type: 'success' });
  const [filterCategory, setFilterCategory] = useState('all');
  const { addCustomToCart } = useCart();

  const productTypes = [
    {
      id: 'salad',
      name: 'Custom Fruit Salad',
      icon: '🥗',
      description: 'Create your perfect fruit salad with fresh ingredients'
    },
    {
      id: 'juice',
      name: 'Custom Fruit Juice',
      icon: '🍹',
      description: 'Blend your favorite fruits into a refreshing juice'
    }
  ];

  const calculateTotalPrice = useCallback(() => {
    let total = 0;
    Object.entries(selectedIngredients).forEach(([ingredientId, quantity]) => {
      const ingredient = ingredients.find(ing => ing.id === ingredientId);
      if (ingredient && quantity > 0) {
        total += ingredient.unitPrice * quantity;
      }
    });
    setTotalPrice(total);
  }, [selectedIngredients, ingredients]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice]);

  const fetchIngredients = async () => {
    try {
      console.log('Fetching ingredients...');
      const data = await rawMaterialApi.getAll();
      console.log('Ingredients data:', data);
      setIngredients(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch ingredients');
      setLoading(false);
      console.error('Error fetching ingredients:', err);
    }
  };

  const handleIngredientQuantityChange = (ingredientId, newQuantity) => {
    console.log('Ingredient quantity change:', ingredientId, newQuantity);
    
    if (newQuantity <= 0) {
      const updatedIngredients = { ...selectedIngredients };
      delete updatedIngredients[ingredientId];
      setSelectedIngredients(updatedIngredients);
    } else {
      
      setSelectedIngredients({
        ...selectedIngredients,
        [ingredientId]: newQuantity
      });
    }
  };

  const removeIngredient = (ingredientId) => {
    const updatedIngredients = { ...selectedIngredients };
    delete updatedIngredients[ingredientId];
    setSelectedIngredients(updatedIngredients);
  };

  const getFilteredIngredients = () => {
    if (filterCategory === 'all') {
      return ingredients;
    }
    return ingredients.filter(ingredient => ingredient.category === filterCategory);
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(ingredients.map(ing => ing.category))];
    return categories.filter(category => category && category.trim() !== '');
  };

  const hasSelectedIngredients = () => {
    return Object.values(selectedIngredients).some(quantity => quantity > 0);
  };

  const handleAddToCart = () => {
    if (!productName.trim()) {
      setNotification({
        isVisible: true,
        message: 'Please enter a product name',
        type: 'error'
      });
      return;
    }

    if (!hasSelectedIngredients()) {
      setNotification({
        isVisible: true,
        message: 'Please select at least one ingredient',
        type: 'error'
      });
      return;
    }

    const customProduct = {
      name: productName,
      type: productType,
      ingredients: selectedIngredients,
      totalPrice,
      specialInstructions
    };

    addCustomToCart(customProduct);
    setNotification({
      isVisible: true,
      message: `Custom "${productName}" added to cart! Click the cart icon to view your items.`,
      type: 'success'
    });

    setProductName('');
    setSelectedIngredients({});
    setSpecialInstructions('');
    setTotalPrice(0);
  };

  const handleCreateCustomProduct = async () => {
    if (!productName.trim()) {
      setNotification({
        isVisible: true,
        message: 'Please enter a product name',
        type: 'error'
      });
      return;
    }

    if (!hasSelectedIngredients()) {
      setNotification({
        isVisible: true,
        message: 'Please select at least one ingredient',
        type: 'error'
      });
      return;
    }

    try {
      const customProduct = {
        name: productName,
        type: productType,
        ingredients: selectedIngredients,
        totalPrice,
        specialInstructions
      };

      await customProductApi.create(customProduct);
      setNotification({
        isVisible: true,
        message: 'Custom product created successfully!',
        type: 'success'
      });

      setProductName('');
      setSelectedIngredients({});
      setSpecialInstructions('');
      setTotalPrice(0);
    } catch (err) {
      setNotification({
        isVisible: true,
        message: 'Failed to create custom product',
        type: 'error'
      });
      console.error('Error creating custom product:', err);
    }
  };

  if (loading) {
    return (
      <div className="custom-product-builder">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading fresh ingredients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="custom-product-builder">
        <div className="error-container">
          <p>Error: {error}</p>
          <button onClick={fetchIngredients}>Try Again</button>
        </div>
      </div>
    );
  }

  const filteredIngredients = getFilteredIngredients();
  const categories = getUniqueCategories();

  return (
    <div className="custom-product-builder">
      <div className="page-header">
        <h1 className="page-title">🍹 Custom Product Builder</h1>
        <p className="page-subtitle">Create your perfect fruit salad or juice with fresh ingredients</p>
      </div>
      
      <div className="builder-container">
        <div className="product-type-selector">
          <h3>Choose Product Type</h3>
          <div className="product-type-options">
            {productTypes.map(type => (
              <div
                key={type.id}
                className={`product-type-option ${productType === type.id ? 'active' : ''}`}
                onClick={() => setProductType(type.id)}
              >
                <span className="product-type-icon">{type.icon}</span>
                <div className="product-type-name">{type.name}</div>
                <div className="product-type-description">{type.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="ingredients-section">
          <div className="ingredients-header">
            <h3>Select Ingredients</h3>
            <div className="ingredients-filter">
              <button
                className={`filter-btn ${filterCategory === 'all' ? 'active' : ''}`}
                onClick={() => setFilterCategory('all')}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${filterCategory === category ? 'active' : ''}`}
                  onClick={() => setFilterCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="ingredients-grid">
            {filteredIngredients.map(ingredient => {
              const currentQuantity = selectedIngredients[ingredient.id] || 0;
              return (
                <div key={ingredient.id} className="ingredient-card">
                  <div className="ingredient-header">
                    <div className="ingredient-info">
                      <div className="ingredient-name">{ingredient.name}</div>
                      <div className="ingredient-price">
                        ${(ingredient.unitPrice || 0).toFixed(2)} per {ingredient.unit || 'piece'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="ingredient-description">
                    {ingredient.description || 'Fresh and delicious ingredient'}
                  </div>
                  
                  <div className="ingredient-controls">
                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => handleIngredientQuantityChange(ingredient.id, currentQuantity - 1)}
                        disabled={currentQuantity <= 0}
                      >
                        -
                      </button>
                      <span className="quantity-display">{currentQuantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleIngredientQuantityChange(ingredient.id, currentQuantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      className={`add-btn ${currentQuantity > 0 ? 'active' : ''}`}
                      onClick={() => handleIngredientQuantityChange(ingredient.id, currentQuantity + 1)}
                    >
                      {currentQuantity > 0 ? 'Added' : 'Add'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          
          <div className="product-details">
            <div className="form-group">
              <label>Product Name:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter your custom product name"
              />
            </div>
            
            <div className="form-group">
              <label>Special Instructions:</label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special instructions or preferences..."
                rows={3}
              />
            </div>
          </div>
          
          <div className="selected-ingredients">
            <h4>Selected Ingredients:</h4>
            {Object.entries(selectedIngredients)
              .filter(([_, quantity]) => quantity > 0)
              .map(([ingredientId, quantity]) => {
                const ingredient = ingredients.find(ing => ing.id === ingredientId);
                return (
                  <div key={ingredientId} className="selected-ingredient">
                    <span>{ingredient?.name || 'Unknown'}</span>
                    <div className="ingredient-quantity">
                      <span className="quantity-badge">{quantity}</span>
                      <button
                        className="remove-ingredient"
                        onClick={() => removeIngredient(ingredientId)}
                        title="Remove ingredient"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })}
            {!hasSelectedIngredients() && (
              <p style={{ color: '#718096', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>
                No ingredients selected yet. Choose from the ingredients above!
              </p>
            )}
          </div>
          
          <div className="total-price">
            <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
          </div>
          
          <div className="action-buttons">
            <button
              className="create-product-btn"
              onClick={handleCreateCustomProduct}
              disabled={!hasSelectedIngredients() || !productName.trim()}
            >
              Create Custom Product
            </button>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!hasSelectedIngredients() || !productName.trim()}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification({ ...notification, isVisible: false })}
      />
    </div>
  );
};

export default CustomProductBuilder;