const request = require('supertest');
const app = require('../server');
const { clearOrders } = require('../db');

beforeEach(() => {
  clearOrders();
});

describe('API Endpoints', () => {
  describe('GET /api/menu', () => {
    it('should return menu items', async () => {
      const res = await request(app).get('/api/menu');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/orders', () => {
    it('should create a new order with valid data', async () => {
      const payload = {
        items: [{ id: '1', name: 'Pizza', price: 10, quantity: 2 }],
        deliveryDetails: { name: 'Test User', address: '123 Test Ave', phone: '555-5555' }
      };

      const res = await request(app)
        .post('/api/orders')
        .send(payload);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.status).toBe('Order Received');
      expect(res.body.total).toBe(20);
    });

    it('should return 400 for empty cart', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({ items: [], deliveryDetails: { name: 'Test' } });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Cart is empty');
    });

    it('should return 400 for missing delivery details', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({ items: [{ id: '1', price: 10, quantity: 1 }] });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Missing delivery details');
    });
  });
  describe('GET /api/orders/:id', () => {
    it('should return the order status', async () => {
      const payload = {
        items: [{ id: '1', name: 'Pizza', price: 10, quantity: 2 }],
        deliveryDetails: { name: 'Test User', address: '123 Test Ave', phone: '555-5555' }
      };

      const createRes = await request(app)
        .post('/api/orders')
        .send(payload);
      
      const orderId = createRes.body.id;

      const res = await request(app).get(`/api/orders/${orderId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toEqual(orderId);
      expect(res.body.status).toBe('Order Received');
    });

    it('should return 404 for invalid order id', async () => {
      const res = await request(app).get('/api/orders/invalid-id-123');
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBe('Order not found');
    });
  });
});
