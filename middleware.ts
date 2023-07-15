import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest, response: NextResponse) {
	const token = request.cookies.get('token');

	//Return to Login Page if don't have a token
	if (!token) {
		return NextResponse.redirect(new URL('/iniciar-sesion', request.url));
	}

	return NextResponse.next();
}

//Add your protected routes
export const config = {
	matcher: ['/nuevo-usuario', '/dashboard'],
};
