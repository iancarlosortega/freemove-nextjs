'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { FacebookIcon, GoogleIcon, LogoGreen } from '@/components/icons';
import styles from '../auth.module.css';
import signIn from '@/firebase/auth/signIn';

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data: any) => {
		const { result, error } = await signIn(data.email, data.password);

		if (error) {
			return console.log(error);
		}

		console.log(result);
		return router.push('/dashboard');
	};

	return (
		<div className={styles.authContainer}>
			<div className={styles.authCard}>
				<header>
					<Link className={styles.authLogo} href='/'>
						<LogoGreen />
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
						<input type='checkbox' id='remember' />
						<label htmlFor='remember'>Recordarme</label>
					</div>
					<div className={styles.forgotPassword}>
						<Link className={styles.register} href='/forgot-password'>
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
				<Button fullWidth variant='oauth'>
					<GoogleIcon />
					Continuar con Google
				</Button>
				<Button fullWidth variant='oauth'>
					<FacebookIcon />
					Continuar con Facebook
				</Button>
				<footer className={styles.authFooter}>
					<p>¿No tienes una cuenta?</p>
					<Link className={styles.register} href='/auth/register'>
						Regístrate aquí
					</Link>
				</footer>
			</div>
		</div>
	);
}
