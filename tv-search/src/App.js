import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { AppContext } from "./lib/contextLib";
import Routes from './Routes';
function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (
    <div>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
  <Routes />
</AppContext.Provider>
   </div>
  );
}
export default App;
