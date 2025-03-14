// import style sheet

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return(
    <nav>
      <ul className="nav-item">
        
        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <h2>Posts</h2>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/form" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <h2>New Post</h2>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <h2>Logout</h2>
          </NavLink>

      </ul>
    </nav>
  )
};

export default NavBar;