import React from 'react';

import Btn from '../btn/btn.component';

const ButtonPrimary = props => (
    <React.Fragment>
        <Btn
            type={props.type}
            title={props.title}
            className={`${props.className} btn--primary`}
        />
    </React.Fragment>
);

export default ButtonPrimary;