import React from 'react';
import Auth from '../../utils/auth'

// Props are passed through our functional component.
function NavTabs(props) {
  const inTabs =['Home', 'Logout'];
  const outTabs = ['Login', 'Register']

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  }

  return (
    // <ul className="nav nav-tabs">
      // {inTabs.map(tab => (
      //   <li className="nav-item" key={tab}>
      //     <a
      //       href={'#' + tab.toLowerCase()}
      //       onClick={() => props.handlePageChange(tab)}
      //       className={
      //         props.currentPage === tab ? 'nav-link active' : 'nav-link'
      //       }
      //     >
      //       {tab}
      //     </a>
      //   </li>
      // ))}
    // </ul>

    <ul className='nav nav-tabs'>
    {Auth.loggedIn() ? (
      inTabs.map(tab => (
        <li className="nav-item" key={tab}>
          <a
            href={'#' + tab.toLowerCase()}
            onClick={() => props.handlePageChange(tab)}
            className={
              props.currentPage === tab ? 'nav-link active' : 'nav-link'
            }
          >
            {tab}
          </a>
        </li>
      ))
    ) : (
      outTabs.map(tab => (
        <li className="nav-item" key={tab}>
          <a
            href={'#' + tab.toLowerCase()}
            onClick={() => props.handlePageChange(tab)}
            className={
              props.currentPage === tab ? 'nav-link active' : 'nav-link'
            }
          >
            {tab}
          </a>
        </li>
      ))
    )}
    </ul>
    
  );
}

export default NavTabs;
