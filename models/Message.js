const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachment: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Message', MessageSchema);