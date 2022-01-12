const { AuthenticationError } = require("apollo-server-express");
const { OrderedBulkOperation } = require("mongoose/node_modules/mongodb");
const { User, Comment } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }
    },
    users: async () => {
      return User.find().select("-__v -password").populate("comments");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("comments");
    },
    comments: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Comment.find(params);
    },
    comment: async (parent, { _id }) => {
      return Comment.findOne({ _id });
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;

      const line_items = [];

      const donation = await stripe.products.create({
        name: "Small Donation",
        description: "Please Help",
      });

      const price = await stripe.prices.create({
        product: donation.id,
        unit_amount: 1000,
        currency: "usd",
      });

      line_items.push({
        price: price.id,
        quantity: 1,
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url:
        `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addComment: async (parent, args, context) => {
      if (context.user) {
        const comment = await Comment.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { comments: comment._id } },
          { new: true }
        );
        return comment;
      }
      throw new AuthenticationError("you need to be logged in");
    },
    addReply: async (parent, { commentId, replyBody }, context) => {
      if (context.user) {
        const updatedComment = Comment.findOneAndUpdate(
          { _id: commentId },
          {
            $push: { replies: { replyBody, username: context.user.username } },
          },
          { new: true }
        );

        return updatedComment;
      }

      throw new AuthenticationError("you need to be logged in");
    },
  },
};

module.exports = resolvers;
