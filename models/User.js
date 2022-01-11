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
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    }
);

userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const rounds = 10;
        this.password = await bcrypt.hash(this.password, rounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema);

module.exports = User;