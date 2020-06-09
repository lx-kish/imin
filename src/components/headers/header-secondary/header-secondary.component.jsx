import React from 'react';

import '../headers.styles.scss';

import Btn from '../../btns/btn/btn.component';

const HeaderSecondary = props => {

    return (
        <header className={props.headerClassName}>
            <div className={props.containerClassName}>
                <h1 className={props.titleClassName}>
                    {props.title}
                </h1>
                <div className={props.button.boxClassName}>
                    <Btn {...props.button.config} />
                </div>
            </div>
        </header>
    );
};

export default HeaderSecondary;