import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../services/bookService';

const Books = () => {
	const navigate = useNavigate();
	const books = getBooks();

	const handleIssue = (book) => {
		navigate('/issue', { state: { bookId: book.id } });
	};

	return (
		<div className="page-container">
			<h2 className="page-title">Available Books</h2>
			<p className="page-subtitle">Select a book to request. Admin will approve your request.</p>
			<div className="card-grid">
				{books.map((book) => (
					<div key={book.id} className="card">
						<h3>{book.title}</h3>
						<p><strong>Author:</strong> {book.author}</p>
						<p><strong>Category:</strong> {book.category}</p>
						<button type="button" onClick={() => handleIssue(book)}>Request Book</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Books;
