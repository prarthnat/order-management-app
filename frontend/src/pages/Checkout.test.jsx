import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkout from './Checkout';
import { useCart } from '../context/CartContext';

// Mock the react-router-dom module
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

// Mock the CartContext
jest.mock('../context/CartContext', () => ({
  useCart: jest.fn(),
}));

describe('Checkout Component', () => {
  it('renders empty cart message when no items', () => {
    useCart.mockReturnValue({ items: [], cartTotal: 0, clearCart: jest.fn() });
    render(<Checkout />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders form and order summary when cart has items', () => {
    useCart.mockReturnValue({
      items: [{ id: '1', name: 'Pizza', price: 15, quantity: 1 }],
      cartTotal: 15,
      clearCart: jest.fn(),
    });
    render(<Checkout />);
    
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('1x')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getAllByText('$15.00').length).toBe(2);
  });
});
