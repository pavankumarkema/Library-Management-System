import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBookById, getBooks } from '../services/bookService';
import { requestBook } from '../services/issueService';
import { useAuth } from '../context/AuthContext';
import { getBookCover } from '../utils/bookCovers';
import './IssueBook.css';

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
		<div className="issuebook-page">
			<div className="issuebook-container">
				<div className="issuebook-header">
					<h1>Request a Book</h1>
					<p>Pick a title, set a due date, and wait for admin approval.</p>
				</div>

				<form onSubmit={handleSubmit} className="issuebook-form">
					<div className="form-group">
						<label htmlFor="book">Select Book</label>
						<select
							id="book"
							value={selectedBookId}
							onChange={(e) => setSelectedBookId(e.target.value)}
							required
						>
							{allBooks.map((book) => (
								<option key={book.id} value={book.id}>
									{book.title} — {book.author}
								</option>
							))}
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="dueDate">Due Date</label>
						<input
							id="dueDate"
							type="date"
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
							required
						/>
					</div>

					{selectedBook && (() => {
						const { src, alt, fallbackSrc } = getBookCover(selectedBook);
						return (
							<div className="selected-preview">
								<img
									className="selected-cover"
									src={src}
									alt={alt}
									loading="lazy"
									onError={(event) => {
										event.currentTarget.src = fallbackSrc;
									}}
								/>
								<div>
									<strong>{selectedBook.title}</strong>
									<p>by {selectedBook.author}</p>
								</div>
							</div>
						);
					})()}

					<div className="button-group">
						<button type="submit" className="submit-btn">Request Book</button>
						<button type="button" className="cancel-btn" onClick={() => navigate('/books')}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default IssueBook;
