import React, { useState } from 'react';
import { getIssuedBooks, returnBook } from '../services/issueService';
import { useAuth } from '../context/AuthContext';
import { getBookCover } from '../utils/bookCovers';
import './MyBooks.css';

const MyBooks = () => {
	const { user } = useAuth();
	const [issued, setIssued] = useState(() => (user ? getIssuedBooks(user.id) : []));

	const handleReturn = (issueId) => {
		returnBook(issueId);
		setIssued(getIssuedBooks(user.id));
	};

	return (
		<div className="mybooks-page">
			<div className="mybooks-header">
				<h1>My Issued Books</h1>
				<p>Track your requests, issued books, and returns.</p>
			</div>

			{issued.length === 0 ? (
				<div className="empty-message">
					<div className="empty-icon">📚</div>
					No books issued yet. Visit the Books page to request your first book.
				</div>
			) : (
				<div className="issued-books">
					{issued.map((entry) => {
						const { src, alt, fallbackSrc } = getBookCover(entry.book);
						return (
							<div key={entry.id} className="issued-book-card">
								<div className="book-card-header">
									<img
										className="book-mini-cover"
										src={src}
										alt={alt}
										loading="lazy"
										onError={(event) => {
											event.currentTarget.src = fallbackSrc;
										}}
									/>
									<div>
										<h3>{entry.book.title}</h3>
										<p>{entry.book.author}</p>
									</div>
								</div>
							<div className="book-card-body">
								<div className="card-row">
									<span className="card-label">Due Date</span>
									<span className="card-value">{entry.dueDate}</span>
								</div>
								<div className="card-row">
									<span className="card-label">Status</span>
									<span className={`status-badge status-${entry.status}`}>
										{entry.status}
									</span>
								</div>
							</div>
							<div className="card-footer">
								{entry.status === 'issued' && (
									<button type="button" className="return-btn" onClick={() => handleReturn(entry.id)}>
										Return Book
									</button>
								)}
								{entry.status === 'pending' && (
									<button type="button" className="cancel-btn" disabled>
										Waiting for approval
									</button>
								)}
								{entry.status === 'rejected' && (
									<button type="button" className="cancel-btn" disabled>
										Request rejected
									</button>
								)}
								{entry.status === 'returned' && (
									<button type="button" className="cancel-btn" disabled>
										Returned
									</button>
								)}
							</div>
						</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default MyBooks;
