//code awal
// var express = require('express');
// var router = express.Router();

// // Data produk yang akan kita tampilkan
// const products = [
//  { id: 1, name: 'Product A', price: 100 },
//  { id: 2, name: 'Product B', price: 150 },
//  { id: 3, name: 'Product C', price: 200 }
// ];

// // Rute GET untuk mendapatkan daftar produk
// router.get('/', function(req, res, next) {
//  res.json(products);
// });

// // Rute POST untuk menambahkan produk baru
// router.post('/', function(req, res, next) {
//     const newProduct = {
//     id: products.length + 1,
//     name: req.body.name,
//     price: req.body.price};
//     products.push(newProduct);
//     res.status(201).json({ message: 'Product added successfully', product:
//    newProduct });
//    });

// module.exports = router;


//code modul 9

// const express = require('express');
// const router = express.Router();
// const Product = require('../models/product'); // Impor model Product
// const { authenticate, authorize } = require('../middleware/auth');


// // Endpoint untuk menambahkan produk baru sebelum autentikasi
// router.post('/', async (req, res, next) => {
//  try {
//  const { productName, supplierID, categoryID, unit, price } =
// req.body;
//  const newProduct = await Product.create({ productName, supplierID,
// categoryID, unit, price });
//  res.status(201).json(newProduct);
//  } catch (err) {
//  next(err);
//  }
// });
// Endpoint untuk menampilkan semua produk
// router.get('/', async (req, res, next) => {
//     try {
//         const products = await Product.findAll();
//         res.json(products);
//         } catch (err) {
//         next(err);
//         }
//        });
//        // Endpoint untuk menampilkan produk berdasarkan ID
//        router.get('/:id', async (req, res, next) => {
//         try {
//         const product = await Product.findByPk(req.params.id);
//         if (product) {
//         res.json(product);
//         } else {
//         res.status(404).json({ message: 'Product not found' });
//         }
//         } catch (err) {
//         next(err);
//         }
//        });
//        // Endpoint untuk memperbarui produk berdasarkan ID
//        router.put('/:id', async (req, res, next) => {
//         try {
//         const { productName, supplierID, categoryID, unit, price } =
//        req.body;
//         const product = await Product.findByPk(req.params.id);
//         if (product) {
//         product.productName = productName;
//         product.supplierID = supplierID;
//         product.categoryID = categoryID;
//         product.unit = unit;
//         product.price = price;
//         await product.save();
//         res.json(product);
//         } else {
//         res.status(404).json({ message: 'Product not found' });
//         }
//         } catch (err) {
//         next(err);
//         }
//        });
//        // Endpoint untuk menghapus produk berdasarkan ID
//        router.delete('/:id', async (req, res, next) => {
//         try {
//         const product = await Product.findByPk(req.params.id);
//         if (product) {
//             await product.destroy();
//  res.json({ message: 'Product deleted' });
//  } else {
//  res.status(404).json({ message: 'Product not found' });
//  }
//  } catch (err) {
//  next(err);
//  }
// });
// module.exports = router;


//code modul 10
// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { authenticate, authorize } = require('../middleware/auth');
// Endpoint untuk menambahkan produk baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {try {
    const { productName, supplierID, categoryID, unit, price } =
   req.body;
    const newProduct = await Product.create({ productName, supplierID,
   categoryID, unit, price });
    res.status(201).json(newProduct);
    } catch (err) {
    next(err);
    }
   });
   // Endpoint untuk menampilkan semua produk
   router.get('/', authenticate, async (req, res, next) => {
    try {
    const products = await Product.findAll();
    res.json(products);
    } catch (err) {
    next(err);
    }
   });
   // Endpoint untuk menampilkan produk berdasarkan ID
   router.get('/:id', authenticate, async (req, res, next) => {
    try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
    res.json(product);
    } else {
    res.status(404).json({ message: 'Product not found' });
    }
    } catch (err) {
    next(err);
    }
   });
   // Endpoint untuk memperbarui produk berdasarkan ID
   router.put('/:id', authenticate, authorize(['admin']), async (req, res,
   next) => {
    try {
    const { productName, supplierID, categoryID, unit, price } =
   req.body;
    const product = await Product.findByPk(req.params.id);
    if (product) {
    product.productName = productName;
    product.supplierID = supplierID;
    product.categoryID = categoryID;
    product.unit = unit;
    product.price = price;
    await product.save();
    res.json(product);
 } else {
 res.status(404).json({ message: 'Product not found' });
 }
 } catch (err) {
 next(err);
 }
});
// Endpoint untuk menghapus produk berdasarkan ID
router.delete('/:id', authenticate, authorize(['admin']), async (req, res,
next) => {
 try {
 const product = await Product.findByPk(req.params.id);
 if (product) {
 await product.destroy();
 res.json({ message: 'Product deleted' });
 } else {
 res.status(404).json({ message: 'Product not found' });
 }
 } catch (err) {
 next(err);
 }
});
module.exports = router;