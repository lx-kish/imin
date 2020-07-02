import React from 'react';

const TriplePanesRow = props => {

    return (

        <div className={props.rowClassName}>
            <div className={props.leftColClassName}>
                {props.left}
            </div>
            <div className={props.middleColClassName}>
                {props.middle}
            </div>
            <div className={props.rightColClassName}>
                {props.right}
            </div>
        </div>
    )
};

export default TriplePanesRow;