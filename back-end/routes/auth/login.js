const express = require('express');
const router = express.Router();
const users = require('../../models/users');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userEmail = await users.findOne({ email });
        if (!userEmail) {
            return res.status(400).send("Email or password is incorrect");
        }

        const isPasswordCorrect = await bcrypt.compare(password, userEmail.password);
        if (!isPasswordCorrect) {
            return res.status(400).send("Email or password is incorrect");
        }

        const token = jwt.sign({
            id: users._id,
            email: users.email
        }, SECRET_KEY, { expiresIn: '1h' });

        res.json({
            msg: "Login successful",
            token: token,
        });
    } catch (error) {
        console.log("Error login user:", error);
        res.status(500).json({
            message: "Error login user",
            error: error.message
        });
    }
});


module.exports = router;
