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
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    universityID: {
        type: String
    },
    hostel: {
        type: String
    },
    status: {
        type: String,
        enum: ["Submitted", "In Progress", "Resolved"],
        default: "Submitted"
    },
    adminNote: {
        type: String,
    },
    date: {
        type: String
    }
})

const Post = mongoose.model('Posts', schema)

module.exports = Post
