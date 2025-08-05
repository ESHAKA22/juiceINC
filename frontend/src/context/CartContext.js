import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        item.product.id === action.payload.product.id && 
        !item.customIngredients
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.product.id && !item.customIngredients
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      }

    case 'ADD_CUSTOM_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  });

  const addToCart = (product, quantity = 1) => {
    const cartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity,
      price: product.price
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  const addCustomToCart = (customProduct) => {
    const cartItem = {
      id: `custom-${Date.now()}`,
      product: {
        id: `custom-${Date.now()}`,
        name: customProduct.name,
        description: `Custom ${customProduct.type ? customProduct.type.replace('_', ' ') : 'product'}`,
        category: customProduct.type || 'custom',
        price: customProduct.totalPrice,
        ingredients: Object.keys(customProduct.ingredients),
        available: true
      },
      quantity: 1,
      price: customProduct.totalPrice,
      customIngredients: customProduct.ingredients,
      specialInstructions: customProduct.specialInstructions
    };
    dispatch({ type: 'ADD_CUSTOM_TO_CART', payload: cartItem });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      addCustomToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 