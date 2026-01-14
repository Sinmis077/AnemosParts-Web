import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/app/services/authService';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			const response = await authService.me();
			setUser(response.data);
		} catch {
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (email, password) => {
		const response = await authService.login(email, password);
		await checkAuth();
		return response;
	};

	const register = async (data) => {
		const response = await authService.register(data);
		await checkAuth();
		return response;
	};

	const logout = async () => {
		await authService.logout();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, login, register, logout, checkAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}