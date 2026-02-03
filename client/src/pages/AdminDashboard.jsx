import React, { useMemo, useState } from 'react';
import { getBooks, addBook, deleteBook } from '../services/bookService';
import { getAllUsers } from '../services/authService';
import { getAllIssuedBooks, issueBook, getPendingRequests, approveRequest, rejectRequest } from '../services/issueService';
import { getBookCover } from '../utils/bookCovers';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [books, setBooks] = useState(() => getBooks());
  const users = getAllUsers();
  const [selectedBookId, setSelectedBookId] = useState(books[0]?.id || '');
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id || '');
  const [dueDate, setDueDate] = useState('');
  const [issued, setIssued] = useState(() => getAllIssuedBooks());
  const [pending, setPending] = useState(() => getPendingRequests());
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookCategory, setNewBookCategory] = useState('');

  const handleApprove = (requestId) => {
    approveRequest(requestId);
    setPending(getPendingRequests());
    setIssued(getAllIssuedBooks());
  };

  const handleReject = (requestId) => {
    rejectRequest(requestId);
    setPending(getPendingRequests());
    setIssued(getAllIssuedBooks());
  };

  const selectedBook = useMemo(
    () => books.find((book) => book.id === selectedBookId),
    [books, selectedBookId],
  );

  const handleIssue = (event) => {
    event.preventDefault();
    if (!selectedBook) return;
    issueBook({ userId: selectedUserId, book: selectedBook, dueDate });
    setIssued(getAllIssuedBooks());
    setPending(getPendingRequests());
  };

  const handleAddBook = (event) => {
    event.preventDefault();
    if (!newBookTitle || !newBookAuthor || !newBookCategory) return;
    addBook({ title: newBookTitle, author: newBookAuthor, category: newBookCategory });
    setBooks(getBooks());
    setNewBookTitle('');
    setNewBookAuthor('');
    setNewBookCategory('');
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(bookId);
      setBooks(getBooks());
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Issue books for any user and track requests.</p>
      </div>

      <div className="admin-grid">
        <section className="admin-section">
          <div className="section-header">
            <h2>Issue a Book</h2>
          </div>
          <div className="section-body">
            <form onSubmit={handleIssue}>
              <div className="form-group">
                <label htmlFor="admin-user">Select User</label>
                <select
                  id="admin-user"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="admin-book">Select Book</label>
                <select
                  id="admin-book"
                  value={selectedBookId}
                  onChange={(e) => setSelectedBookId(e.target.value)}
                >
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title} — {book.author}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="admin-due">Due Date</label>
                <input
                  id="admin-due"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">Issue Book</button>
            </form>
          </div>
        </section>

        <section className="admin-section">
          <div className="section-header">
            <h2>Add New Book</h2>
          </div>
          <div className="section-body">
            <form onSubmit={handleAddBook}>
              <div className="form-group">
                <label htmlFor="new-title">Book Title</label>
                <input
                  id="new-title"
                  type="text"
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new-author">Author</label>
                <input
                  id="new-author"
                  type="text"
                  value={newBookAuthor}
                  onChange={(e) => setNewBookAuthor(e.target.value)}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="new-category">Category</label>
                <input
                  id="new-category"
                  type="text"
                  value={newBookCategory}
                  onChange={(e) => setNewBookCategory(e.target.value)}
                  placeholder="Enter category"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">Add Book</button>
            </form>
          </div>
        </section>

        <section className="admin-section">
          <div className="section-header">
            <h2>Pending Requests</h2>
          </div>
          <div className="section-body">
              {pending.length === 0 ? (
              <div className="empty-message">No pending requests.</div>
            ) : (
              <div className="requests-list">
                  {pending.map((entry) => {
                    const { src, alt, fallbackSrc } = getBookCover(entry.book);
                    return (
                      <div key={entry.id} className="request-item">
                        <img
                          className="request-cover"
                          src={src}
                          alt={alt}
                          loading="lazy"
                          onError={(event) => {
                          event.currentTarget.src = fallbackSrc;
                        }}
                        />
                        <div className="request-info">
                          <p><strong>Book:</strong> {entry.book.title}</p>
                          <p><strong>User:</strong> {users.find((u) => u.id === entry.userId)?.name || entry.userId}</p>
                          <p><strong>Requested:</strong> {new Date(entry.requestedAt).toLocaleDateString()}</p>
                          <p><strong>Due:</strong> {entry.dueDate}</p>
                        </div>
                        <div className="request-actions">
                          <button type="button" className="request-btn approve-btn" onClick={() => handleApprove(entry.id)}>Approve</button>
                          <button type="button" className="request-btn reject-btn" onClick={() => handleReject(entry.id)}>Reject</button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </section>

        <section className="admin-section">
          <div className="section-header">
            <h2>All Books ({books.length})</h2>
          </div>
          <div className="section-body">
            {books.length === 0 ? (
              <div className="empty-message">No books available.</div>
            ) : (
              <div className="books-list">
                {books.map((book) => (
                  <div key={book.id} className="book-item">
                    <span className="book-name">{book.title}</span>
                    <button type="button" className="delete-btn" onClick={() => handleDeleteBook(book.id)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="admin-section">
          <div className="section-header">
            <h2>All Issued Books</h2>
          </div>
          <div className="section-body">
              {issued.length === 0 ? (
              <div className="empty-message">No issued books.</div>
            ) : (
              <div className="requests-list">
                  {issued.map((entry) => {
                    const { src, alt, fallbackSrc } = getBookCover(entry.book);
                    return (
                      <div key={entry.id} className="request-item">
                        <img
                          className="request-cover"
                          src={src}
                          alt={alt}
                          loading="lazy"
                          onError={(event) => {
                          event.currentTarget.src = fallbackSrc;
                        }}
                        />
                        <div className="request-info">
                          <p><strong>Book:</strong> {entry.book.title}</p>
                          <p><strong>User:</strong> {users.find((u) => u.id === entry.userId)?.name || entry.userId}</p>
                          <p><strong>Due:</strong> {entry.dueDate}</p>
                          <p><strong>Status:</strong> {entry.status}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;