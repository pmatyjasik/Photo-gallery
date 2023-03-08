import React from 'react';
import Link from 'next/link';
import NavMenu from './NavMenu';

const Header = () => {
	return (
		<header className="top-0 w-full px-4 py-5 bg-primary">
			<div className="container flex items-center justify-between mx-auto">
				<Link href="/">
					<span className="text-3xl font-semibold text-white">
						PhotoGallery
					</span>
				</Link>
				<NavMenu />
			</div>
		</header>
	);
};

export default Header;
