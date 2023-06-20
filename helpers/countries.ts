import { ApiResponse, Country } from '@/interfaces';

const baseUrl = 'https://countriesnow.space/api/v0.1';

export async function getCountries() {
	const response = await fetch(`${baseUrl}/countries/iso`);
	const countries: ApiResponse = await response.json();
	return (countries.data as Country[]).map((country: Country) => country.name);
}

export async function getCitiesByCountry(country: string) {
	const response = await fetch(`${baseUrl}/countries/cities`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ country }),
	});
	const cities: ApiResponse = await response.json();
	return cities.data;
}
