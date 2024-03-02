const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user'
    }
});

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);