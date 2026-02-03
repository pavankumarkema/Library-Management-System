import React from 'react';

const Footer = () => {
	return (
		<footer style={{ textAlign: 'center', padding: '16px', color: '#666' }}>
			© {new Date().getFullYear()} LibraTech Library Management
		</footer>
	);
};

export default Footer;
