import React from 'react';

import Btn from '../btn/btn.component';

const ButtonSecondary = (props) => (
    <React.Fragment>
        <Btn
            type={props.type}
            title={props.title}
            className={`${props.className} btn--secondary`}
        />
    </React.Fragment>
);

export default ButtonSecondary;