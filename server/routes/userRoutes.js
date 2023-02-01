const express = require('express');
const userRouter = express.Router()
const userSignUp = require('../controllers/userSignUp')
const userSignIn = require('../controllers/userSignIn');
const userCities = require('../controllers/userTodo')
const weather = require('../controllers/weather');

userRouter.use((req, res, next) => {
    next();
})


userRouter.get('/', (req, res) => {
    res.send('welcome user');
})
userRouter.use('/signup', userSignUp);
userRouter.use('/signin', userSignIn);
userRouter.use('/usercities', userCities)

module.exports = userRouter