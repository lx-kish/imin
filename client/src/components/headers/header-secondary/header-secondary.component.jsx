import React from 'react';
import { Link } from 'react-router-dom';

import '../headers.styles.scss';

import Btn from '../../btns/btn/btn.component';


const HeaderSecondary = props => {

    const renderButton = (render, btn) => {
        return render ?
            <div className={btn.boxClassName}>
                <Link to={btn.linkTo}>
                    <Btn {...btn.config} />
                </Link>
                {/* <Btn {...btn.config} /> */}
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