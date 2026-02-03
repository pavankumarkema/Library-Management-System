const BOOKS_KEY = 'libratech_books';

const INITIAL_BOOKS = [
	{
		id: 'bk-001',
		title: 'Atomic Habits',
		author: 'James Clear',
		category: 'Self-Help',
	},
	{
		id: 'bk-002',
		title: 'Clean Code',
		author: 'Robert C. Martin',
		category: 'Programming',
	},
	{
		id: 'bk-003',
		title: 'The Pragmatic Programmer',
		author: 'Andrew Hunt, David Thomas',
		category: 'Programming',
	},
	{
		id: 'bk-004',
		title: 'Deep Work',
		author: 'Cal Newport',
		category: 'Productivity',
	},
	{
		id: 'bk-005',
		title: 'The Alchemist',
		author: 'Paulo Coelho',
		category: 'Fiction',
	},
	{
		id: 'bk-006',
		title: 'Sapiens: A Brief History of Humankind',
		author: 'Yuval Noah Harari',
		category: 'History',
	},
	{
		id: 'bk-007',
		title: 'The Psychology of Money',
		author: 'Morgan Housel',
		category: 'Finance',
	},
	{
		id: 'bk-008',
		title: 'The Lean Startup',
		author: 'Eric Ries',
		category: 'Business',
	},
	{
		id: 'bk-009',
		title: 'Ikigai',
		author: 'Hector Garcia, Francesc Miralles',
		category: 'Lifestyle',
	},
	{
		id: 'bk-010',
		title: 'The Subtle Art of Not Giving a F*ck',
		author: 'Mark Manson',
		category: 'Self-Help',
	},
	{
		id: 'bk-011',
		title: 'Zero to One',
		author: 'Peter Thiel',
		category: 'Business',
	},
	{
		id: 'bk-012',
		title: 'Thinking, Fast and Slow',
		author: 'Daniel Kahneman',
		category: 'Psychology',
	},
	{
		id: 'bk-013',
		title: 'The 7 Habits of Highly Effective People',
		author: 'Stephen R. Covey',
		category: 'Self-Help',
	},
	{
		id: 'bk-014',
		title: 'Start With Why',
		author: 'Simon Sinek',
		category: 'Leadership',
	},
	{
		id: 'bk-015',
		title: 'A Brief History of Time',
		author: 'Stephen Hawking',
		category: 'Science',
	},
	{
		id: 'bk-016',
		title: 'Designing Data-Intensive Applications',
		author: 'Martin Kleppmann',
		category: 'Programming',
	},
	{
		id: 'bk-017',
		title: 'You Don’t Know JS Yet',
		author: 'Kyle Simpson',
		category: 'Programming',
	},
	{
		id: 'bk-018',
		title: 'Learning React',
		author: 'Alex Banks, Eve Porcello',
		category: 'Programming',
	},
	{
		id: 'bk-019',
		title: 'Kubernetes Up & Running',
		author: 'Brendan Burns, Joe Beda, Kelsey Hightower',
		category: 'Cloud',
	},
	{
		id: 'bk-020',
		title: 'Terraform: Up & Running',
		author: 'Yevgeniy Brikman',
		category: 'Cloud',
	},
	{
		id: 'bk-021',
		title: 'System Design Interview – An Insider’s Guide',
		author: 'Alex Xu',
		category: 'System Design',
	},
	{
		id: 'bk-022',
		title: 'Practical GitOps',
		author: 'J. Ackerman, M. Hermann, D. Lavi',
		category: 'DevOps',
	},
	{
		id: 'bk-023',
		title: 'The Phoenix Project',
		author: 'Gene Kim, Kevin Behr, George Spafford',
		category: 'DevOps',
	},
	{
		id: 'bk-024',
		title: 'Hands-On Machine Learning',
		author: 'Aurélien Géron',
		category: 'AI/ML',
	},
	{
		id: 'bk-025',
		title: 'Grokking Algorithms',
		author: 'Aditya Bhargava',
		category: 'Programming',
	},
	{
		id: 'bk-026',
		title: 'Eloquent JavaScript',
		author: 'Marijn Haverbeke',
		category: 'Programming Language',
	},
	{
		id: 'bk-027',
		title: 'Effective Java',
		author: 'Joshua Bloch',
		category: 'Programming Language',
	},
	{
		id: 'bk-028',
		title: 'Python Crash Course',
		author: 'Eric Matthes',
		category: 'Programming Language',
	},
	{
		id: 'bk-029',
		title: 'C Programming Language',
		author: 'Brian W. Kernighan, Dennis M. Ritchie',
		category: 'Programming Language',
	},
	{
		id: 'bk-030',
		title: 'The Rust Programming Language',
		author: 'Steve Klabnik, Carol Nichols',
		category: 'Programming Language',
	},
	{
		id: 'bk-031',
		title: 'Programming TypeScript',
		author: 'Boris Cherny',
		category: 'Programming Language',
	},
	{
		id: 'bk-032',
		title: 'Kotlin in Action',
		author: 'Dmitry Jemerov, Svetlana Isakova',
		category: 'Programming Language',
	},
	{
		id: 'bk-033',
		title: 'Go in Action',
		author: 'William Kennedy, Brian Ketelsen, Erik St. Martin',
		category: 'Programming Language',
	},
	{
		id: 'bk-034',
		title: 'The Swift Programming Language',
		author: 'Apple Inc.',
		category: 'Programming Language',
	},
];

const readBooks = () => {
	const stored = localStorage.getItem(BOOKS_KEY);
	try {
		if (!stored) {
			writeBooks(INITIAL_BOOKS);
			return INITIAL_BOOKS;
		}
		return JSON.parse(stored);
	} catch {
		return INITIAL_BOOKS;
	}
};

const writeBooks = (books) => {
	localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
};

export const getBooks = () => readBooks();

export const getBookById = (id) => {
	const books = readBooks();
	return books.find((book) => book.id === id);
};

export const addBook = ({ title, author, category }) => {
	const books = readBooks();
	const newBook = {
		id: `bk-${Date.now()}`,
		title: title.trim(),
		author: author.trim(),
		category: category.trim(),
	};
	books.push(newBook);
	writeBooks(books);
	return newBook;
};

export const deleteBook = (bookId) => {
	const books = readBooks();
	const updated = books.filter((book) => book.id !== bookId);
	writeBooks(updated);
	return updated;
};
