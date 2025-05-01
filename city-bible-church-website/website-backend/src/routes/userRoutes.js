const express = require('express');
const { UserController } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();
const userController = new UserController();

// Route to get user details
router.get('/me', authMiddleware, userController.getUserDetails);

// Route to update user information
router.put('/me', authMiddleware, userController.updateUserInformation);

module.exports = router;