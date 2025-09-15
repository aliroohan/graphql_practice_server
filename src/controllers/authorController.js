const authorService = require('../services/author');

const getAllAuthors = async (req, res) => {
    try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(
        {
            success: true,
            data: authors
        }
    );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAuthorById = async (req, res) => {
    try {
        const author = await authorService.getAuthorById(req.params.id);
        res.status(200).json(
            {
            success: true,
            data: author
        }
    );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAuthor = async (req, res) => {
    try {
        const author = await authorService.createAuthor(req.body);
        res.status(200).json(
            {
            success: true,
            data: author
        }
    );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAuthor = async (req, res) => {
    try {
        const author = await authorService.updateAuthor(req.params.id, req.body);
        res.status(200).json(
            {
            success: true,
            data: author
        }
    );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const author = await authorService.deleteAuthor(req.params.id);
        res.status(200).json(
            {
            success: true,
            data: author
        }
    );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};