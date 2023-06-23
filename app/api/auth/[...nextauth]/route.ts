import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				email: {
					label: 'Correo',
					type: 'email',
					placeholder: 'correo@google.com',
				},
				password: {
					label: 'Contraseña',
					type: 'password',
					placeholder: 'Contraseña',
				},
			},
			async authorize(credentials): Promise<any> {
				// return await dbUsers.checkUserEmailPassword(
				// 	credentials!.email,
				// 	credentials!.password
				// );
			},
		}),
	],
});

export { handler as GET, handler as POST }