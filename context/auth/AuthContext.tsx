import { createContext } from 'react';
import { IUser } from '@/interfaces';

interface ContextProps {
	isLoggedIn: boolean;
	user?: IUser;
	loginUser: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
	registerUser: (
		email: string,
		password: string,
		name: string
	) => Promise<{
		hasError: boolean;
		message?: string;
	}>;
	updateProfile: (
		userId: string,
		data: Partial<IUser>
	) => Promise<{ hasError: boolean; message?: string }>;
}

export const AuthContext = createContext({} as ContextProps);
