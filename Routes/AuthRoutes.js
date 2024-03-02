const express = require('express');
const router = express.Router()
const { authMiddleware, adminMiddleware } = require('../Middlewares/AuthMiddleware');
const {
    register,
    login,
    deleteUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword
} = require('../Controllers/AuthController');


router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgotpasswordtoken', forgotPasswordToken)
router.put('/passwordReset', authMiddleware, updatePassword)
router.put('/passwordReset/:token', resetPassword)
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteUser)
router.get('/refresh_token', handleRefreshToken)


module.exports = router