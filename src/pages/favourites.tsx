import GridItem from 'components/GridItem';
import useLocalStorage from 'hooks/useLocalStorage';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Photo } from 'types/types';
import { fetchPhoto } from 'utils/fetchPhoto';

const DEFAULT_VALUE: number[] = [];

const Favourites = () => {
	const [value, setValue] = useLocalStorage<number[]>(DEFAULT_VALUE, 'photoId');
	const [photos, setPhotos] = useState<Photo[]>([]);

	useEffect(() => {
		if (value) {
			Promise.all(value.map((item) => fetchPhoto(item)))
				.then((photo) => setPhotos(photo))
				.catch((err) => {
					if (err instanceof Error) toast.error(err.message);
				});
		}
	}, [value]);

	return (
		<>
			<Head>
				<title>Favourites</title>
				<meta name="description" content="Favourites" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex justify-end">
				{value.length !== 0 && (
					<button
						className="p-2 rounded-lg bg-primary text-basic"
						onClick={() => setValue([])}
					>
						Clear favourites
					</button>
				)}
			</div>
			<div className="grid grid-auto gap-7">
				{photos?.map(({ id, alt, src: { large } }) => (
					<GridItem key={id} image={large} imageAlt={alt} id={id} />
				))}
			</div>
		</>
	);
};

export default Favourites;
