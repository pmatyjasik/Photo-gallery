import React from 'react';
import NavItem from './NavItem';
import MobileMenu from './MobileMenu';

const NavMenu = () => {
	return (
		<nav>
			<div className="hidden md:block">
				<ul className="flex justify-end text-white gap-x-10">
					<NavItem url="/" text="Home" />
					<NavItem url="/favourites" text="Favourites" />
				</ul>
			</div>
			<MobileMenu />
		</nav>
	);
};

export default NavMenu;
