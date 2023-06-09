'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

import styles from '../auth.module.css';

export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: any) => console.log(data);

	return (
		<div className={styles.authContainer}>
			<div className={styles.authCard}>
				<header>
					<Link className={styles.authLogo} href='/'>
						<Image
							width={200}
							height={200}
							src='/assets/logo-v2.png'
							alt='FreeMove Logo'
						/>
					</Link>
					{/* <div @fade *ngIf="isError" className={styles.alert}alert--error">
        <p><strong>Error!</strong> El correo ingresado ya está en uso</p>
      </div> */}
				</header>
				<form
					autoComplete='off'
					className={styles.authForm}
					onSubmit={handleSubmit(onSubmit)}>
					<TextField
						error={Boolean(errors['name']?.message)}
						type='text'
						label='Nombres y Apellidos'
						placeholder='Juan Pérez'
						variant='outlined'
						autoFocus
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
						type='password'
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
					/>

					<TextField
						error={Boolean(errors['confirmPassword']?.message)}
						type='password'
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
								value !== getValues('password')
									? 'Las contraseñas no coinciden'
									: '',
						})}
					/>
					<Button type='submit' className={styles.authButton}>
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
