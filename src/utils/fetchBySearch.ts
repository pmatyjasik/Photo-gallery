import { PhotosInterface } from 'types/types';

export async function fetchBySearch(
	page = 1,
	perPage = 20,
	query: string
): Promise<PhotosInterface> {
	const response = await fetch(
		`https://api.pexels.com/v1/search/?page=${page}&per_page=${perPage}&query=${query}`,
		{
			method: 'GET',
			headers: {
				Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY ?? '',
			},
		}
	);
	return response.json();
}
