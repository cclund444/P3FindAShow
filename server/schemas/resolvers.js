const { AuthenticationError } = require('apollo-server-express');
const { User, User } = require('../models')
const { signToken } = require('../utils/auth')


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id})
                .select('-__v -password')

                return userData;
            }
        },
        users: async () => {
            return User.find()
            .select('-__v -password')
            // add comment population
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            // add comment population
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const User = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw ) {
                throw new AuthenticationError('Incorrect credentials');

            }

            const token = signToken(user);
            return { token, user };
        }
    }
}