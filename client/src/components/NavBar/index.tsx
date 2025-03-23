import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import '../../App.css';

const NavBar = () => {
  return(
    <Menu 
      mode="horizontal" 
      theme="dark" 
      style={{ justifyContent: "center", background: "var(--secondary)", color: "var(--primary)", marginTop: "25px", marginBottom: "25px" }}>

      <Menu.Item 
        key="posts"
        className="custom-menu-item"
      >
        <NavLink to="/collection" style={{ padding: "5px", display: "block", color: "var(--primary)", fontSize: "1.5rem" }}>
        Posts
        </NavLink>
      </Menu.Item>

      <Menu.Item 
        key="new-post"
        className="custom-menu-item"
      >
        <NavLink to="/form" style={{ padding: "5px", display: "block", color: "var(--primary)", fontSize: "1.5rem" }}>
        New Post
        </NavLink>
      </Menu.Item>

      <Menu.Item 
        key="logout"
        className="custom-menu-item"
      >
        <NavLink to="/" style={{ padding: "5px", display: "block", color: "var(--primary)", fontSize: "1.5rem" }}>
        Logout
        </NavLink>
      </Menu.Item>

    </Menu>
  )
};

export default NavBar;