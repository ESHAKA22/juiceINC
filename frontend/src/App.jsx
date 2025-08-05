import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';
import CustomProductBuilder from './components/CustomProductBuilder';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import { CartProvider, useCart } from './context/CartContext';
import logoImage from './images/JUICEBARlOGO(1).png';
import './App.css';

function AppContent() {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOrderSuccess = (orderData) => {
    console.log('Order placed successfully:', orderData);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
                           <div className="nav-container">
                   <Link to="/" className="nav-logo">
                     <img src={logoImage} alt="Juices INC Logo" className="logo-image" />
                   </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Products</Link>
              <Link to="/custom-builder" className="nav-link">Custom Builder</Link>
              <button 
                className="cart-btn"
                onClick={() => setIsCartOpen(true)}
              >
                🛒 Cart ({getTotalItems()})
              </button>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductCatalog />} />
            <Route path="/custom-builder" element={<CustomProductBuilder />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2024 Juices INC. All rights reserved.</p>
          </div>
        </footer>

        <ShoppingCart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <Checkout 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      </div>
    </Router>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App; 