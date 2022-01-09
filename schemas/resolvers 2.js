const { AuthenticationError } = require('apollo-server-express');
const { User, Comment } = require('../models')
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
            
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            
        },
        comments: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Comment.find(params);
        },
        comment: async (parent, { _id }) =>{
        return Comment.findOne({ _id })
        }
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
        },
        addComment: async (parent, args, context) => {
            if (context.user) {
                const comment = await Comment.create({ ...args, username: context.user.username})
                
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { comments: comment._id } },
                    { new: true }
                );
                return comment;
        }
            throw new AuthenticationError('you need to be logged in')
        },
        addReply: async (parent, { commentId, replyBody }, context) => {
            if (context.user) {
                const updatedComment = Comment.findOneAndUpdate(
                    { _id: commentId },
                    { $push: { replies: { replyBody, username: context.user.username } } },
                    { new: true }
                );

                return updatedComment;
            }

            throw new AuthenticationError('you need to be logged in');
        }
    }
}

module.exports = resolvers;