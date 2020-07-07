import React from 'react';
import { Link } from 'react-router-dom';

import '../headers.styles.scss';

import Btn from '../../btns/btn/btn.component';

const HeaderHomePage = props => {

    return (
        <header className={props.headerClassName}>
            <div className={props.containerClassName}>
                <h1 className={props.titleClassName}>
                    {props.title}
                </h1>
                <div className={props.contentBox.contentClassName}>
                    <p className={props.contentBox.paragraphClassName}>
                        {props.contentBox.paragraph}
                    </p>
                    <div className={props.contentBox.button.boxClassName}>
                        <Link to={{ 
                            pathname: props.contentBox.button.linkTo,
                            state: { role: props.contentBox.button.role} 
                            // props.contentBox.button.linkTo
                        }}>
                            <Btn {...props.contentBox.button.config} />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default HeaderHomePage;