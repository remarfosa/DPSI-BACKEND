var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//products

//routing
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories'); // Impor rute categories
var customerRouter = require('./routes/customers');
var employeeRouter = require('./routes/employees');
var supplierRouter = require('./routes/suppliers');
var orderRouter = require('./routes/orders');
var shipperRouter = require('./routes/shippers');
var orderDetailRouter = require('./routes/orderDetails');
//model
var sequelize = require('./models/index'); // Tambahkan ini untuk memuat koneksi database
var Category = require('./models/category'); // Impor model Category
var Product = require('./models/product'); // Impor model Product
var Customer = require('./models/customer'); 
var Employee = require('./models/employee'); 
var Supplier = require('./models/supplier'); 
var Order = require('./models/order'); 
var Shipper = require('./models/shipper'); 
var OrderDetail = require('./models/orderDetail'); 

var authRouter = require('./routes/auth');
var sequelize = require('./models/index');


var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Tambahkan ini di bagian setelah rute users

//routing

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter); // Gunakan rute categories
app.use('/customer', customerRouter);
app.use('/Employee', employeeRouter);
app.use('/supplier', supplierRouter);
app.use('/order', orderRouter);
app.use('/shipper', shipperRouter);
app.use('/orderdetail', orderDetailRouter);
app.use('/auth', authRouter);
app.use('/uploads', express.static('uploads')); // Middleware untuk menyajikan file statis




// Sinkronkan model dengan database
sequelize.sync()
 .then(() => {
 console.log('Database synchronized');
 })
 .catch(err => {
 console.error('Error synchronizing database:', err);
 });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
