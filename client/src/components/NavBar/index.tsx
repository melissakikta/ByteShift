import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return(
    <Menu mode="horizontal" theme="dark" style={{ justifiedContent: "center" }}>
      <Menu.Item key="posts">
        <NavLink to="/collection">Posts</NavLink>
      </Menu.Item>
      <Menu.Item key="new-post">
        <NavLink to="/form">New Post</NavLink>
      </Menu.Item>
      <Menu.Item key="logout">
        <NavLink to="/">Logout</NavLink>
      </Menu.Item>
    </Menu>
  )
};

export default NavBar;