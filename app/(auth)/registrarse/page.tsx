'use client';

import { useContext, useState } from 'react';
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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LogoGreen } from '@/components/icons';
import { AuthContext } from '@/context/auth';
import styles from '../auth.module.css';

interface IFormValues {
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function RegisterPage() {
	const { registerUser } = useContext(AuthContext);

	const [errorMessage, setErrorMessage] = useState<string>('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		formState: { errors },
	} = useForm<IFormValues>();

	const onSubmit = async (formValues: IFormValues) => {
		setErrorMessage('');
		const { email, password, fullName } = formValues;
		const { hasError, message } = await registerUser(email, password, fullName);
		if (hasError) {
			setErrorMessage(message || 'Error al registrar el usuario');
			setError('email', { type: 'custom' });
			setTimeout(() => {
				setErrorMessage('');
			}, 3000);
			return;
		}
		router.push('/nuevo-usuario');
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
					error={Boolean(errors['fullName'])}
					type='text'
					label='Nombres y Apellidos'
					variant='outlined'
					helperText={errors.fullName?.message?.toString()}
					sx={{
						my: 1,
					}}
					{...register('fullName', {
						required: 'Este campo es requerido',
					})}
				/>
				<TextField
					error={Boolean(errors['email'])}
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
					error={Boolean(errors['password'])}
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
							value: 8,
							message: 'Debe tener mínimo 8 caracteres',
						},
						pattern: {
							value:
								/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
							message:
								'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial',
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
					error={Boolean(errors['confirmPassword'])}
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
						pattern: {
							value:
								/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
							message:
								'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial',
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
					<Link className={styles.register} href='/iniciar-sesion'>
						Ingresa aquí
					</Link>
				</footer>
			</form>
		</>
	);
}
