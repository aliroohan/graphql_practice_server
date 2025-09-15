const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, admin } = require('../middleware/auth');


router.get('/', auth, admin, userController.getAllUsers);
router.get('/:id', auth, userController.getUserById);
router.post('/', userController.createUser);
router.post('/login', userController.login);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, admin, userController.deleteUser);

module.exports = router;