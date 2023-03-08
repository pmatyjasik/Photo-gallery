import Head from 'next/head';
import { useEffect, useState, useMemo, ChangeEvent } from 'react';
import { fetchPagination } from 'utils/fetchPagination';
import { fetchBySearch } from 'utils/fetchBySearch';
import { PhotosInterface } from 'types/types';
import GridItem from 'components/GridItem';
import { FaMinus, FaPlus } from 'react-icons/fa';
import PerPageButton from 'components/PerPageButton';
import toast from 'react-hot-toast';
import useDebounce from 'hooks/useDebounce';

const Home = () => {
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(20);
	const [photos, setPhotos] = useState<PhotosInterface>();
	const [searchValue, setSearchValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const debouncedSearchValue = useDebounce(searchValue, 300);

	const maxPage = useMemo(
		() => Math.ceil(photos?.total_results ?? 1 / perPage),
		[photos?.total_results, perPage]
	);

	const handleSetPerPage = (perPage: number) => {
		setPerPage(perPage);
		setPage(1);
	};

	const handleChangeInput = ({
		target: { value },
	}: ChangeEvent<HTMLInputElement>) => {
		if (value === '') {
			setSearchValue(value);
			setPage(1);
			setPerPage(20);
		} else {
			setSearchValue(value);
		}
	};

	useEffect(() => {
		if (debouncedSearchValue === '') {
			setIsLoading(true);
			fetchPagination(page, perPage)
				.then(setPhotos)
				.catch((err) => {
					if (err instanceof Error) toast.error(err.message);
				})
				.finally(() => setIsLoading(false));
		} else {
			setIsLoading(true);
			fetchBySearch(page, perPage, debouncedSearchValue)
				.then(setPhotos)
				.catch((err) => {
					if (err instanceof Error) toast.error(err.message);
				})
				.finally(() => setIsLoading(false));
		}
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [debouncedSearchValue, page, perPage]);

	return (
		<>
			<Head>
				<title>Home</title>
				<meta name="description" content="Homepage" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<input
				type="search"
				className="block w-full p-4 pl-10 my-4 text-black bg-white border rounded-lg shadow-x border-primary"
				placeholder="Search by key word"
				value={searchValue}
				onChange={handleChangeInput}
				required
			/>
			{isLoading ? (
				<p className="text-center">Loading...</p>
			) : (
				<>
					<div className="grid grid-auto gap-7">
						{photos?.photos?.map(({ id, alt, src: { large } }) => (
							<GridItem key={id} image={large} imageAlt={alt} id={id} />
						))}
					</div>
					<div className="flex flex-row justify-between mt-6">
						<div className="flex flex-row items-center justify-center gap-x-2">
							<FaMinus
								className={`${
									page === 1
										? 'pointer-events-none opacity-20'
										: 'cursor-pointer'
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
							/>
							<PerPageButton
								perPage={40}
								currentPerPage={perPage}
								onClick={() => handleSetPerPage(40)}
							/>
							<PerPageButton
								perPage={60}
								currentPerPage={perPage}
								onClick={() => handleSetPerPage(60)}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Home;
