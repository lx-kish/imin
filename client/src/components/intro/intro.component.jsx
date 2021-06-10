import React from 'react';

import './intro.styles.scss';

const Intro = (props) => {
	return (
		<section className="intro">
			<div className={props.bgClassName} />
			<h1 className={props.titleClassName}>{props.title}</h1>
		</section>
	);
};

export default Intro;
