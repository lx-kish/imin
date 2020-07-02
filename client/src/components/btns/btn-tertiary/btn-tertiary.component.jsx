import React from 'react';

import Btn from '../btn/btn.component';

const ButtonTertiary = (props) => (
    <React.Fragment>
        <Btn
            type={props.type}
            title={props.title}
            className={`${props.className} btn--tertiary`}
        />
    </React.Fragment>
);

export default ButtonTertiary;