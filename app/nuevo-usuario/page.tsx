import { NewUserForm } from './NewUserForm';
import { getCountries } from '@/helpers';

export default async function NewUserPage() {
	const countries = await getCountries();

	return (
		<main className='container'>
			<NewUserForm countries={countries as string[]} />
		</main>
	);
}
