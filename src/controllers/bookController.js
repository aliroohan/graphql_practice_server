const bookService = require('../services/book');

const getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(
            {
                success: true,
                data: books
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        res.status(200).json(
            {
                success: true,
                data: book
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBook = async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(200).json(
            {
                success: true,
                data: book
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await bookService.updateBook(req.params.id, req.body);
        res.status(200).json(
            {
                success: true,
                data: book
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await bookService.deleteBook(req.params.id);
        res.status(200).json(
            {
                success: true,
                data: book
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
