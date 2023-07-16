import { IUser } from '@/interfaces';
import { AuthState } from './';

type AuthActionType =
	| { type: '[Auth] - Login'; payload: IUser }
	| { type: '[Auth] - Logout' }
	| { type: '[Auth] - Update Profile'; payload: IUser };

export const authReducer = (
	state: AuthState,
	action: AuthActionType
): AuthState => {
	switch (action.type) {
		case '[Auth] - Login':
			return {
				...state,
				isLoggedIn: true,
				user: action.payload,
			};

		case '[Auth] - Logout':
			return {
				...state,
				isLoggedIn: false,
				user: undefined,
			};

		case '[Auth] - Update Profile':
			return {
				...state,
				user: action.payload,
			};

		default:
			return state;
	}
};
