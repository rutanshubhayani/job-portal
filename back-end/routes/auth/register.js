const express = require('express');
const router = express.Router();
const users = require('../../models/users');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;     
    console.log("Request body received:", req.body);

    try {
        const existsUser = await users.findOne({ email});
        console.log("Existing user by email check:", existsUser);


        const existsName = await users.findOne({ name });
        console.log("Existing user by name check:", existsName);

        if (existsUser || existsName) {
            return res.status(400).send("User already exists.Please check your username or email.");
        }
      

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new users({
            name,
            email,
            password: hashPassword
        });

        await newUser.save();
        console.log("New user saved:", newUser);

        res.status(201).json({
            message: "User saved successfully",
            user: newUser
        });

    } catch (error) {
        console.log("Error saving user:", error);
        res.status(500).json({
            message: "Error saving user",
            error: error.message
        });
    }
});

module.exports = router;