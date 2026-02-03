import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
	const { isAuthenticated, isAdmin } = useAuth();

	return (
		<nav>
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
			{isAuthenticated ? (
				<>
					<Link to="/books">Books</Link>
					<Link to="/my-books">My Books</Link>
					<Link to="/issue">Issue Book</Link>
					<Link to="/profile">Profile</Link>
					{isAdmin && <Link to="/admin">Admin</Link>}
				</>
			) : (
				<>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</>
			)}
		</nav>
	);
};

export default Navbar;
