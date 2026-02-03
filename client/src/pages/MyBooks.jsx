import React, { useState } from 'react';
import { getIssuedBooks, returnBook } from '../services/issueService';
import { useAuth } from '../context/AuthContext';

const MyBooks = () => {
	const { user } = useAuth();
	const [issued, setIssued] = useState(() => (user ? getIssuedBooks(user.id) : []));

	const handleReturn = (issueId) => {
		returnBook(issueId);
		setIssued(getIssuedBooks(user.id));
	};

	return (
		<div className="page-container">
			<h2 className="page-title">My Issued Books</h2>
			<div className="return-visual">
				<div className="return-visual__icon" aria-hidden="true">📗↩️</div>
				<div>
					<strong>Easy returns</strong>
					<p>Return any book with a single click.</p>
				</div>
			</div>
			{issued.length === 0 ? (
				<p>No books issued yet. Visit the Books page to issue your first book.</p>
			) : (
				<div className="card-grid">
					{issued.map((entry) => (
						<div key={entry.id} className="card">
							<h3>{entry.book.title}</h3>
							<p><strong>Author:</strong> {entry.book.author}</p>
							<p><strong>Due:</strong> {entry.dueDate}</p>
							<p><strong>Status:</strong> <span style={{ textTransform: 'capitalize', fontWeight: 'bold', color: entry.status === 'pending' ? '#f59e0b' : entry.status === 'issued' ? '#10b981' : entry.status === 'rejected' ? '#ef4444' : '#6b7280' }}>{entry.status}</span></p>
							{entry.status === 'issued' && (
								<button type="button" onClick={() => handleReturn(entry.id)}>Return Book</button>
							)}
							{entry.status === 'pending' && (
								<p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Waiting for admin approval</p>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MyBooks;
