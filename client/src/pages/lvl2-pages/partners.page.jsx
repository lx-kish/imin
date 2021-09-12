import React from 'react';

import './lvl2-pages.styles.scss';

import ImageBecomeAPartner from '../../graphics/pages-content/partners-page/1-become-a-partner.png';
import ImageDonate from '../../graphics/pages-content/partners-page/2-donate.png';

import IconPhone from '../../components/icons/icon-phone.component';
import IconEnvelop from '../../components/icons/icon-envelope.component';

import Intro from '../../components/intro/intro.component';
import ParagraphTitled from '../../components/panes/paragraphs/paragraph-titled/paragraph-titled.component';
import StepArticle from '../../components/panes/step-article/step-article.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
	intro: {
		introClassName: 'intro',
		containerClassName: 'intro__container intro__container--partners-page',
		bgClassName: 'intro__bg intro__bg--partners',
		title: 'Openning up a world of possibilities.',
		titleClassName: 'intro__title intro__title--lvl2 heading-primary color-white',
		// renderButton: false
	},
	content: {
		singlePaneRow: {
			sectionClassName: 'lvl2__article lvl2__container',
			pane: {
				titleClassName: 'lvl2__heading heading-secondary',
				title: 'Opening up a world of possibilities.',
				paragraphClassName: 'lvl2__paragraph paragraph',
				paragraph:
					'Tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum.'
			}
		},
		doublePanesSections: [
			{
				sectionClassName: 'lvl2__section--double-pane',
				left: {
					componentClassName: 'lvl2__flex--left',
					img: {
						src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/partners-page/1-become-a-partner.png`,
						// src: ImageBecomeAPartner,
						alt: 'Become a Partner',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'Become a Partner.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-pink'
						},
						text: {
							paragraph:
								'Tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam Tempor',
								paragraphClassName: 'lvl2__flex-item lvl2__flex-item--right'
						}
					}
				},
				right: {
					componentClassName: 'lvl2__flex--right',
					img: {
						src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/partners-page/2-donate.png`,
						// src: ImageDonate,
						alt: 'Donate',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'Donate.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-pink'
						},
						text: {
							paragraph:
								'Tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam Tempor',
								paragraphClassName: 'lvl2__flex-item lvl2__flex-item--right'
						}
					}
				}
			}
		]
	}
};

const renderContactSection = () => {
	return (
		<section className="lvl2__section--partners-contact">
			<div className="partners-contact flex-box flex-box-col flex-box--partners-contact">
				<p className="">
					<b>Speak to our team about partnering today.</b>
				</p>
				<div className="partners-contact__icon-box flex-box flex-box-row color-pink">
					<IconEnvelop className="partners-contact__icon" />
					<span>thomas@imin.org.nz</span>
				</div>
				<div className="partners-contact__icon-box flex-box flex-box-row color-pink">
					<IconPhone className="partners-contact__icon" />
					<span>+6421 193 7699</span>
				</div>
			</div>
		</section>
	);
};

const renderSinglePaneSection = (data) => {
	return (
		<section className={data.sectionClassName}>
			<ParagraphTitled {...data.pane} />
		</section>
	);
};

const renderDoublePaneSection = (data) => {
	return (
		<section className={data.sectionClassName}>
			<div className="lvl2__flex lvl2__container">
				<StepArticle {...data.left} />
				<StepArticle {...data.right} />
			</div>
		</section>
	);
};

const loopSteps = () => {
	const array = content.content.doublePanesSections;

	return array.map((item, i) => {
		return <React.Fragment key={i}>{renderDoublePaneSection(item)}</React.Fragment>;
	});
};

const PartnersPage = () => {
	return (
		<React.Fragment>
			<main className="lvl2__main">
				<Intro {...content.intro} />
				{renderSinglePaneSection(content.content.singlePaneRow)}
				{loopSteps()}
				{renderContactSection()}
			</main>
			<ContactForm />
		</React.Fragment>
	);
};

export default PartnersPage;