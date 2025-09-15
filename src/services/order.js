const orderModel = require('../models/order');
const cartService = require('./cart');
const bookModel = require('../models/book');

const getOrders = async (userId) => {
    const orders = await orderModel.find({ user: userId }).populate('books.book');
    if (!orders) {
        throw new Error('No orders found');
    }
    return orders;
};

const getOrderById = async (id) => {
    const order = await orderModel.findById(id).populate('books.book')  ;
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
};

const createOrder = async (userId, books) => {
    const order = await orderModel.create({ user: userId, books });
    for (const book of books) {
        const bookData = await bookModel.findById(book.book);
        if (!bookData) {
            throw new Error('Book not found');
        }
        bookData.quantity -= book.quantity;
        await bookData.save();
    }
    order.totalAmount = books.reduce((acc, book) => acc + book.price * book.quantity, 0);
    await order.save();

    await cartService.clearCart(userId);
    return order;
};

const updateOrder = async (id, books) => {
    const order = await orderModel.findByIdAndUpdate(id, { books }, { new: true }).populate('books.book');
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
};

const updateOrderStatus = async (id, status) => {
    const order = await orderModel.findByIdAndUpdate(id, { status }, { new: true }).populate('books.book');
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    updateOrderStatus
}