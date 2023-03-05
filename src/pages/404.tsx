import type { NextPage } from 'next';
import Head from 'next/head';

const Custom404: NextPage = () => {
	return (
		<>
			<Head>
				<title>404</title>
				<meta name="description" content="This page cannot be found" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="text-2xl font-bold text-center">
				This page cannot be found.
			</h1>
		</>
	);
};

export default Custom404;
