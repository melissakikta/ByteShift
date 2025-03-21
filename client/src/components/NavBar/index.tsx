import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import '../../App.css';

const NavBar = () => {
  return(
    <Menu 
      mode="horizontal" 
      theme="dark" 
      style={{ justifyContent: "center", background: "var(--secondary)", color: "var(--primary)" }}>

      <Menu.Item 
        key="posts"
        className="custom-menu-item"
      >
        <NavLink to="/collection" style={{ padding: "10px", display: "block" }}>
        Posts
        </NavLink>
      </Menu.Item>

      <Menu.Item 
        key="new-post"
        className="custom-menu-item"
      >
        <NavLink to="/form" style={{ padding: "10px", display: "block" }}>
        New Post
        </NavLink>
      </Menu.Item>

      <Menu.Item 
        key="logout"
        className="custom-menu-item"
      >
        <NavLink to="/" style={{ padding: "10px", display: "block" }}>
        Logout
        </NavLink>
      </Menu.Item>

    </Menu>
  )
};

export default NavBar;