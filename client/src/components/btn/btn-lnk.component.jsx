import React from 'react';
import { Link } from 'react-router-dom';

// import './btn.styles.scss';

const ButtonLink = (props) => {
	return (
		<Link
			to={props.to}
			className={props.className}
		>
			{props.title}
		</Link>
	);
};

export default ButtonLink;
