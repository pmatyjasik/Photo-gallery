import React from 'react';

interface PerPageButtonProps {
	perPage: number;
	currentPerPage: number;
	onClick: () => void;
}

const PerPageButton = ({
	currentPerPage,
	perPage,
	onClick,
}: PerPageButtonProps) => {
	return (
		<button
			className={`${
				currentPerPage === perPage ? 'text-primary' : 'text-secondary'
			}`}
			onClick={onClick}
		>
			{perPage}
		</button>
	);
};

export default PerPageButton;
