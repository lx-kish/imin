import React from 'react';

import './double-panes-row.styles.scss';

const DoublePanesRow = props => (

    <div className={props.rowClassName}>
        <div className={props.leftColClassName}>
            {props.left}
        </div>
        <div className={props.rightColClassName}>
            {props.right}
        </div>
    </div>
);

export default DoublePanesRow;