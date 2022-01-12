import { gql } from '@apollo/client';

export const QUERY_COMMENTS = gql `
    query comments($username: String) {
        comments(username: $username) {
            _id
            commentBody: String
            createdAt: String
            replies {
                _id
                createdAt
                username
                replyBody
            }
        }
    }
`;

export const QUERY_COMMENT = gql `
    query comment($id: ID!) {
        comment(_id: $id) {
            _id
            commentBody
            createdAt
            username
            replies{
                _id
                createdAt
                username
                replyBody
            }
        }
    }
`;

export const QUERY_USER = gql `
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            comments{
                _id
                commentBody
                createdAt
            }
        }
    }
`;

export const QUERY_ME = gql `
{
    me {
        _id
        uesrname
        email
        comments {
            _id
            commentBody
            createdAt
            replies {
                _id
                createdAt
                replyBody
                username
            }
        }
    }
}
`;

export const QUERY_ME_BASIC = gql `
    {
        me{
            _id
            username
            email
        }
    }
`

export const QUERY_CHECKOUT = gql `
    query getCheckout($donation: [ID]!) {
        checkout(products: $products) {
            session
        }
    }
`