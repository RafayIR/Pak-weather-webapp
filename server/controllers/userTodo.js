require("dotenv").config();
const express = require('express');
const jwt = require('jsonwebtoken');
const userCities = express.Router();
const { User } = require('../models/userModel')


userCities.use((req, res, next) => {
    console.log('todo middlewARE')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403);
        req.user = user;
        next()
    })

})




userCities.delete('/:city', async (req, res) => {
    await User.updateOne({ _id: req.user.id }, {
        $pullAll: {
            cities: [req.params.city],
        },
    })
    res.send(req.params.city)
})

userCities.post('/', async (req, res) => {
    await User.updateOne({ _id: req.user.id }, {
        $addToSet: {
            cities: [req.body.city],
        },
    })
    res.send(req.body.city)
})


module.exports = userCities