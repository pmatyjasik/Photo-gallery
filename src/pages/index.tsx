import type { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useEffect, useState, useRef, useMemo } from 'react';
import { fetchPagination } from 'utils/fetchPagination';
import { PhotosInterface } from 'types/types';
import GridItem from 'components/GridItem';
import { FaMinus, FaPlus } from 'react-icons/fa';
import PerPageButton from 'components/PerPageButton';

const Home = ({
	serverSideRenderedPhotos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(20);
	const [photos, setPhotos] = useState<PhotosInterface>(
		serverSideRenderedPhotos
	);

	const isFirstMount = useRef<boolean>(true);
	const maxPage = useMemo(
		() => Math.ceil(photos.total_results / perPage),
		[photos.total_results, perPage]
	);

	const handleSetPerPage = (perPage: number) => {
		setPerPage(perPage);
		setPage(1);
	};

	useEffect(() => {
		if (isFirstMount.current) {
			isFirstMount.current = false;
			return;
		}
		fetchPagination(page, perPage).then((newPhotos) => setPhotos(newPhotos));
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [page, perPage]);

	return (
		<>
			<Head>
				<title>Home</title>
				<meta name="description" content="Homepage - mohi.to" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="grid grid-auto gap-7">
				{photos.photos?.map(({ id, alt, src: { large } }) => (
					<GridItem key={id} image={large} imageAlt={alt} id={id} />
				))}
			</div>
			<div className="flex flex-row justify-between mt-6">
				<div className="flex flex-row items-center justify-center gap-x-2">
					<FaMinus
						className={`${
							page === 1 ? 'pointer-events-none opacity-20' : 'cursor-pointer'
						} text-primary h-5 w-5`}
						onClick={() => setPage((prev) => prev - 1)}
					/>
					<span className="text-2xl shadow-2xl text-secondary">{page}</span>
					<FaPlus
						className={`${
							page === maxPage
								? 'pointer-events-none opacity-20'
								: 'cursor-pointer'
						} text-primary h-5 w-5`}
						onClick={() => setPage((prev) => prev + 1)}
					/>
				</div>
				<div className="flex flex-row items-center justify-between text-xl gap-x-2">
					<PerPageButton
						perPage={20}
						currentPerPage={perPage}
						onClick={() => handleSetPerPage(20)}
					/>{' '}
					<PerPageButton
						perPage={40}
						currentPerPage={perPage}
						onClick={() => handleSetPerPage(40)}
					/>{' '}
					<PerPageButton
						perPage={60}
						currentPerPage={perPage}
						onClick={() => handleSetPerPage(60)}
					/>
				</div>
			</div>
		</>
	);
};

export default Home;

export async function getServerSideProps() {
	const serverSideRenderedPhotos = await fetchPagination();
	return {
		props: {
			serverSideRenderedPhotos,
		},
	};
}
