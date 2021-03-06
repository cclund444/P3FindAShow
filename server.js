const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');

const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const serverInit = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware,
    });
    await server.start();
    server.applyMiddleware({ app });
    console.log(`use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

serverInit();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static(path.join(__dirname, './tv-search/build')));


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './tv-search/build/index.html'));
  });

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });