const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    verify: {
        type: Boolean,
        default: false
    },
    otp: { 
        type: String
    }
})

const User = mongoose.model('users', schema)

module.exports = User