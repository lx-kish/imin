import React from 'react';

import IconEnvelop from '../../icons/icon-envelope.component';
import IconPhone from '../../icons/icon-phone.component';
import IconLocation from '../../icons/icon-location.component';

const ContactDetails = props => {

    return (
        <div className={props.componentClassName}>
            <h2 className={props.title.className}>
                {props.title.text}
            </h2>
            <div className={props.detailsBox.className}>
                <h3 className={props.detailsBox.title.className}>
                    {props.detailsBox.title.text}
                </h3>
                <p className={props.detailsBox.emailBox.className}>
                    <IconEnvelop className={props.detailsBox.emailBox.iconClassName} />
                    <span className={props.detailsBox.emailBox.paragraph.className}>
                        {props.detailsBox.emailBox.paragraph.text}
                    </span>
                </p>
                <p className={props.detailsBox.phoneBox.className}>
                    <IconPhone className={props.detailsBox.phoneBox.iconClassName} />
                    <span className={props.detailsBox.phoneBox.paragraph.className}>
                        {props.detailsBox.phoneBox.paragraph.text}
                    </span>
                </p>
                <p className={props.detailsBox.locationBox.className}>
                    <IconLocation className={props.detailsBox.locationBox.iconClassName} />
                    <span className={props.detailsBox.locationBox.paragraph.className}>
                        {props.detailsBox.locationBox.paragraph.text}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default ContactDetails;