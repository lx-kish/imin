import React from 'react';

import Btn from '../btn/btn.component';

const ButtonTertiary = (props) => (
    <React.Fragment>
        <Btn
            name={props.name}
            className={`${props.className} btn--tertiary`}
        />
    </React.Fragment>
);

export default ButtonTertiary;