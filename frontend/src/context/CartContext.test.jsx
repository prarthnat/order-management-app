import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

const TestComponent = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  
  return (
    <div>
      <div data-testid="count">{cartCount}</div>
      <div data-testid="total">{cartTotal}</div>
      <div data-testid="items-length">{items.length}</div>
      <button onClick={() => addItem({ id: '1', name: 'Pizza', price: 10 })}>Add Pizza</button>
      <button onClick={() => updateQuantity('1', 3)}>Update to 3</button>
      <button onClick={() => removeItem('1')}>Remove Pizza</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
};

describe('CartContext', () => {
  it('should initialize with empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(screen.getByTestId('total').textContent).toBe('0');
    expect(screen.getByTestId('items-length').textContent).toBe('0');
  });

  it('should add items to cart and update totals', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    act(() => {
      screen.getByText('Add Pizza').click();
    });
    
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('total').textContent).toBe('10');
    expect(screen.getByTestId('items-length').textContent).toBe('1');
  });
});
