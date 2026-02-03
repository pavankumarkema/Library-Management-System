import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
	const { user, logout, isAuthenticated, isAdmin } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/books">Books</Link>
			<Link to="/my-books">My Books</Link>
			<Link to="/issue">Issue Book</Link>
			{isAdmin && <Link to="/admin">Admin</Link>}
			<Link to="/about">About</Link>
			{isAuthenticated ? (
				<button type="button" onClick={handleLogout} className="nav-logout">
					Logout {user?.name ? `(${user.name})` : ''}
				</button>
			) : (
				<Link to="/login">Login</Link>
			)}
		</nav>
	);
};

export default Navbar;
