import React from 'react';
import { useCart } from '../../context/CartContext';
import './MenuItem.css';

export default function MenuItem({ item }) {
  const { addItem } = useCart();

  return (
    <div className="menu-card">
      <div className="imageWrapper">
        <img src={item.image} alt={item.name} className="food-image" />
      </div>
      <div className="content">
        <h3 className="item-title">{item.name}</h3>
        <p className="description">{item.description}</p>
        <div className="bottom-row">
          <span className="priceTag">${item.price.toFixed(2)}</span>
          <button className="btn addButton" onClick={() => addItem(item)}>
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}
