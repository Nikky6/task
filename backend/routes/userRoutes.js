const express = require('express');
const { authenticate } = require('../auth');
const { registerUser, loginUser, getUser, updateUser,getAllUsers } = require('../controller/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getUser);
router.put('/update', authenticate, updateUser);
router.get('/users/list',getAllUsers)

module.exports = router