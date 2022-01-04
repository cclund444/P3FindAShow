const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            match: [/.+@.+\..+/, 'Invalid email address']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        }
    }
);

const User = model('User', userSchema);

module.exports = User;