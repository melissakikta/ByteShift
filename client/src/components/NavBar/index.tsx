import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import '../../App.css';
import auth from '../../utils/auth';

const NavBar = () => {
	return (
		<Menu
			mode="horizontal"
			theme="dark"
			className="custom-nav-link"
			style={{ justifyContent: "center", background: "var(--secondary)", color: "var(--primary)", marginTop: "45px", marginBottom: "25px" }}>

			<Menu.Item
				key="posts"
				className="custom-nav-item"
			>
				<NavLink to="/collection" 
				className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
				style={{ 
					padding: "5px", 
					display: "block", 
					color: "var(--primary)",
					background: "var(--secondary)", 
					fontSize: "1.5rem" }}
				>
					Posts
				</NavLink>
			</Menu.Item>

			<Menu.Item
				key="new-post"
				className="custom-nav-item"
			>
				<NavLink to="/form"
				className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
				style={{ 
					padding: "5px", 
					display: "block", 
					color: "var(--primary)", 
					fontSize: "1.5rem" }}
				>
					New Post
				</NavLink>
			</Menu.Item>

			<Menu.Item
				key="logout"
				className="custom-nav-item"
				onClick={auth.logout}
			>
				<NavLink to="/" 
				className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
				style={{ 
					padding: "5px", 
					display: "block", 
					color: "var(--primary)", 
					fontSize: "1.5rem" }}
				>
					{auth.loggedIn() ? `Logout (${auth.getProfile().username})` : "Login/Signup"}
				</NavLink>
			</Menu.Item>

		</Menu>
	)
};

export default NavBar;