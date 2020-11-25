import React from 'react';
import { Link } from 'react-router-dom';

import '../intros.styles.scss';

const IntroHomePage = (props) => {
	return (
		<section className={props.sectionClassName}>
			<div className={props.containerClassName}>
				<h1 className={props.titleClassName}>{props.title}</h1>
				<div className={props.contentBox.contentClassName}>
					<p className={props.contentBox.paragraphClassName}>{props.contentBox.paragraph}</p>
					<div className={props.contentBox.button.boxClassName}>
						<Link
							to={{
								pathname: props.contentBox.button.linkTo,
								state: { role: props.contentBox.button.role }
							}}
							className={props.contentBox.button.linkClassName}
						>
							{props.contentBox.button.linkTitle}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default IntroHomePage;
