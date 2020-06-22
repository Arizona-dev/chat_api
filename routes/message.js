const router = require('express').Router();
const Message = require('../models/Message');

// Find all messages
router.get('/', async(req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Find all messages of a sender to a receiver
router.get('/:authorId&:receiverId', async(req, res) => {
    try {
        const message = await Message.find({
            authorId: req.params.authorId,
            receiverId: req.params.receiverId
        })
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({ message: err });
    }

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
        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Delete a message
router.delete('/:messageId', async(req, res) => {
    try {
        const removedMessage = await Message.deleteOne({ _id: req.params.messageId });
        res.status(200).json({ message: removedMessage });
    } catch (err) {
        res.status(500).json({ message: err });
    }

});

// Update a message
router.patch('/:messageId', async(req, res) => {
    try {
        const updatedMessage = await Message.updateOne({ _id: req.params.messageId }, { $set: { content: req.body.content, attachment: req.body.attachment, timestamp: req.body.timestamp } });
        res.status(200).json({ message: updatedMessage });
    } catch (err) {
        res.status(500).json({ message: err });
    }

});

module.exports = router;