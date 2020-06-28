import React from 'react';

import DoublePanesRow from '../../../hoc/rows/double-panes-row';
import SignUpLogo from '../../../components/sign-up-logo/sign-up-logo.component';

const content = {
    background: {
        className: 'popup__background'
    },
    doublePanes: {
        rowClassName: 'popup__container',
        left: {
            className: 'popup__sign-up--student',
            img: {
                src: '',
                alt: '',
                className: ''
            }
        },
        right: {
            className: '',
            form: {
                properties: {

                }
            }
        }
    }
}

const SignUpStudents = props => {

    return (
        <div className={content.background.className}>
            <DoublePanesRow
                rowClassName={content.doublePanes.rowClassName}
                leftColClassName={content.doublePanes.left.className}
                rightColClassName={content.doublePanes.right.className}
                left={<SignUpLogo {...content.doublePanes.left} />}
                right={<PartArticle {...content.text} />}
            />
        </div>
    )
};

export default SignUpStudents;