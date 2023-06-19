'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Timestamp } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import {
	Alert,
	Button,
	IconButton,
	InputAdornment,
	Snackbar,
	TextField,
} from '@mui/material';

import { createDocument, signUp } from '@/firebase';
import { LogoGreen } from '@/components/icons';
import { IUser, UsersProviders, UsersRoles } from '@/interfaces';

import styles from '../auth.module.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface IFormValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function RegisterPage() {
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm<IFormValues>();

	const onSubmit = async (data: IFormValues) => {
		const { result, error } = await signUp(data.email, data.password);

		if (error) {
			setErrorMessage('Error al registrar el usuario');
			return reset();
		}

		const user: IUser = {
			id: result!.user.uid,
			email: data.email,
			name: data.name,
			role: UsersRoles.CLIENT,
			provider: UsersProviders.EMAIL,
			createdAt: Timestamp.now(),
		};

		try {
			await createDocument('users', user);
			return router.push('/nuevo-usuario');
		} catch (error) {
			setErrorMessage('Error al crear el usuario');
			return reset();
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
		<div className={styles.authContainer}>
			<div className={styles.authCard}>
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
						error={Boolean(errors['name']?.message)}
						type='text'
						label='Nombres y Apellidos'
						variant='outlined'
						helperText={errors.name?.message?.toString()}
						sx={{
							my: 1,
						}}
						{...register('name', {
							required: 'Este campo es requerido',
						})}
					/>
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

					<TextField
						error={Boolean(errors['confirmPassword']?.message)}
						type={showConfirmPassword ? 'text' : 'password'}
						label='Confirmar Contraseña'
						placeholder='********'
						variant='outlined'
						sx={{
							my: 1,
						}}
						helperText={errors.confirmPassword?.message?.toString()}
						{...register('confirmPassword', {
							required: 'Este campo es requerido',
							minLength: {
								value: 6,
								message: 'Debe tener mínimo 6 caracteres',
							},
							validate: value =>
								value === getValues('password')
									? true
									: 'Las contraseñas no coinciden',
						})}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										edge='end'>
										{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Button type='submit' variant='primary'>
						Registrarse
					</Button>
					<footer className={styles.authFooter}>
						<p>¿Ya tienes una cuenta?</p>
						<Link className={styles.register} href='/auth/login'>
							Ingresa aquí
						</Link>
					</footer>
				</form>
			</div>
		</div>
	);
}
