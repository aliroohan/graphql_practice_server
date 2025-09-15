const authorModel = require('../models/author');

const getAllAuthors = async () => {
    const authors = await authorModel.find();
    return authors;
};

const getAuthorById = async (id) => {
    const author = await authorModel.findById(id);
    return author;
};

const createAuthor = async (author) => {
    const newAuthor = await authorModel.create(author);
    return newAuthor;
};

const updateAuthor = async (id, author) => {
    const updatedAuthor = await authorModel.findByIdAndUpdate(id, author, { new: true });
    return updatedAuthor;
};

const deleteAuthor = async (id) => {
    const deletedAuthor = await authorModel.findByIdAndDelete(id);
    return deletedAuthor;
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};