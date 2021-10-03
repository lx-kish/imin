import React from 'react';

const IconChartBar = props => {

    return (
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-labelledby="title">
        {/* <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="-5 -5 24 24" aria-labelledby="title"> */}
            <title id="title">chart-bar</title>
            <path d="M1 10h3v10h-3v-10zM6 0h3v20h-3v-20zM11 8h3v12h-3v-12zM16 4h3v16h-3v-16z"></path>
        </svg>
    )
};

export default IconChartBar;