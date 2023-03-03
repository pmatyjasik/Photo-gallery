import { PhotosInterface } from 'types/types';

export async function fetchPagination(
	page = 1,
	perPage = 20
): Promise<PhotosInterface> {
	const response = await fetch(
		`https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`,
		{
			method: 'GET',
			headers: {
				Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY ?? '',
			},
		}
	);
	return response.json();
}
