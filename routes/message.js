const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/', (req, res) => {
    res.send('message page');
});

router.post('/', (req, res) => {
    const message = new Message({
        authorId: req.body.authorId,
        receiverId: req.body.receiverId,
        content: req.body.content,
        attachment: req.body.attachment,
        timestamp: req.body.timestamp,

    });

    try {
        message.save()
            .then(data => {
                res.json(data)
            });
        res.json({ message: "Message saved", statusCode: res.status(200) });
    } catch {
        (err => {
            res.json({ message: err, statusCode: res.status(500) });
        })
    }
});

module.exports = router;