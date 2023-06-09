'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { FacebookIcon, GoogleIcon } from '@/components/icons';
import styles from './page.module.css';

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: any) => console.log(data);

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginCard}>
				<header>
					<Link className={styles.loginLogo} href='/'>
						<Image
							width={200}
							height={200}
							src='/assets/logo-v2.png'
							alt='FreeMove Logo'
						/>
					</Link>
					{/* TODO: ALERT COMPONENT */}
					{/* <div className={styles.alert}alert--error'>
						<p>
							<strong>Error!</strong> El correo o contraseña son incorrectos
						</p>
					</div> */}
				</header>
				<form
					autoComplete='off'
					className={styles.loginForm}
					onSubmit={handleSubmit(onSubmit)}>
					<TextField
						error={Boolean(errors['email']?.message)}
						required
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
						required
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
						<input type='checkbox' id='remember' />
						<label htmlFor='remember'>Recordarme</label>
					</div>
					<div className={styles.forgotPassword}>
						<Link className={styles.register} href='/forgot-password'>
							¿Olvidaste tu contraseña?
						</Link>
					</div>

					<Button type='submit' className={styles.loginButton}>
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
				<Button className={styles.buttonOauth}>
					<GoogleIcon />
					Continuar con Google
				</Button>
				<Button className={styles.buttonOauth}>
					<FacebookIcon />
					Continuar con Facebook
				</Button>
				<footer className={styles.loginFooter}>
					<p>¿No tienes una cuenta?</p>
					<Link className={styles.register} href='/register'>
						Regístrate aquí
					</Link>
				</footer>
			</div>
		</div>
	);
}
