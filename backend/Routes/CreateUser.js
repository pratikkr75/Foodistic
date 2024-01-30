const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const jwtSecret = "MyWatchlistCheckyoustockslast&recentpriceonTheETMarkets";

router.post("/createuser", [
    body('name')
        .isLength({ min: 1 }).withMessage('Name is required')
        .custom(value => {
            // Use a regular expression to check if the name contains only letters
            const regex = /^[a-zA-Z]+$/;
            if (!regex.test(value)) {
                throw new Error('Name must contain only letters');
            }
            return true;
        }),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('location').isLength({ min: 1 }).withMessage('Location is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post("/loginuser", [
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('email').isEmail().withMessage('Invalid email address')
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;

    try {
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" });
        }

        const data = {
            user:{
                id:userData.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret);

        return res.json({ success: true, authToken });


    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
