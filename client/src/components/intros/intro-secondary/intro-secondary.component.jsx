import React from 'react';
import { Link } from 'react-router-dom';

import '../intros.styles.scss';

import Btn from '../../btn/btn.component';

const HeaderSecondary = props => {

    const renderButton = (render, btn) => {
        return render ?
            <div className={btn.boxClassName}>
                <Link to={{
                    pathname: btn.linkTo,
                    state: { role: btn.role }
                }}>
                    <Btn {...btn.config} />
                </Link>
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