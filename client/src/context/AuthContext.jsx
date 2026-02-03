import React, { createContext, useContext, useMemo, useState } from 'react';
import { getCurrentUser, getDemoCredentials, login as loginService, logout as logoutService, register as registerService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => getCurrentUser());
	const [authError, setAuthError] = useState('');

	const login = ({ email, password, rememberMe }) => {
		const result = loginService({ email, password, rememberMe });
		if (result.error) {
			setAuthError(result.error);
			return { error: result.error };
		}

		setUser(result.user);
		setAuthError('');
		return { user: result.user };
	};

	const register = ({ name, email, password }) => {
		const result = registerService({ name, email, password });
		if (result.error) {
			setAuthError(result.error);
			return { error: result.error };
		}

		setUser(result.user);
		setAuthError('');
		return { user: result.user };
	};

	const logout = () => {
		logoutService();
		setUser(null);
	};

	const value = useMemo(
		() => ({
			user,
			authError,
			login,
			register,
			logout,
			isAuthenticated: Boolean(user),
			isAdmin: user?.role === 'admin',
			demoCredentials: getDemoCredentials(),
		}),
		[user, authError],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
