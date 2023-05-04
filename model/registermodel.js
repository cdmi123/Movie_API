const mongoose = require('mongoose');

const Register = new mongoose.Schema({

    name:{type:String},
    email:{type:String},
    password:{type:String}
    
});

const register = mongoose.model('Register', Register);

module.exports = register;