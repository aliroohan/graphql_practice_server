const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, admin } = require('../middleware/auth');

router.get('/:id', auth, orderController.getOrders);
router.get('/:id', auth, orderController.getOrderById);
router.post('/', auth, orderController.createOrder);
router.put('/:id', auth, admin, orderController.updateOrder);


module.exports = router;