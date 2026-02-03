import React, { useMemo, useState } from 'react';
import { getBooks, addBook, deleteBook } from '../services/bookService';
import { getAllUsers } from '../services/authService';
import { getAllIssuedBooks, issueBook, getPendingRequests, approveRequest, rejectRequest } from '../services/issueService';

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
    <div className="page-container">
      <h2 className="page-title">Admin Dashboard</h2>
      <p className="page-subtitle">Issue books for any user and track issued items.</p>

      <form onSubmit={handleIssue} className="card" style={{ marginBottom: '20px' }}>
        <h3>Issue a Book</h3>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="admin-user">Select User</label>
          <select
            id="admin-user"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '8px' }}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="admin-book">Select Book</label>
          <select
            id="admin-book"
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '8px' }}
          >
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} — {book.author}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="admin-due">Due Date</label>
          <input
            id="admin-due"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '8px' }}
            required
          />
        </div>

        <button type="submit">Issue Book</button>
      </form>

      <form onSubmit={handleAddBook} className="card" style={{ marginBottom: '20px' }}>
        <h3>Add New Book</h3>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="new-title">Book Title</label>
          <input
            id="new-title"
            type="text"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '8px' }}
            placeholder="Enter book title"
            required
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="new-author">Author</label>
          <input
            id="new-author"
            type="text"
            value={newBookAuthor}
            onChange={(e) => setNewBookAuthor(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '8px' }}
            placeholder="Enter author name"
            required
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="new-category">Category</label>
          <input
            id="new-category"
            type="text"
            value={newBookCategory}
            onChange={(e) => setNewBookCategory(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '8px' }}
            placeholder="Enter category"
            required
          />
        </div>

        <button type="submit">Add Book</button>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <h3>All Books ({books.length})</h3>
        <div className="card-grid">
          {books.map((book) => (
            <div key={book.id} className="card">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Category:</strong> {book.category}</p>
              <button
                type="button"
                onClick={() => handleDeleteBook(book.id)}
                style={{ background: '#ef4444', marginTop: '8px' }}
              >
                Delete Book
              </button>
            </div>
          ))}
        </div>
      </div>

      {pending.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Pending Requests</h3>
          <div className="card-grid">
            {pending.map((entry) => (
              <div key={entry.id} className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                <h3>{entry.book.title}</h3>
                <p><strong>User:</strong> {users.find((u) => u.id === entry.userId)?.name || entry.userId}</p>
                <p><strong>Requested:</strong> {new Date(entry.requestedAt).toLocaleDateString()}</p>
                <p><strong>Due:</strong> {entry.dueDate}</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button type="button" onClick={() => handleApprove(entry.id)} style={{ background: '#10b981' }}>Approve</button>
                  <button type="button" onClick={() => handleReject(entry.id)} style={{ background: '#ef4444' }}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3>All Issued Books</h3>
      <div className="card-grid">
        {issued.map((entry) => (
          <div key={entry.id} className="card">
            <h3>{entry.book.title}</h3>
            <p><strong>User:</strong> {users.find((u) => u.id === entry.userId)?.name || entry.userId}</p>
            <p><strong>Due:</strong> {entry.dueDate}</p>
            <p><strong>Status:</strong> {entry.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;