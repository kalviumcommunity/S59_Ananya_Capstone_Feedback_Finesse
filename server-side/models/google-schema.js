const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    emailID: {
        type: String,
        required: true
    },
    role: {
        type: String,
    }
})

const GoogleUser = mongoose.model('GoogleUser', schema)

module.exports = GoogleUser