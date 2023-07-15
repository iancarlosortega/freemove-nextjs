'use client';

import { useContext, useState } from 'react';
import { Baumans } from 'next/font/google';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button, InputAdornment, MenuItem, TextField } from '@mui/material';
import { Done } from '@mui/icons-material';

import { getCitiesByCountry } from '@/helpers';

import { AuthContext } from '@/context/auth';
import styles from './new-user.module.css';

const baumans = Baumans({
	subsets: ['latin'],
	weight: ['400'],
});

interface Props {
	countries: string[];
}

interface IFormValues {
	age?: number;
	phone?: string;
	gender?: string;
	identificationCard?: string;
	country?: string;
	city?: string;
	height: number;
	weight: number;
}

export const NewUserForm: React.FC<Props> = ({ countries }) => {
	const { user } = useContext(AuthContext);

	const [enabled, setEnabled] = useState(false);
	const {
		register,
		handleSubmit,
		getValues,
		resetField,
		formState: { dirtyFields, errors },
	} = useForm<IFormValues>();

	const { data, isFetching } = useQuery({
		queryKey: ['cities', getValues('country')],
		queryFn: () => getCitiesByCountry(getValues('country') as string),
		initialData: [],
		enabled: enabled,
	});

	const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setEnabled(true);
		resetField('city');
	};

	const onSubmit = async (data: IFormValues) => {
		let dirtyValues: any = {};
		Object.keys(dirtyFields).forEach(key => {
			const value = data[key as keyof IFormValues];
			if (!value) return;
			dirtyValues = {
				...dirtyValues,
				[key]: value,
			};
		});
		console.log(dirtyValues);
	};

	return (
		<>
			<h1 className={styles.title}>
				Bienvenido a <span className={baumans.className}>FreeMove</span>
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
							helperText={errors.age?.message?.toString()}
							{...register('age', {
								min: {
									value: 0,
									message: 'Debe ser un número positivo',
								},
							})}
						/>

						<TextField
							error={Boolean(errors['phone']?.message)}
							type='text'
							label='Teléfono'
							helperText={errors.phone?.message?.toString()}
							{...register('phone', {
								pattern: {
									value: /^(0|[1-9]\d*)(\.\d+)?$/,
									message: 'Debe ser un número de teléfono válido',
								},
							})}
						/>

						<TextField
							select
							label='Género'
							helperText={errors.gender?.message?.toString()}
							defaultValue=''
							{...register('gender')}>
							<MenuItem value='Masculino'>Masculino</MenuItem>
							<MenuItem value='Femenino'>Femenino</MenuItem>
							<MenuItem value='Otro'>Otro</MenuItem>
						</TextField>

						<TextField
							error={Boolean(errors['identificationCard']?.message)}
							type='text'
							label='Cédula'
							helperText={errors.identificationCard?.message?.toString()}
							{...register('identificationCard', {
								pattern: {
									value: /^(0|[1-9]\d*)(\.\d+)?$/,
									message: 'Debe ser un número de cédula válido',
								},
							})}
						/>

						<TextField
							select
							label='País'
							helperText={errors.country?.message?.toString()}
							defaultValue=''
							{...register('country', {
								onChange: handleChangeInput,
							})}>
							{countries.map(country => (
								<MenuItem key={country} value={country}>
									{country}
								</MenuItem>
							))}
						</TextField>

						<TextField
							disabled={getValues('country') === undefined || isFetching}
							select
							label='Ciudad'
							helperText={
								getValues('country') === undefined
									? 'Seleccione primero un país'
									: ''
							}
							defaultValue=''
							{...register('city')}>
							{(data as string[]).map(city => (
								<MenuItem key={city} value={city}>
									{city}
								</MenuItem>
							))}
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
							helperText={errors.height?.message?.toString()}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>cm</InputAdornment>
								),
							}}
							{...register('height', {
								required: 'Este campo es requerido',
								min: {
									value: 0,
									message: 'Debe ser un número positivo',
								},
							})}
						/>

						<TextField
							error={Boolean(errors['weight']?.message)}
							type='number'
							label='Peso'
							helperText={errors.weight?.message?.toString()}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>kg</InputAdornment>
								),
							}}
							{...register('weight', {
								required: 'Este campo es requerido',
								min: {
									value: 0,
									message: 'Debe ser un número positivo',
								},
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
		</>
	);
};
