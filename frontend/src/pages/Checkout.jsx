import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (items.length === 0) {
    return (
      <div className="emptyContainer">
        <h2>Your cart is empty</h2>
        <button className="btn" onClick={() => navigate('/')} style={{ marginTop: '2rem' }}>
          Back to Menu
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          deliveryDetails: formData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      clearCart();
      navigate(`/order/${data.id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in checkout-container">
      <h1 className="title">Checkout</h1>
      
      <div className="layout">
        <div className="glass formContainer">
          <h2 className="sectionTitle">Delivery Details</h2>
          {error && <div className="error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="form">
            <div className="inputGroup">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                name="address"
                required
                rows="3"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, Apt 4B"
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
              />
            </div>
            <button type="submit" className="btn submitBtn" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
        
        <div className="glass summary">
          <h2 className="sectionTitle">Order Summary</h2>
          <div className="summaryItems">
            {items.map((item) => (
              <div key={item.id} className="summaryItem">
                <span className="summaryQuantity">{item.quantity}x</span>
                <span className="summaryName">{item.name}</span>
                <span className="summaryPrice">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summaryTotal">
            <span>Total to Pay:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
