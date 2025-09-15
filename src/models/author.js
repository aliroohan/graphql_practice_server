const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String
    }
}, { timestamps: true });

const author = mongoose.model('Authors', authorSchema);

module.exports = author;