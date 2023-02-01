const express = require('express');
const userSignUp = express.Router();
const { User } = require('../models/userModel')

const DEFAULT_CITIES = ['Islamabad', 'Karachi', 'Quetta', 'Lahore', 'Peshawar'];

userSignUp.get('/', (req, res) => {
    res.send('hello from sign up')
    console.log("DEFAULT_CITIES ", DEFAULT_CITIES)
})

userSignUp.post('/', async (req, res) => {
    const newUser = new User(req.body);
    newUser.cities = DEFAULT_CITIES;
    try {
        await newUser.save();

        res.end('Save Successfully');
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = userSignUp;