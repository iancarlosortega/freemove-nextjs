import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IUser {
	id: string;
	name: string;
	email: string;
	createdAt: Timestamp;
	role: UsersRoles;
	provider: UsersProviders;
}

export interface IUserDb extends IUser {
	age?: number;
	phone?: string;
	gender?: string;
	identificationCard?: string;
	country?: string;
	city?: string;
	canton?: string;
	weight?: number;
	height?: number;
	followers?: DocumentReference[];
	following?: DocumentReference[];
	likes?: DocumentReference[];
	photoUrl?: string;
	photoFilename?: string;
	bannerUrl?: string;
	bannerFilename?: string;
}

export enum UsersProviders {
	EMAIL = 'email-password',
	GOOGLE = 'google.com',
	FACEBOOK = 'facebook.com',
}

export enum UsersRoles {
	ADMIN = 'ADMIN-ROLE',
	CLIENT = 'CLIENT-ROLE',
}
