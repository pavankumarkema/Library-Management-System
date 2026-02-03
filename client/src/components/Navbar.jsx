import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
	const { isAuthenticated, isAdmin, logout } = useAuth();
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const handleLogout = () => {
		logout();
		closeMenu();
		navigate('/');
	};

	// Close menu on Escape key & lock body scroll when menu is open
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && isMenuOpen) {
				closeMenu();
			}
		};

		// Lock body scroll when mobile menu is open
		if (isMenuOpen && window.innerWidth < 768) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		window.addEventListener('keydown', handleEscape);
		return () => {
			window.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = '';
		};
	}, [isMenuOpen]);

	return (
		<>
			{/* Backdrop overlay for mobile menu */}
			{isMenuOpen && (
				<div 
					className="nav-backdrop" 
					onClick={closeMenu}
					aria-hidden="true"
				/>
			)}

			<nav className="navbar" role="navigation" aria-label="Main navigation">
				<div className="nav-container">
					<div className="nav-brand">
						<Link to="/" onClick={closeMenu} aria-label="LibraTech Home">
							LibraTech
						</Link>
					</div>
					
					<button 
						className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
						onClick={toggleMenu} 
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={isMenuOpen}
						aria-controls="nav-menu"
						type="button"
					>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</button>

					<div 
						className={`nav-links ${isMenuOpen ? 'active' : ''}`}
						id="nav-menu"
					>
						<Link to="/" onClick={closeMenu}>Home</Link>
						<Link to="/about" onClick={closeMenu}>About</Link>
						{isAuthenticated ? (
							<>
								<Link to="/books" onClick={closeMenu}>Books</Link>
								<Link to="/my-books" onClick={closeMenu}>My Books</Link>
								<Link to="/issue" onClick={closeMenu}>Issue Book</Link>
								<Link to="/profile" onClick={closeMenu}>Profile</Link>
								{isAdmin && <Link to="/admin" onClick={closeMenu}>Admin</Link>}
								<button className="nav-logout-btn" onClick={handleLogout} type="button">
									Logout
								</button>
							</>
						) : (
							<>
								<Link to="/login" onClick={closeMenu}>Login</Link>
								<Link to="/register" onClick={closeMenu} className="nav-register-btn">Sign Up</Link>
							</>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
