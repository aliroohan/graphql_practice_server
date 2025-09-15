const bookModel = require('../models/book');

const getAllBooks = async () => {
    const books = await bookModel.find();
    return books;
};

const getBookById = async (id) => {
    const book = await bookModel.findById(id);
    return book;
};

const createBook = async (book) => {
    const newBook = await bookModel.create(book);
    return newBook;
};

const updateBook = async (id, book) => {
    const updatedBook = await bookModel.findByIdAndUpdate(id, book, { new: true });
    return updatedBook;
};

const deleteBook = async (id) => {
    const deletedBook = await bookModel.findByIdAndDelete(id);
    return deletedBook;
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};