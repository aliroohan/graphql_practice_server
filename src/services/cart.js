const cartModel = require('../models/cart');
const bookModel = require('../models/book');

const calculateTotalAmount = (totalAmount, books) => {
    books.forEach(book => {
        totalAmount += book.price * book.quantity;
    });
    return totalAmount;
}

const getCart = async (userId) => {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
        throw new Error('Cart not found');
    }
    return cart;
};

const addToCart = async (userId, bookId) => {
    let cart = await cartModel.findOne({ user:userId });
    if (!cart) {
        cart = await cartModel.create({ user: userId, books: []});
    }
    const book = await bookModel.findById(bookId);
    if (!book) {
        throw new Error('Book not found');
    }
    if (book.quantity === 0) {
        throw new Error('Book is out of stock');
    }

    const existingBook = cart.books.find(book => book.book.toString() === bookId);
    if (existingBook) {
        existingBook.quantity += 1;
    } else {
        cart.books.push({ book: bookId, quantity: 1, price: book.price });
    }
    cart.totalAmount = calculateTotalAmount(0, cart.books);
    await cart.save();
    return cart;
};

const removeOneFromCart = async (userId, bookId) => {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
        throw new Error('Cart not found');
    }
    const book = cart.books.find(book => book.book.toString() === bookId);
    if (!book) {
        throw new Error('Book not found in cart');
    }
    book.quantity -= 1;
    if (book.quantity === 0) {
        cart.books = cart.books.filter(book => book.book.toString() !== bookId);
    }
    cart.totalAmount = calculateTotalAmount(0, cart.books);
    await cart.save();
    return cart;
};

const clearCart = async (userId) => {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
        throw new Error('Cart not found');
    }
    cart.books = [];
    cart.totalAmount = 0;
    await cart.save();
    return cart;
}

const removeItemFromCart = async (userId, bookId) => {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
        throw new Error('Cart not found');
    }
    cart.books = cart.books.filter(book => book.book.toString() !== bookId);
    cart.totalAmount = calculateTotalAmount(0, cart.books);
    await cart.save();
    return cart;
}


module.exports = {
    getCart,
    addToCart,
    removeOneFromCart,
    clearCart,
    removeItemFromCart
}