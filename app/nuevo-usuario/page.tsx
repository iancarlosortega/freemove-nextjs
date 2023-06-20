'use client';

import { useForm } from 'react-hook-form';
import { Button, InputAdornment, MenuItem, TextField } from '@mui/material';
import { Done } from '@mui/icons-material';

import styles from './new-user.module.css';

interface IFormValues {
	age: number;
	phone: string;
	gender: string;
	height: number;
	weight: number;
}

export default function NewUserPage() {
	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState: { errors },
	} = useForm<IFormValues>();

	const onSubmit = async (data: IFormValues) => {
		console.log(data);
	};

	return (
		<main className='container'>
			<h1 className={styles.title}>
				Bienvenido a <span>FreeMove</span>
			</h1>

			<form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
				<section className={styles.section}>
					<h2>Datos generales (opcionales)</h2>
					<p>
						Estos datos podrán permitir a la aplicación saber más sobre usted, y
						así sugerirle mejores recomendaciones.
					</p>
					<div className={styles.formInputs}>
						<TextField
							error={Boolean(errors['age']?.message)}
							type='number'
							label='Edad'
							variant='outlined'
							helperText={errors.age?.message?.toString()}
							{...register('age', {
								required: 'Este campo es requerido',
							})}
						/>

						<TextField
							error={Boolean(errors['phone']?.message)}
							type='text'
							label='Teléfono'
							variant='outlined'
							helperText={errors.phone?.message?.toString()}
							{...register('phone', {
								required: 'Este campo es requerido',
							})}
						/>

						<TextField
							select
							label='Género'
							helperText={errors.gender?.message?.toString()}
							{...register('gender', {
								required: 'Este campo es requerido',
							})}>
							<MenuItem value='Masculino'>Masculino</MenuItem>
							<MenuItem value='Femenino'>Femenino</MenuItem>
							<MenuItem value='Otro'>Otro</MenuItem>
						</TextField>
					</div>
				</section>

				<section className={styles.section}>
					<h2>Datos de salud (obligatorios)</h2>
					<p>
						Estos datos son obligatorios para que la aplicación pueda hacer los
						cálculos sobre el estado de salud del atleta.
					</p>
					<div className={styles.formInputs}>
						<TextField
							error={Boolean(errors['height']?.message)}
							type='number'
							label='Estatura'
							variant='outlined'
							helperText={errors.height?.message?.toString()}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>cm</InputAdornment>
								),
							}}
							{...register('height', {
								required: 'Este campo es requerido',
							})}
						/>

						<TextField
							error={Boolean(errors['weight']?.message)}
							type='number'
							label='Peso'
							variant='outlined'
							helperText={errors.weight?.message?.toString()}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>kg</InputAdornment>
								),
							}}
							{...register('weight', {
								required: 'Este campo es requerido',
							})}
						/>
					</div>
				</section>
				<div className='flex-center'>
					<Button variant='primary' type='submit'>
						Continuar
						<Done />
					</Button>
				</div>
			</form>
		</main>
	);
}