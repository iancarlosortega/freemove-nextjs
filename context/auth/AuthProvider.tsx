import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { freeMoveApi } from '@/api/freeMoveApi';
import { IUser } from '@/interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
	isLoggedIn: boolean;
	user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	user: undefined,
};

interface Props {
	children?: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
	const router = useRouter();

	useEffect(() => {
		checkToken();
	}, []);

	const checkToken = async () => {
		if (!Cookies.get('token')) return;
		try {
			const { data } = await freeMoveApi.get('/auth/check-status', {
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`,
				},
			});
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });
		} catch (error) {
			console.log(error);
			Cookies.remove('token');
			router.push('/iniciar-sesion');
		}
	};

	const loginUser = async (
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			const { data } = await freeMoveApi.post('/auth/login', {
				email,
				password,
			});
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });
			return true;
		} catch (error) {
			return false;
		}
	};

	const registerUser = async (
		email: string,
		password: string,
		fullName: string
	): Promise<{ hasError: boolean; message?: string }> => {
		try {
			const { data } = await freeMoveApi.post('/auth/register', {
				email,
				password,
				fullName,
			});
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });
			return {
				hasError: false,
			};
		} catch (err) {
			if (axios.isAxiosError(err)) {
				return {
					hasError: true,
					message: err.response?.data.message || 'No se pudo crear el usuario',
				};
			}

			return {
				hasError: true,
				message: 'No se pudo crear el usuario',
			};
		}
	};

	const logout = () => {
		Cookies.remove('token');
		router.refresh();
	};

	const updateProfile = async (
		userId: string,
		user: Partial<IUser>
	): Promise<{ hasError: boolean; message?: string }> => {
		try {
			const { data } = await freeMoveApi.patch(`/users/${userId}`, user);
			dispatch({ type: '[Auth] - Update Profile', payload: data });
			return {
				hasError: false,
			};
		} catch (err) {
			if (axios.isAxiosError(err)) {
				return {
					hasError: true,
					message:
						err.response?.data.message || 'No se pudo actualizar el perfil',
				};
			}

			return {
				hasError: true,
				message: 'No se pudo actualizar el perfil',
			};
		}
	};

	return (
		<AuthContext.Provider
			value={{ ...state, loginUser, registerUser, logout, updateProfile }}>
			{children}
		</AuthContext.Provider>
	);
};
