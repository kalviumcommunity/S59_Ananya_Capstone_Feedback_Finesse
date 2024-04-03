const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', schema)

module.exports = User