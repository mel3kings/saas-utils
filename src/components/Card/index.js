import React, { FC } from 'react';
import './style.scss';

const Card = ({ title, children }) => {
	return (
		<div className="Card">
			<div className="Title">{title}</div>

			<div className="Content">{children}</div>
		</div>
	);
};

export default Card;
