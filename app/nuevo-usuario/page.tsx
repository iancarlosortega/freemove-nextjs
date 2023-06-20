import { getCountries } from '@/helpers';
import { NewUserForm } from './NewUserForm';

export default async function NewUserPage() {
	const countries = await getCountries();

	return (
		<main className='container'>
			<NewUserForm countries={countries as string[]} />
		</main>
	);
}
