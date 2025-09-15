const cartService = require('../services/cart');

const getCart = async (req, res) => {
    try {
        const cart = await cartService.getCart(req.user._id);
        res.status(200).json(
            {
                success: true,
                data: cart
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const cart = await cartService.addToCart(req.user._id, req.body);
        res.status(200).json(
            {
                success: true,
                data: cart
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeOneFromCart = async (req, res) => {
    try {
        const cart = await cartService.removeOneFromCart(req.user._id, req.params.id);
        res.status(200).json(
            {
                success: true,
                data: cart
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const clearCart = async (req, res) => {
    try {
        const cart = await cartService.clearCart(req.user._id);
        res.status(200).json(
            {
                success: true,
                data: cart
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeItemFromCart = async (req, res) => {
    try {
        const cart = await cartService.removeItemFromCart(req.user._id, req.params.id);
        res.status(200).json(
            {
                success: true,
                data: cart
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    removeOneFromCart,
    clearCart,
    removeItemFromCart
};