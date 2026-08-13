import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div className="overlay" onClick={() => setIsCartOpen(false)} />
      <div className="drawer">
        <div className="drawer-header">
          <h2>Your Cart</h2>
          <button className="closeBtn" onClick={() => setIsCartOpen(false)}>×</button>
        </div>
        
        <div className="drawer-content">
          {items.length === 0 ? (
            <div className="empty-cart">Your cart is empty.</div>
          ) : (
            <ul className="itemList">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="itemInfo">
                    <h4>{item.name}</h4>
                    <p className="price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    <button className="removeBtn" onClick={() => removeItem(item.id)}>🗑️</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="total">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn" style={{ width: '100%' }} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
