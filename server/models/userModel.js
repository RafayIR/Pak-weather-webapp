const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cities: {
        type: [String],
        required: true
    }


})


const findUserByEmail = (email) => {
    return User.findOne({ email })
}

const User = mongoose.model('user', userSchema);


module.exports = { User, findUserByEmail };  