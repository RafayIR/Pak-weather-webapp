require("dotenv").config();
const jwt = require('jsonwebtoken')
const express = require('express');
const userSignIn = express.Router();
const { User, findUserByEmail } = require('../models/userModel')


userSignIn.get('/', (req, res) => {
    res.send('hello from Sign in')
})

userSignIn.post('/', async (req, res) => {
    const { email, password } = req.body;

    findUserByEmail(email).then((user) => {
        if (!user) {
            res.status(401).json({ message: 'Invalid Email or password' })
        } else {
            const token = generateAccessToken({ id: user._id }, process.env.TOKEN_SECRET)
            res.json(token)
        }
    })



})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '50000s' });
}


module.exports = userSignIn;