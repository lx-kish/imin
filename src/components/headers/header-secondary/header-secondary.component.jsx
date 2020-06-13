import React from 'react';

import '../headers.styles.scss';

import Btn from '../../btns/btn/btn.component';


const HeaderSecondary = props => {

    const renderButton = (render, btn) => {
        return render ?
            <div className={btn.boxClassName}>
                <Btn {...btn.config} />
            </div>
            : null
    }

    return (
        <header className={props.headerClassName}>
            <div className={props.containerClassName}>
                <h1 className={props.titleClassName}>
                    {props.title}
                </h1>
                {renderButton(props.renderButton, props.button)}
            </div>
        </header>
    );
};

export default HeaderSecondary;