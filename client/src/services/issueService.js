const ISSUED_KEY = 'libratech_issued_books';

const readIssued = () => {
	const stored = localStorage.getItem(ISSUED_KEY);
	try {
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
};

const writeIssued = (issued) => {
	localStorage.setItem(ISSUED_KEY, JSON.stringify(issued));
};
export const requestBook = ({ userId, book, dueDate }) => {
  const issued = readIssued();
  const entry = {
    id: `req-${Date.now()}`,
    userId,
    book,
    requestedAt: new Date().toISOString(),
    dueDate,
    status: 'pending',
  };
  issued.push(entry);
  writeIssued(issued);
  return entry;
};
export const issueBook = ({ userId, book, dueDate }) => {
	const issued = readIssued();
	const entry = {
		id: `issue-${Date.now()}`,
		userId,
		book,
		issuedAt: new Date().toISOString(),
		dueDate,
		status: 'issued',
	};
	issued.push(entry);
	writeIssued(issued);
	return entry;
};

export const getIssuedBooks = (userId) => {
	const issued = readIssued();
	return issued.filter((entry) => entry.userId === userId);
};

export const getAllIssuedBooks = () => {
	return readIssued();
};

export const returnBook = (issueId) => {
	const issued = readIssued();
	const updated = issued.map((entry) =>
		entry.id === issueId ? { ...entry, status: 'returned', returnedAt: new Date().toISOString() } : entry,
	);
	writeIssued(updated);
	return updated.find((entry) => entry.id === issueId);
};
export const approveRequest = (requestId) => {
  const issued = readIssued();
  const updated = issued.map((entry) =>
    entry.id === requestId ? { ...entry, status: 'issued', issuedAt: new Date().toISOString() } : entry,
  );
  writeIssued(updated);
  return updated.find((entry) => entry.id === requestId);
};

export const rejectRequest = (requestId) => {
  const issued = readIssued();
  const updated = issued.map((entry) =>
    entry.id === requestId ? { ...entry, status: 'rejected', rejectedAt: new Date().toISOString() } : entry,
  );
  writeIssued(updated);
  return updated.find((entry) => entry.id === requestId);
};

export const getPendingRequests = () => {
  const issued = readIssued();
  return issued.filter((entry) => entry.status === 'pending');
};