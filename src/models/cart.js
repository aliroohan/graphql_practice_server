const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    books: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    
    

}, { timestamps: true });

const cart = mongoose.model('Cart', cartSchema);

module.exports = cart;