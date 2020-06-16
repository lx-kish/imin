import React from 'react';

const TeamArticle = props => {

    return (
        <React.Fragment>
            <img
                src={props.image.src}
                alt={props.image.alt}
                className={props.image.className}
            />
            <div className={props.storyClassName}>
                <h5 className={props.title.className}>{props.title.name}</h5>
                <p className={props.role.className}>{props.role.name}</p>
                <p className={props.description.className}>{props.description.text}</p>
                {props.link}
            </div>
        </React.Fragment>
    )
};

export default TeamArticle;