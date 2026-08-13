import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Layout/Navbar';
import CartDrawer from './components/Cart/CartDrawer';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<OrderTracking />} />
          </Routes>
        </main>
        <CartDrawer />
      </Router>
    </CartProvider>
  );
}

export default App;
