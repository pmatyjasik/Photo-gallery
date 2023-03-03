import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

interface AuthorizedPageProps {
	children: React.ReactNode;
}

const PageTemplate = ({ children }: AuthorizedPageProps) => {
	return (
		<div>
			<Header />
			<div className="container min-h-screen px-5 py-6 mx-auto">{children}</div>
			<Footer />
		</div>
	);
};

export default PageTemplate;
