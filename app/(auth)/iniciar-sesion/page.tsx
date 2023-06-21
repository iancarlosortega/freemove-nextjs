'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
	Alert,
	Button,
	IconButton,
	InputAdornment,
	Snackbar,
	TextField,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import {
	ProvidersTypes,
	createDocument,
	signIn,
	signInWithProvider,
} from '@/firebase';
import { FacebookIcon, GoogleIcon, LogoGreen } from '@/components/icons';
import { IUserDb, UsersRoles } from '@/interfaces';

import styles from '../auth.module.css';

interface IFormValues {
	email: string;
	password: string;
	remember: boolean;
}

export default function LoginPage() {
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	if (typeof window !== 'undefined') {
		// Perform localStorage action
		const item = localStorage.getItem('key');
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IFormValues>({
		defaultValues: {
			email:
				(typeof window !== 'undefined' && localStorage.getItem('email')) || '',
			password: '',
			remember:
				typeof window !== 'undefined' &&
				localStorage.getItem('remember') === 'true'
					? true
					: false,
		},
	});

	const onSubmit = async (data: IFormValues) => {
		const { result, error } = await signIn(data.email, data.password);

		if (error) {
			setErrorMessage('¡Correo Electrónico o contraseña incorrectos!');
			return reset();
		}

		if (data.remember) {
			localStorage.setItem('email', data.email);
			localStorage.setItem('remember', 'true');
		} else {
			localStorage.removeItem('email');
			localStorage.removeItem('remember');
		}

		const { status } = await fetch('/api/login', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${await result!.user.getIdToken()}`,
			},
		});

		if (status !== 200) {
			setErrorMessage('Error al iniciar sesión');
			return reset();
		}

		return router.push('/dashboard');
	};

	const handleProviderSignIn = async (providerType: ProvidersTypes) => {
		const { result, error } = await signInWithProvider(providerType);

		if (error) {
			setErrorMessage('Error con el proveedor de autenticación');
			console.log(error);
			return reset();
		}

		const { status } = await fetch('/api/login', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${await result!.user.getIdToken()}`,
			},
		});

		if (status !== 200) {
			setErrorMessage('Error al iniciar sesión');
			return reset();
		}

		if (result && result.additionalUserInfo.isNewUser === true) {
			const user: IUserDb = {
				id: result.user?.uid!,
				name: result.user?.displayName!,
				email: result.user?.email!,
				photoUrl: result.user?.photoURL || null!,
				provider: result.additionalUserInfo?.providerId!,
				role: UsersRoles.CLIENT,
				createdAt: new Date(),
			};

			const { result: createResult, error: createError } = await createDocument(
				'users',
				user
			);

			if (createError) {
				setErrorMessage('Error al crear el usuario');
				console.log(createError);
				return reset();
			}

			return router.push('/nuevo-usuario');
		} else {
			const { redirect } = window.history.state;
			router.push(redirect || '/dashboard');
		}
	};

	const closeSnackBar = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setErrorMessage('');
	};

	return (
		<>
			<header>
				<Link className={styles.authLogo} href='/'>
					<LogoGreen />
				</Link>
				<Snackbar
					open={Boolean(errorMessage)}
					autoHideDuration={4000}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					onClose={closeSnackBar}>
					<Alert
						onClose={closeSnackBar}
						severity='error'
						sx={{ textAlign: 'center' }}>
						{errorMessage}
					</Alert>
				</Snackbar>
			</header>
			<form
				autoComplete='off'
				className={styles.authForm}
				onSubmit={handleSubmit(onSubmit)}>
				<TextField
					error={Boolean(errors['email']?.message)}
					type='email'
					label='Correo Electrónico'
					placeholder='example@gmail.com'
					variant='outlined'
					helperText={errors.email?.message?.toString()}
					sx={{
						my: 1,
					}}
					{...register('email', {
						required: 'Este campo es requerido',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Por favor, ingrese un email válido',
						},
					})}
				/>
				<TextField
					error={Boolean(errors['password']?.message)}
					type={showPassword ? 'text' : 'password'}
					label='Contraseña'
					placeholder='********'
					variant='outlined'
					sx={{
						my: 1,
					}}
					helperText={errors.password?.message?.toString()}
					{...register('password', {
						required: 'Este campo es requerido',
						minLength: {
							value: 6,
							message: 'Debe tener mínimo 6 caracteres',
						},
					})}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={() => setShowPassword(!showPassword)}
									edge='end'>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<div className={styles.remember}>
					<input type='checkbox' id='remember' {...register('remember')} />
					<label htmlFor='remember'>Recordarme</label>
				</div>
				<div className={styles.forgotPassword}>
					<Link className={styles.register} href='/reestablecer-contrasenia'>
						¿Olvidaste tu contraseña?
					</Link>
				</div>
				<Button type='submit' variant='primary'>
					Iniciar Sesión
				</Button>
				<div className={styles.divider}>
					<hr />
					<div className={styles.mid}>
						<p>o</p>
					</div>
					<hr />
				</div>
			</form>
			<Button
				fullWidth
				variant='oauth'
				onClick={() => handleProviderSignIn('google')}>
				<GoogleIcon />
				Continuar con Google
			</Button>
			<Button
				fullWidth
				variant='oauth'
				onClick={() => handleProviderSignIn('facebook')}>
				<FacebookIcon />
				Continuar con Facebook
			</Button>
			<footer className={styles.authFooter}>
				<p>¿No tienes una cuenta?</p>
				<Link className={styles.register} href='/registrarse'>
					Regístrate aquí
				</Link>
			</footer>
		</>
	);
}
