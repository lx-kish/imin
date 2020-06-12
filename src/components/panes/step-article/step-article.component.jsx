import React from 'react';

const StepArticle = props => {

    return (
        <div className={props.componentClassName}>
            <img
                src={props.img.src}
                alt={props.img.alt}
                className={`image ${props.img.className}`}
            />
            <div className={props.flexCont.className}>
                <h2 className={props.flexCont.title.headerClassName}>{props.flexCont.title.header}</h2>
                <p className={props.flexCont.text.paragraphClassName}>{props.flexCont.text.paragraph}</p>
            </div>
        </div>
    );
}

export default StepArticle;