import React from 'react';

import Btn from '../btn/btn.component';

const ButtonSecondary = (props) => (
    <React.Fragment>
        <Btn
            name={props.name}
            className={`${props.className} btn--secondary`}
        />
    </React.Fragment>
);

export default ButtonSecondary;