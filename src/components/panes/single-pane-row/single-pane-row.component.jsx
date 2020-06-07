import React from 'react';

const SinglePaneRow = props => (

    <section className={props.sectionClassName}>
        <div className={props.rowClassName}>
            <h1 className={props.titleClassName}>
                {props.title}
            </h1>
            <p className={props.paragraphClassName}>
                {props.paragraph}
            </p>
        </div>
    </section>
);

export default SinglePaneRow;