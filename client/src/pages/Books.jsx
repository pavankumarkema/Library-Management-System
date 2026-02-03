import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../services/bookService';
import { getBookCover } from '../utils/bookCovers';
import './Books.css';

const Books = () => {
	const navigate = useNavigate();
	const books = getBooks();

	const handleIssue = (book) => {
		navigate('/issue', { state: { bookId: book.id } });
	};

	return (
		<div className="books-page">
			<div className="books-header">
				<h1>Available Books</h1>
				<p>Select a book to request. Admin will approve your request.</p>
			</div>

			{books.length === 0 ? (
				<div className="empty-message">No books available right now.</div>
			) : (
				<div className="books-grid">
					{books.map((book) => {
						const { src, alt, fallbackSrc } = getBookCover(book);
						return (
							<div key={book.id} className="book-card">
								<div className="book-cover">
									<img
										className="book-cover-img"
										src={src}
										alt={alt}
										loading="lazy"
										onError={(event) => {
											event.currentTarget.src = fallbackSrc;
										}}
									/>
								</div>
								<div className="book-info">
									<h3>{book.title}</h3>
									<p className="book-author">{book.author}</p>
									<p><strong>Category:</strong> {book.category}</p>
									<div className="book-footer">
										<span className="book-status">Available</span>
										<button type="button" className="request-btn" onClick={() => handleIssue(book)}>
											Request Book
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Books;
