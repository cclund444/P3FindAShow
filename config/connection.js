const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/findshow', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }
);

module.exports = mongoose.connection;