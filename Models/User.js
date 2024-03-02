const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    refreshToken: {
        type: String,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpire: {
        type: Date,
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(60).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken;
};

module.exports = mongoose.model('User', userSchema);