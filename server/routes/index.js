const express = require('express');
const router = express.Router();
const app = express();
const user = require('./test')
const loginController = require('./login');
const midd = require('../middlewares/auth');
const cat = require('../routes/category');
const prod = require('../routes/product');
const us = require('../routes/user')


// Login and google routes

router.post('/login', loginController.login);
router.post('/google', loginController.postGoogle);

// User Routes

router.put('/user/:id', midd.verifyToken, user.updateUser); 
router.get('/user', midd.verifyToken, us.getUser);
router.post('/user', midd.verifyToken, us.createUser);
router.delete('user/:id', midd.verifyToken, midd.verifyAdminRole, us.deleteUser)


// Category Routes

router.post('/category', midd.verifyToken, cat.postCategory);
router.put('/category/:id', midd.verifyToken, cat.updateCategory);
router.delete('/category/:id', midd.verifyToken, midd.verifyAdminRole, cat.deleteCategory);
router.get('/category', midd.verifyToken, cat.getCategories);
router.get('/category/:id', midd.verifyToken, cat.getCategoryById)

// Product Routes

router.post('/product', midd.verifyToken, prod.createProduct);
router.get('/products', midd.verifyToken, prod.getProducts);
router.get('/product/:id', midd.verifyToken, prod.getProductById);
router.put('/product/:id', midd.verifyToken, prod.updateProduct);
router.delete('/product/:id', midd.verifyToken, prod.deleteProduct);

app.use('/', router)

module.exports = app;