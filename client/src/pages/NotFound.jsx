import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
	<div className="page-container">
		<h2 className="page-title">Page not found</h2>
		<p className="page-subtitle">The page you are looking for doesn’t exist or has been moved.</p>
		<Link to="/" className="link-btn">
			Back to Home
		</Link>
	</div>
);

export default NotFound;
