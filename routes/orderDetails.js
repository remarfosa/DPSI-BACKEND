// routes/orderDetails.js
const express = require('express');
const router = express.Router();
const OrderDetail = require('../models/orderDetail');
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan order detail baru
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { orderID, productID, quantity } = req.body;
    const newOrderDetail = await OrderDetail.create({
      orderID,
      productID,
      quantity
    });
    res.status(201).json(newOrderDetail);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua order details
router.get('/', authenticate, async (req, res, next) => {
  try {
    const orderDetails = await OrderDetail.findAll();
    res.json(orderDetails);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan order detail berdasarkan ID
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const orderDetail = await OrderDetail.findByPk(req.params.id);
    if (orderDetail) {
      res.json(orderDetail);
    } else {
      res.status(404).json({ message: 'Order Detail not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui order detail berdasarkan ID
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { orderID, productID, quantity } = req.body;
    const orderDetail = await OrderDetail.findByPk(req.params.id);
    if (orderDetail) {
      orderDetail.orderID = orderID;
      orderDetail.productID = productID;
      orderDetail.quantity = quantity;
      await orderDetail.save();
      res.json(orderDetail);
    } else {
      res.status(404).json({ message: 'Order Detail not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus order detail berdasarkan ID
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const orderDetail = await OrderDetail.findByPk(req.params.id);
    if (orderDetail) {
      await orderDetail.destroy();
      res.json({ message: 'Order Detail deleted' });
    } else {
      res.status(404).json({ message: 'Order Detail not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
