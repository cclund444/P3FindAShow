import React, { useState } from 'react';
import NavTabs from './components/Navbar/index';
import Home from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Auth from './utils/auth';

function Routes() {
  // Using useState, set the default value for currentPage to 'Home'
  const [currentPage, handlePageChange] = useState('Home');


  const logout = event => {
    Auth.logout();
  }

  // The renderPage method uses a switch statement to render the appropriate current page
  const renderPage = () => {
    switch (currentPage) {
      case 'Login':
        return <Login />;
      case 'Register':
        return <Register />;
      case 'Logout':
        logout();
        return <Login />;
      default:
        return <Home />;
    }
  };

  
  return (
    <div>
      {/* Pass the state value and the setter as props to NavTabs */}
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Call the renderPage function passing in the currentPage */}
      <div>{renderPage(currentPage)}</div>
    </div>
  );
}

export default Routes;
