import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { AppContext } from "./lib/contextLib";
import Routes from './Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client'
import { TVProvider } from './utils/GlobalState';
import { setContext } from '@apollo/client/link/context'
// import Footer from './components/Footer';


const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (
   <ApolloProvider client={client}>
    <div>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
  <Routes />
  {/* <Footer /> */}
</AppContext.Provider>
   </div>
   </ApolloProvider>
  );
}
export default App;
