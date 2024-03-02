const crypto = require('crypto');

const generateToken = () => {
    return crypto.randomBytes(60).toString('hex');
};

module.exports = { generateToken };