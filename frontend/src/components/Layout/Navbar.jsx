import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          Crave<span className="dot">.</span>
        </Link>
        <button className="cartButton" onClick={() => setIsCartOpen(true)}>
          <span className="cartIcon">🛒</span>
          {cartCount > 0 && <span key={cartCount} className="badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}
