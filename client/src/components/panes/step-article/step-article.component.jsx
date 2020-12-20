import React from 'react';

const StepArticle = (props) => {
	return (
		<div className={props.componentClassName}>
			{props.img.src ? (
				<img
					src={props.img.src}
					alt={props.img.alt}
					className={`${props.img.className}`}
				/>
			) : null}
			{props.flexCont.className ? (
				<div className={props.flexCont.className}>
				    <h2 className={props.flexCont.title.headerClassName}>{props.flexCont.title.header}</h2>
				    <p className={props.flexCont.text.paragraphClassName}>{props.flexCont.text.paragraph}</p>
			    </div>
			) : null}
		</div>
	);
};

export default StepArticle;
