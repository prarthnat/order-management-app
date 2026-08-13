const express = require('express');
const router = express.Router();
const { createOrder, getOrder, updateOrderStatus } = require('../db');

// POST /api/orders
router.post('/', (req, res) => {
  try {
    const { items, deliveryDetails } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    if (!deliveryDetails || !deliveryDetails.name || !deliveryDetails.address || !deliveryDetails.phone) {
      return res.status(400).json({ error: 'Missing delivery details' });
    }

    const order = createOrder(items, deliveryDetails);
    
    // Simulate real-time updates by triggering a background status change
    simulateOrderProgress(order.id);

    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to place order' });
  }
});

// GET /api/orders/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const order = getOrder(id);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  return res.json(order);
});

function simulateOrderProgress(orderId) {
  // Transition to "Preparing" after 5 seconds
  setTimeout(() => {
    updateOrderStatus(orderId, 'Preparing');
    
    // Transition to "Out for Delivery" after 15 seconds
    setTimeout(() => {
      updateOrderStatus(orderId, 'Out for Delivery');
      
      // Transition to "Delivered" after 25 seconds
      setTimeout(() => {
        updateOrderStatus(orderId, 'Delivered');
      }, 10000);
    }, 10000);
  }, 5000);
}

module.exports = router;
