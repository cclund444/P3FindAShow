const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    comments: [Comment]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Comment {
    _id: ID
    commentBody: String,
    createdAt: String
  }

  type Reply {
    _id: ID
    replyBody: String
    username: String
    createdAt: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    comments(username: String): [Comment]
    comment(_id: ID!): Comment
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addComment(commentBody: String!): Comment
    addReply(commentId: ID!, replyBody: String!): Comment
  }
`;

module.exports = typeDefs;