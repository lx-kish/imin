import React from 'react';

import './lvl2-pages.styles.scss';

import FirstImage from '../../graphics/pages-content/about-page/about-dna-1-1920.png';
import SecondImage from '../../graphics/pages-content/about-page/about-strategy-2-1920.png';

import Intro from '../../components/intro/intro.component';
import RenderBtn from '../../components/intro/render-btn.component';
import ParagraphTitled from '../../components/panes/paragraphs/paragraph-titled/paragraph-titled.component';
import Image from '../../components/panes/image/image.component';
import TextParagraph from '../../components/panes/paragraphs/paragraph-text/paragraph-text.component';
import LinkedBottomParagraph from '../../components/panes/paragraphs/paragraph-linked-bottom/paragraph-linked-bottom.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
	intro: {
		introClassName: 'intro', //no need in the new formation
		containerClassName: 'intro__container intro__container--about-page',
		bgClassName: 'intro__bg intro__bg--about',
		title: 'A vision from New Zealand.',
		titleClassName: 'intro__title intro__title--lvl2 heading-primary color-pink'
	},
	button: {
		boxClassName: 'lvl2__btn-box',
		linkTo: '/signup',
		role: 'student',
		title: 'Register Now',
		className: 'btn btn--lvl2 btn--primary'
	},
	content: {
		firstSinglePaneRow: {
			sectionClassName: 'lvl2__article lvl2__container',
			pane: {
				titleClassName: 'lvl2__heading heading-secondary',
				title: 'Free and accessible education for young New Zealanders.',
				paragraphClassName: 'lvl2__paragraph paragraph',
				paragraph:
					'Founded in 2020 by Thomas Maharaj, I’m In is a New Zealand based registered charitable trust with a vision to see communities work collectively together, in order to help every young person have access to free industry and community led education. As they realise their potential, I’m In helps young people discover a pathway into education and employment.'
			}
		},
		firstDoublePanesSection: {
			textSectionType: 'paragraph',
			sectionClassName: 'lvl2--bg-grey',
			title: 'In our DNA.',
			titleClassName: 'lvl2__heading heading-secondary',
			img: {
				src: FirstImage,
				alt: 'In our DNA.',
				className: 'lvl2__image-pane'
			},
			text: {
				paragraph:
					'In 2015, Thomas Maharaj underwent brain surgery, and from his hospital bed he started The Knowledge Bank, a small project that helped deliver books to children whose parents could not afford them. Since then, he went on to work at multiple charitable trusts around New Zealand helping to fund and build programmes of national significance and help young people find jobs. Having always worked at the crossroads of sales, education and recruitment. In 2019 Jenny and Isaac joined the team, bringing both talent, drive and passion. 2020 creates a world of opportunities. As we dive deep into the future of…',
				paragraphClassName: 'lvl2__paragraph paragraph'
			}
		},
		secondSinglePaneRow: {
			sectionClassName: 'lvl2__article lvl2__container',
			pane: {
				titleClassName: 'lvl2__heading heading-secondary',
				title: 'What we do and how we do it.',
				paragraphClassName: 'lvl2__paragraph paragraph',
				paragraph:
					'I’m In provides education training and support to industry and community groups, businesses and centres helping them become educators. We’ve been hard at work developing a gamified education platform that enables young people to access industry and community led education and an access point to study and employment opportunities. It’s a showcase for our rangatahi about their options and helps create a clear pathway for their future.'
			}
		},
		secondDoublePanesSection: {
			textSectionType: 'paragraph-bottom-link',
			sectionClassName: 'lvl2--bg-grey',
			title: 'Our strategy for impact.',
			titleClassName: 'lvl2__heading heading-secondary',
			img: {
				src: SecondImage,
				alt: 'What we do and how we do it.',
				className: 'lvl2__image-pane'
			},
			text: {
				componentClassName: '',
				paragraph:
					'Tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac.',
				paragraphClassName: 'lvl2__paragraph paragraph',
				link: '/contact',
				linkClassName: 'lvl2__paragraph-link color-pink paragraph--uppercase',
				linkName: 'Contact us'
			}
		}
	}
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
			<h2 className={data.titleClassName}>{data.title}</h2>
			<div className="lvl2__flex lvl2__container">
				<div className="lvl2__flex-item--left-about">
					<Image src={data.img.src} alt={data.img.alt} className={data.img.className} />
				</div>
				<div className="lvl2__flex-item--right-about">
					{data.textSectionType === 'paragraph' ? (
						<TextParagraph paragraph={data.text.paragraph} paragraphClassName={data.text.paragraphClassName} />
					) : (
						<LinkedBottomParagraph
							paragraph={data.text.paragraph}
							paragraphClassName={data.text.paragraphClassName}
							link={data.text.link}
							linkClassName={data.text.linkClassName}
							linkName={data.text.linkName}
						/>
					)}
				</div>
			</div>
		</section>
	);
};

const AboutPage = () => {
	return (
		<React.Fragment>
			<main className="lvl2__main">
				<Intro {...content.intro} />
				{renderSinglePaneSection(content.content.firstSinglePaneRow)}
				<RenderBtn render={content.renderButton} btn={content.button} />
				{renderDoublePaneSection(content.content.firstDoublePanesSection)}
				{renderSinglePaneSection(content.content.secondSinglePaneRow)}
				{renderDoublePaneSection(content.content.secondDoublePanesSection)}
			</main>
			<ContactForm />
		</React.Fragment>
	);
};

export default AboutPage;
