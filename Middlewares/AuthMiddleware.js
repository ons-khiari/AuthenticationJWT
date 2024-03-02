const asyncHandler = require('express-async-handler');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

// it will check if the token is valid or not and if it's valid it will add the user to the request object
// if the token not valid that means the token is expired or not valid (not generated by the server)
const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization && req?.headers?.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            req.user = await User.findById(decoded.id);
            next();
        } catch (error) {
            console.error("Token verification error:", error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }
});


// Middleware to protect routes from unauthorized access
// it will check if the user is an admin or not so it will protect the routes that only the admin can access
const adminMiddleware = asyncHandler(async (req, res, next) => {
    const emailUser = req.user;
    const user = await User.findOne(emailUser);

    if (user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
});

module.exports = { authMiddleware, adminMiddleware };