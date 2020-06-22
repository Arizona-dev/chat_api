const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Find all messages
router.get('/', async(req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.json({ message: err });
    }
});

// Find all messages of a sender to a receiver
router.get('/:authorId&:receiverId', (req, res) => {
    console.log(req.params.authorId, req.params.receiverId);
})


// Post a new message
router.post('/', async(req, res) => {
    const message = new Message({
        authorId: req.body.authorId,
        receiverId: req.body.receiverId,
        content: req.body.content,
        attachment: req.body.attachment,
        timestamp: req.body.timestamp
    });
    try {
        const savedMessage = await message.save()
        res.json({ message: savedMessage, statusCode: res.status(200) });
    } catch (err) {
        res.json({ message: err, statusCode: res.status(500) });
    }
});

module.exports = router;