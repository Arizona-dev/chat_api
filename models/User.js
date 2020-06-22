const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 100,
        min: 2
    },
    userTag: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        default: 0
    },
    flex: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
        default: "/api/img/avatar.png"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    }

})

module.exports = mongoose.model('User', userSchema);