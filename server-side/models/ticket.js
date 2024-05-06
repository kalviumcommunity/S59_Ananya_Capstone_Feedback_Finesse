const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    picture: [
        String
    ],
    username: {
        type: String
    },
    universityID: {
        type: String
    },
    hostel: {
        type: String
    },
    status: {
        type: String,
        enum: ["Submitted", "In Progress", "Completed"],
        default: "Submitted"
    }
})

const Post = mongoose.model('Posts', schema)

module.exports = Post