import React from 'react';

import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import SignUpLogo from '../../components/sign-up-logo/sign-up-logo.component';
import SignUpForm from '../../components/forms/sign-up-form/sign-up-form.component';

const content = {
    student: {
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
    },
    educator: {
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
}

const SignUp = props => {

    // console.log(props);
    console.log(props.location.state.role || 'empty props');
    const data = props.role === 'educator' ? { ...content.educator } : { ...content.student} 

    return (
        <div className={data.background.className}>
            <DoublePanesRow
                rowClassName={data.doublePanes.rowClassName}
                leftColClassName={data.doublePanes.left.className}
                rightColClassName={data.doublePanes.right.className}
                left={<SignUpLogo {...data.doublePanes.left} />}
                right={<SignUpForm {...data.doublePanes.right} />}
            />
        </div>
    )
};

export default SignUp;