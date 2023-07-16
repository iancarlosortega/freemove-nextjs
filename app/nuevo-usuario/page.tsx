'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Baumans } from 'next/font/google';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
	Alert,
	Button,
	CircularProgress,
	InputAdornment,
	MenuItem,
	Snackbar,
	TextField,
} from '@mui/material';
import { ArrowDropDown, Done } from '@mui/icons-material';

import { AuthContext } from '@/context/auth';
import { Loading } from '@/components';
import { getCitiesByCountry, getCountries } from '@/helpers';

import styles from './new-user.module.css';

const baumans = Baumans({
	subsets: ['latin'],
	weight: ['400'],
});

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

export default function NewUserPage() {
	const { updateProfile, user } = useContext(AuthContext);

	const [errorMessage, setErrorMessage] = useState<string>('');
	const [enabled, setEnabled] = useState(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		getValues,
		resetField,
		reset,
		formState: { dirtyFields, errors },
	} = useForm<IFormValues>();

	useEffect(() => {
		reset(user);
	}, [reset, user]);

	const { data: countries, isFetching: isFetchingCountries } = useQuery({
		queryKey: ['countries'],
		queryFn: () => getCountries(),
		initialData: [],
	});

	const { data: cities, isFetching: isFetchingCities } = useQuery({
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
				[key]:
					key === 'phone' ||
					key === 'identificationCard' ||
					isNaN(value as number)
						? value
						: Number(value),
			};
		});

		const { hasError, message } = await updateProfile(user!._id, dirtyValues);
		if (hasError) {
			setErrorMessage(message || 'Error al registrar el usuario');
			return;
		}
		router.push('/dashboard');
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

	return isFetchingCountries && user === undefined ? (
		<Loading />
	) : (
		<div className='fadeIn container'>
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
							error={Boolean(errors['age'])}
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
							error={Boolean(errors['phone'])}
							type='text'
							label='Teléfono'
							helperText={errors.phone?.message?.toString()}
							{...register('phone', {
								pattern: {
									value: /^(0|[0-9]\d*)(\.\d+)?$/,
									message: 'Debe ser un número de teléfono válido',
								},
							})}
						/>

						<TextField
							select
							label='Género'
							helperText={errors.gender?.message?.toString()}
							value={getValues('gender') || ''}
							{...register('gender')}>
							<MenuItem value='Masculino'>Masculino</MenuItem>
							<MenuItem value='Femenino'>Femenino</MenuItem>
							<MenuItem value='Otro'>Otro</MenuItem>
						</TextField>

						<TextField
							error={Boolean(errors['identificationCard'])}
							type='text'
							label='Cédula'
							helperText={errors.identificationCard?.message?.toString()}
							{...register('identificationCard', {
								pattern: {
									value: /^(0|[0-9]\d*)(\.\d+)?$/,
									message: 'Debe ser un número de cédula válido',
								},
							})}
						/>

						<TextField
							select
							label='País'
							helperText={errors.country?.message?.toString()}
							value={getValues('country') || ''}
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
							disabled={
								!getValues('country') || isFetchingCities || cities.length === 0
							}
							select
							label='Ciudad'
							helperText={
								!getValues('country') ? 'Seleccione primero un país' : ''
							}
							value={getValues('city') || ''}
							SelectProps={{
								IconComponent: _props => (
									<div>
										{isFetchingCities ? (
											<CircularProgress
												color='inherit'
												size={25}
												sx={{
													marginTop: '5px',
													marginRight: '15px',
												}}
											/>
										) : (
											<ArrowDropDown {..._props} />
										)}
									</div>
								),
							}}
							{...register('city')}>
							{(cities as string[]).map(city => (
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
							error={Boolean(errors['height'])}
							type='number'
							label='Estatura'
							helperText={errors.height?.message?.toString()}
							inputProps={{
								step: '0.01',
							}}
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
								pattern: {
									value: /^\d+(\.\d{1,2})?$/,
									message: 'Máximo 2 decimales permitidos',
								},
							})}
						/>

						<TextField
							error={Boolean(errors['weight'])}
							type='number'
							label='Peso'
							helperText={errors.weight?.message?.toString()}
							inputProps={{
								step: '0.01',
							}}
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
								pattern: {
									value: /^\d+(\.\d{1,2})?$/,
									message: 'Máximo 2 decimales permitidos',
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
		</div>
	);
}
