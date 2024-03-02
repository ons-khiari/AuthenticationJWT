const express = require('express');
const router = express.Router()
const { authMiddleware, adminMiddleware } = require('../Middlewares/AuthMiddleware');
const {
    register,
    login,
    deleteUser
} = require('../Controllers/AuthController');


router.post('/register', register)
router.post('/login', login)
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteUser)


module.exports = router