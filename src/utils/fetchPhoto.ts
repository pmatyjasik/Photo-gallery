import { Photo } from 'types/types';

export async function fetchPhoto(id: string): Promise<Photo> {
	const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
		method: 'GET',
		headers: {
			Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY ?? '',
		},
	});
	return response.json();
}
