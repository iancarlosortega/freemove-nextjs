'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { ArrowCircleLeftRounded, EmailRounded } from '@mui/icons-material';

import { resetPassword } from '@/firebase';

import styles from './reset-password.module.css';

interface IFormValues {
	email: string;
}

export default function ResetPasswordPage() {
	const [errorMessage, setErrorMessage] = useState<string>('');
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IFormValues>();

	const onSubmit = async (data: IFormValues) => {
		const { result, error } = await resetPassword(data.email);

		if (error) {
			console.log(error);
			setErrorMessage('Usuario no encontrado, pruebe otro email');
			return reset();
		}

		return router.push('/iniciar-sesion');
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
			<div className={styles.header}>
				<Link href='/iniciar-sesion'>
					<ArrowCircleLeftRounded />
				</Link>
				<h3>Reestablecer contraseña</h3>
			</div>
			<form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
				<TextField
					fullWidth
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
				<div className={styles.formButton}>
					<Button type='submit' variant='primary'>
						Enviar email
						<EmailRounded />
					</Button>
				</div>
			</form>
		</>
	);
}
