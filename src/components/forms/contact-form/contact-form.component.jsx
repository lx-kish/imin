import React from 'react';

import './contact-form.styles.scss';

const fields = [
    {
        type: '',
        name: '',
        value: '',
        id: '',
        className: ''
    }
];

// const element = (part, i) => (

//     <DoublePanesRow
//         key={i}
//         sectionClassName={part.sectionClassName}
//         rowClassName={part.rowClassName}
//         leftColClassName={part.colClassName}
//         rightColClassName={part.colClassName}
//         left={
//             <Image
//                 src={part.imgSrc}
//                 alt={part.imgAlt}
//                 className=''
//             />
//         }
//         right={
//             <PartArticle
//                 componentClassName={part.textComponentClassName}
//                 header={part.header}
//                 headerCommonClassName={part.headerCommonClassName}
//                 headerClassName={part.headerClassName}
//                 paragraph={part.paragraph}
//                 paragraphClassName={part.paragraphClassName}
//                 cta={part.cta}
//                 ctaLink={part.ctaLink}
//                 ctaClassName={part.ctaClassName}
//             />
//         }
//     />
// );

// const showFields = () => (

//     content.parts.map((fieldsRow, i) => {
//         return element(fieldsRow, i);
//     })
// );

const ContactForm = () => (
    <section className='contact-form'>
        <h2 className='contact-form__heading heading-secondary heading-secondary--uppercase'>I'm in. Are you?</h2>
        <p className="contact-form__description">
            Sign up to receive email updages on this project.
        </p>
        {/* {showFields()} */}
    </section>
);

export default ContactForm;