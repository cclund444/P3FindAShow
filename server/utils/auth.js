const jwt = require('jsonwebtoken');

const secret = 'icannotkeepasecrettosavemylife'
const expiration = '1h'

module.exports = {
    signToken: function({ username, email, _id }){
        const load = { username, email, _id };

        return jwt.sign({ data: load }, secret, { expiresIn : expiration });
    }
};