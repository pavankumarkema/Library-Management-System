const DEMO_USER = {
	id: 'demo-user',
	name: 'Demo User',
	email: 'demo@libratech.com',
	role: 'member',
};

const DEMO_PASSWORD = 'LibraTech#2026!';

const DEMO_ADMIN = {
	id: 'demo-admin',
	name: 'Admin User',
	email: 'admin@libratech.com',
	role: 'admin',
};

const DEMO_ADMIN_PASSWORD = 'Admin#2026!';

const USERS_KEY = 'libratech_users';
const CURRENT_USER_KEY = 'libratech_current_user';
const SESSION_USER_KEY = 'libratech_session_user';

const readUsers = () => {
	const stored = localStorage.getItem(USERS_KEY);
	try {
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
};

const writeUsers = (users) => {
	localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const persistCurrentUser = (user, rememberMe) => {
	if (rememberMe) {
		localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
		sessionStorage.removeItem(SESSION_USER_KEY);
	} else {
		sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
		localStorage.removeItem(CURRENT_USER_KEY);
	}
};

const clearCurrentUser = () => {
	localStorage.removeItem(CURRENT_USER_KEY);
	sessionStorage.removeItem(SESSION_USER_KEY);
};

export const getCurrentUser = () => {
	const stored = localStorage.getItem(CURRENT_USER_KEY) || sessionStorage.getItem(SESSION_USER_KEY);
	try {
		return stored ? JSON.parse(stored) : null;
	} catch {
		return null;
	}
};

export const login = ({ email, password, rememberMe }) => {
	const normalizedEmail = email.trim().toLowerCase();
	if (normalizedEmail === DEMO_USER.email && password === DEMO_PASSWORD) {
		persistCurrentUser(DEMO_USER, rememberMe);
		return { user: DEMO_USER };
	}

	if (normalizedEmail === DEMO_ADMIN.email && password === DEMO_ADMIN_PASSWORD) {
		persistCurrentUser(DEMO_ADMIN, rememberMe);
		return { user: DEMO_ADMIN };
	}

	const users = readUsers();
	const matched = users.find(
		(user) => user.email.toLowerCase() === normalizedEmail && user.password === password,
	);

	if (!matched) {
		return { error: 'Invalid email or password.' };
	}

	const { password: _, ...safeUser } = matched;
	persistCurrentUser(safeUser, rememberMe);
	return { user: safeUser };
};

export const register = ({ name, email, password }) => {
	const users = readUsers();
	const normalizedEmail = email.trim().toLowerCase();

	const exists = users.some((user) => user.email.toLowerCase() === normalizedEmail);
	if (exists) {
		return { error: 'An account with this email already exists.' };
	}

	const newUser = {
		id: `user-${Date.now()}`,
		name: name.trim(),
		email: normalizedEmail,
		role: 'member',
		password,
	};

	users.push(newUser);
	writeUsers(users);

	const { password: _, ...safeUser } = newUser;
	persistCurrentUser(safeUser, true);
	return { user: safeUser };
};

export const logout = () => {
	clearCurrentUser();
};

export const getDemoCredentials = () => ({
	member: {
		email: DEMO_USER.email,
		password: DEMO_PASSWORD,
	},
	admin: {
		email: DEMO_ADMIN.email,
		password: DEMO_ADMIN_PASSWORD,
	},
});

export const getAllUsers = () => {
	const users = readUsers().map(({ password, ...safeUser }) => safeUser);
	return [DEMO_USER, DEMO_ADMIN, ...users];
};
