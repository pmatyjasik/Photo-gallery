import React from 'react';
import Link from 'next/link';

interface NavItemProps {
	url: string;
	text: string;
}

const NavItem = ({ url, text }: NavItemProps) => (
	<li className="text-lg font-medium text-center text-secondary md:text-white">
		<Link href={url}>{text}</Link>
	</li>
);

export default NavItem;
