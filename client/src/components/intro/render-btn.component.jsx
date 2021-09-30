import React from 'react';
import { Link } from 'react-router-dom';

import './intro.styles.scss';

const RenderButton = (props) => {
	return (
		<div className={props.btn.boxClassName}>
			<Link
				to={{
					pathname: props.btn.linkTo,
					state: { role: props.btn.role }
				}}
				className={props.btn.className}
			>
				{props.btn.title}
			</Link>
		</div>
	);
};

export default RenderButton;
