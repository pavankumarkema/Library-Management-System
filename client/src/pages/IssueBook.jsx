import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBookById, getBooks } from '../services/bookService';
import { requestBook } from '../services/issueService';
import { useAuth } from '../context/AuthContext';

const IssueBook = () => {
	const { user } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const allBooks = getBooks();
	const defaultBookId = location.state?.bookId;
	const [selectedBookId, setSelectedBookId] = useState(defaultBookId || allBooks[0]?.id || '');
	const [dueDate, setDueDate] = useState('');
	const selectedBook = useMemo(() => getBookById(selectedBookId), [selectedBookId]);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!selectedBook || !user) return;
		requestBook({ userId: user.id, book: selectedBook, dueDate });
		navigate('/my-books');
	};

	return (
		<div className="page-container">
			<h2 className="page-title">Issue a Book</h2>
			<div className="issue-visual">
				<div className="issue-visual__icon" aria-hidden="true">📘✨</div>
				<div>
					<strong>Request a book</strong>
					<p>Pick a title, set a due date, and wait for admin approval.</p>
				</div>
			</div>
			<form onSubmit={handleSubmit} className="card">
				<div style={{ marginBottom: '12px' }}>
					<label htmlFor="book">Select Book</label>
					<select
						id="book"
						value={selectedBookId}
						onChange={(e) => setSelectedBookId(e.target.value)}
						style={{ display: 'block', width: '100%', padding: '8px', marginTop: '8px' }}
						required
					>
						{allBooks.map((book) => (
							<option key={book.id} value={book.id}>
								{book.title} — {book.author}
							</option>
						))}
					</select>
				</div>

				<div style={{ marginBottom: '12px' }}>
					<label htmlFor="dueDate">Due Date</label>
					<input
						id="dueDate"
						type="date"
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
						style={{ display: 'block', width: '100%', padding: '8px', marginTop: '8px' }}
						required
					/>
				</div>

				{selectedBook && (
					<div style={{ marginBottom: '12px' }}>
						<strong>Selected:</strong> {selectedBook.title} by {selectedBook.author}
					</div>
				)}

<button type="submit">Request Book</button>
			</form>
		</div>
	);
};

export default IssueBook;
