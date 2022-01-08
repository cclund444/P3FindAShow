const jwt = require('jsonwebtoken');

const secret = 'icannotkeepasecrettosavemylife'
const expiration = '1h'

module.exports = {
    authMiddleware: function({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token
            .split(' ')
            .pop()
            .trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid Token');
        }

        return req;
    },
    signToken: function({ username, email, _id }){
        const load = { username, email, _id };

        return jwt.sign({ data: load }, secret, { expiresIn : expiration });
    }
};