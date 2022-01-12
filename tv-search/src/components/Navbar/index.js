import React from 'react';
import Auth from '../../utils/auth'
import { Link } from 'react-router-dom'

// Props are passed through our functional component.
function NavTabs(props) {
  const inTabs =['Home', 'Logout'];
  const outTabs = ['Login', 'Register','Home']


  return (
    <div className="nav">
      <h1 className='nav-heading'>P3Find a Show</h1>
    <ul className='nav-tabs'>
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
    </div>
  );
}

export default NavTabs;
