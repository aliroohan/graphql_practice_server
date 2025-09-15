const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { auth, admin } = require('../middleware/auth');

router.get('/', auth, cartController.getCart);
router.post('/', auth, cartController.addToCart);
router.delete('/remove/:id', auth, cartController.removeOneFromCart);
router.delete('/clear', auth, cartController.clearCart);
router.delete('/removeItem/:id', auth, cartController.removeItemFromCart);

module.exports = router;