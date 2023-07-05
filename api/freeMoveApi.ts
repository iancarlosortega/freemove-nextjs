import axios from 'axios';

export const freeMoveApi = axios.create({
	baseURL: 'http://localhost:4000/api',
});
