import React from 'react';

import Btn from '../btn/btn.component';

const ButtonPrimary = (props) => (
    <React.Fragment>
        <Btn
            name={props.name}
            className={`${props.className} btn--primary`}
        />
    </React.Fragment>
);

export default ButtonPrimary;