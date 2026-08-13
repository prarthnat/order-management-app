const express = require('express');
const router = express.Router();
const { menuItems } = require('../db');

// GET /api/menu
router.get('/', (req, res) => {
  res.json(menuItems);
});

module.exports = router;
