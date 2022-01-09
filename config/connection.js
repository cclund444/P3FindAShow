const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/findshow', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify
    }
);

module.exports = mongoose.connection;