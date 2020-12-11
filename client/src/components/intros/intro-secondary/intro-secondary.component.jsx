import React from 'react';
import { Link } from 'react-router-dom';

import '../intros.styles.scss';

const HeaderSecondary = (props) => {
	const renderButton = (render, btn) => {
		return render ? (
			<div className={btn.boxClassName}>
				<Link
					to={{
						pathname: btn.linkTo,
						state: { role: btn.role }
					}}
					className={btn.className}
				>
					{btn.title}
				</Link>
			</div>
		) : null;
	};

	return (
		<section className={props.introClassName}>
			<div className={props.containerClassName}>
				<h1 className={props.titleClassName}>{props.title}</h1>
				{renderButton(props.renderButton, props.button)}
			</div>
		</section>
	);
};

export default HeaderSecondary;
