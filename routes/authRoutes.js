const express = require('express');
const UserController = require('../controllers/userController');
const authenticateToken = require('../middleware/authentication');

const router = express.Router();

router.get('/', UserController.getAllUsers);
// router.get('/:id', UserController.getUserById);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/:id', authenticateToken, UserController.updateUser);
// router.delete('/:id', UserController.deleteUser);
module.exports = router;
