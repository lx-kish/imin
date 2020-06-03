import React from 'react';

import './double-panes-row.styles.scss';

const DoublePanesRow = props => (

    <section className={props.sectionClassName}>
        <div className={props.rowClassName}>
            <div className={props.leftColClassName}>
                {props.left}
            </div>
            <div className={props.rightColClassName}>
                {props.right}
            </div>
        </div>
    </section>
);

export default DoublePanesRow;