const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../misc/validation');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async(req, res) => {

    // Validating the data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if email already exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        username: req.body.username,
        userTag: Math.floor(Math.random() * (9999 - 1000)) + 1000,
        email: req.body.email,
        password: hashedPassword,
        birthday: req.body.birthday,
        avatar: req.body.avatar

    });
    try {
        const savedUser = await user.save();
        res.status(200).send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async(req, res) => {

    // Validating the data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if email is registered
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong');

    // Check the password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong');

    res.send('logged in');
});

module.exports = router;