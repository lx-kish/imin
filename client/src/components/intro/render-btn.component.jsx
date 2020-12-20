import React from 'react';
import { Link } from 'react-router-dom';

import './intro.styles.scss';

import Btnlnk from '../btn/btn-lnk.component';

const RenderButton = (props) => {
	return (
		<div className={props.btn.boxClassName}>
			<Btnlnk
				to={{
					pathname: props.btn.linkTo,
					state: { role: props.btn.role }
				}}
				className={props.btn.className}
				title={props.btn.title}
			/>
			{/* <Link
					to={{
						pathname: btn.linkTo,
						state: { role: btn.role }
					}}
					className={btn.className}
				>
					{btn.title}
				</Link> */}
		</div>
	);
};

export default RenderButton;
