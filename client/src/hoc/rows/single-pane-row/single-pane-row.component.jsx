import React from 'react';

const SinglePaneRow = props => {

    return (
        <div className={props.rowClassName}>
            {props.pane}
        </div>
    );
}

export default SinglePaneRow;