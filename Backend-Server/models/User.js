const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
    }
},{timeStamps: true});

module.exports = mongoose.model('User', userSchema);