import React, { useState } from 'react';
import NavItem from './NavItem';
import { FaBars, FaRegWindowClose } from 'react-icons/fa';

const MobileMenu = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div>
			<FaBars
				className="text-white cursor-pointer w-7 h-7 md:hidden"
				onClick={toggle}
			/>
			{isOpen && (
				<>
					<div className="fixed top-0 left-0 bg-basic">
						<FaRegWindowClose
							className="m-4 cursor-pointer text-secondary w-7 h-7 md:hidden"
							onClick={toggle}
						/>
						<div className="flex items-start justify-center w-screen h-screen pt-10">
							<ul onClick={toggle} className="flex flex-col gap-y-2">
								<NavItem url="/" text="Home" />
								<NavItem url="/favourites" text="Favourites" />
							</ul>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default MobileMenu;
