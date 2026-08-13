// In-memory data store for the food delivery application

const menuItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic cheese and tomato pizza with fresh basil.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '2',
    name: 'Gourmet Cheeseburger',
    description: 'Juicy beef patty with melted cheddar, truffle mayo, and crispy onions.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '3',
    name: 'Spicy Chicken Wings',
    description: 'Crispy wings tossed in buffalo sauce with a side of ranch.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '4',
    name: 'Healthy Bowl',
    description: 'Quinoa, roasted sweet potato, avocado, and tahini dressing.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '5',
    name: 'Sushi Roll Platter',
    description: 'Assortment of fresh tuna, salmon, and California rolls.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '6',
    name: 'Spicy Ramen',
    description: 'Rich pork bone broth with tender chashu and chili oil.',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '7',
    name: 'Steak Frites',
    description: 'Grilled ribeye steak with crispy french fries and garlic butter.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '8',
    name: 'Mushroom Risotto',
    description: 'Creamy Arborio rice with wild mushrooms and parmesan crisp.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '9',
    name: 'Fish Tacos',
    description: 'Three crispy cod tacos with slaw and chipotle crema.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: '10',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a gooey center, served with vanilla ice cream.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=400',
  }
];

const orders = new Map();

// Helper functions for orders
function createOrder(cartItems, deliveryDetails) {
  const orderId = Math.random().toString(36).substring(2, 9);
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const order = {
    id: orderId,
    items: cartItems,
    deliveryDetails,
    status: 'Order Received',
    total: parseFloat(total.toFixed(2)),
    createdAt: new Date().toISOString(),
  };
  
  orders.set(orderId, order);
  
  return order;
}

function getOrder(id) {
  return orders.get(id);
}

function updateOrderStatus(id, status) {
  const order = orders.get(id);
  if (order) {
    order.status = status;
    orders.set(id, order);
    return order;
  }
  return null;
}

function clearOrders() {
  orders.clear();
}

module.exports = {
  menuItems,
  orders,
  createOrder,
  getOrder,
  updateOrderStatus,
  clearOrders
};
