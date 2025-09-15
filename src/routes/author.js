const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const authorController = require('../controllers/authorController');

router.get('/', auth, authorController.getAllAuthors); // get all authors
router.get('/:id', auth, authorController.getAuthorById); // get author by id
router.post('/', auth, admin, authorController.createAuthor); // create author
router.put('/:id', auth, admin, authorController.updateAuthor); // update author
router.delete('/:id', auth, admin, authorController.deleteAuthor); // delete author

module.exports = router;