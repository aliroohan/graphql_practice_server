const orderService = require('../services/order');

const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders(req.params.id);
        res.status(200).json(
            {
                success: true,
                data: orders
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.status(200).json(
            {
                success: true,
                data: order
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.user._id, req.body);
        res.status(200).json(
            {
                success: true,
                data: order
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await orderService.updateOrder(req.params.id, req.body);
        res.status(200).json(
            {
                success: true,
                data: order
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder
}