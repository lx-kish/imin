import React from 'react';

import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import SignUpLogo from '../../components/sign-up-logo/sign-up-logo.component';
import SignUpForm from '../../components/forms/sign-up-form/sign-up-form-formik.component';
import ImgStudent from '../../graphics/pages-content/sign-up/IMIN-purple.png';
import ImgEducator from '../../graphics/pages-content/sign-up/IMIN-pink.png';

// import SignUpForm from '../../components/forms/sign-up-form/sign-up-form-rhf.component';

const content = {
    student: {
        background: {
            className: 'sign-up__background'
        },
        doublePanes: {
            rowClassName: 'sign-up__container',
            left: {
                className: 'sign-up__logo--student',
                img: {
                    src: ImgStudent,
                    alt: 'student logo',
                    className: ''
                }
            },
            right: {
                role: 'student',
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
            className: 'sign-up__background'
        },
        doublePanes: {
            rowClassName: 'sign-up__container',
            left: {
                className: 'sign-up__logo--educator',
                img: {
                    src: ImgEducator,
                    alt: 'educator logo',
                    className: ''
                }
            },
            right: {
                role: 'educator',
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
    // console.log('empty -> student' || props.location.state.role);
    // console.log((typeof props.location.state === "undefined"))
    const role = props.location.state ? 
        props.location.state.role || 'student'
        : 'student';  
    const data = { ...content[role] };
    // const data = props.role === 'educator' ? { ...content.educator } : { ...content.student};
    // console.log(data.doublePanes.left.className);


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