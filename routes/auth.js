const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../misc/validation');

router.post('/register', async(req, res) => {

    // Validating the data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User({
        username: req.body.username,
        userTag: Math.floor(Math.random() * (9999 - 1000)) + 1000,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        avatar: req.body.avatar

    });
    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', (req, res) => {
    res.send('Login');
});

module.exports = router;