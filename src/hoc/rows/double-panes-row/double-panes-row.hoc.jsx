import React from 'react';

import './double-panes-row.styles.scss';

const DoublePanesRow = props => (

    <section className={props.sectionClassName}>
        <div className={`row ${props.rowClassName}`}>
            <div className={`col-1-of-2 ${props.leftColClassName}`}>
                {props.left}
            </div>
            <div className={`col-1-of-2 ${props.rightColClassName}`}>
                {props.right}
            </div>
        </div>
    </section>
);

export default DoublePanesRow;