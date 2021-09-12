import React from 'react';

import './lvl2-pages.styles.scss';

import ImageSignUp from '../../graphics/pages-content/students-page/1-sign-up.png';
import ImageAttendExperiences from '../../graphics/pages-content/students-page/2-attend-experiences.png';
import ImageGainSkills from '../../graphics/pages-content/students-page/3-gain-skills.png';
import ImageRateExperiences from '../../graphics/pages-content/students-page/4-rate-experiences.png';
import ImageMakeDecisionAboutYourFuture from '../../graphics/pages-content/students-page/5-make-decisions-about-your-future.png';

import Intro from '../../components/intro/intro.component';
import RenderBtn from '../../components/intro/render-btn.component';
import ParagraphTitled from '../../components/panes/paragraphs/paragraph-titled/paragraph-titled.component';
import StepArticle from '../../components/panes/step-article/step-article.component';

import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
	intro: {
		introClassName: 'intro',
		containerClassName: 'intro__container intro__container--students-page',
		bgClassName: 'intro__bg intro__bg--students',
		title: `Learn through I'm In.`,
		titleClassName: 'intro__title intro__title--lvl2 heading-primary color-violet'
	},
	button: {
		boxClassName: 'lvl2__btn-box',
		linkTo: '/signup',
		role: 'student',
		title: 'Register Now',
		className: 'btn btn--lvl2 btn--tertiary'
	},
	content: {
		singlePaneRow: {
			sectionClassName: 'lvl2__article lvl2__container',
			pane: {
				titleClassName: 'lvl2__heading heading-secondary',
				title: 'Why learn through I’m In?',
				paragraphClassName: 'lvl2__paragraph paragraph',
				paragraph:
					'Deciding on a career pathway or your further study options can be tough. With I’m In, we make these decisions easier by connecting you with local industry and community professionals education experiences. Learn new skills, be inspired and discover a world of possibilities. It’s free.'
			}
		},
		doublePanesSections: [
			{
				sectionClassName: 'lvl2__section--double-pane',
				left: {
					componentClassName: 'lvl2__flex--left',
					img: {
						src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/students-page/1-sign-up.png`,
						// src: ImageSignUp,
						alt: 'Sign Up',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'Sign up.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-violet'
						},
						text: {
							paragraph: 'Build a gamified profile. It’s free and always will be.',
							paragraphClassName: 'lvl2__flex-item lvl2__flex-item--right'
						}
					}
				},
				right: {
					componentClassName: 'lvl2__flex--right',
					img: {
						src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/students-page/2-attend-experiences.png`,
						// src: ImageAttendExperiences,
						alt: 'Attend Experiences',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'Attend Experiences.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-violet'
						},
						text: {
							paragraph:
								'Show up, learn and be inspired from industry experts. Gain insights about future employment and study opportunities.',
								paragraphClassName: 'lvl2__flex-item lvl2__flex-item--right'
						}
					}
				}
			},
			{
				sectionClassName: 'lvl2__section--double-pane',
				left: {
					componentClassName: 'lvl2__flex--left',
					img: {
						src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/students-page/3-gain-skills.png`,
						// src: ImageGainSkills,
						alt: 'Gain skills',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'Gain skills.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-violet'
						},
						text: {
							paragraph:
								'The more experiences you attend, the more skills and knowledge you get! All experiences are uploaded to your I’m In profile.',
								paragraphClassName: 'lvl2__flex-item lvl2__flex-item--right'
						}
					}
				},
				right: {
					componentClassName: 'lvl2__flex--right',
					img: {
						src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/students-page/4-rate-experiences.png`,
						// src: ImageRateExperiences,
						alt: 'Rate Experiences',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'Rate Experiences.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-violet'
						},
						text: {
							paragraph:
								'Your feedback helps industry to create great experiences. Be rewarded for rating experiences.',
								paragraphClassName: 'lvl2__flex-item lvl2__flex-item--right'
						}
					}
				}
			},
			{
				sectionClassName: 'lvl2__section--double-pane',
				left: {
					componentClassName: 'lvl2__flex--left',
					img: {
						src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/students-page/5-make-decisions-about-your-future.png`,
						// src: ImageMakeDecisionAboutYourFuture,
						alt: 'Make decisions about your future',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'Make decisions about your future.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-violet'
						},
						text: {
							paragraph:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in purus sagittis, ultricies ante at, posuere magna. Morbi non nisi. Cras in purus sagittis, ultricies ante at, posuere magna. Morbi non nisi',
								paragraphClassName: 'lvl2__flex-item lvl2__flex-item--right'
						}
					}
				},
				right: {
					componentClassName: 'lvl2__flex--right',
					img: {
						src: ''
					},
					flexCont: {
						className: ''
					}
				}
			}
		]
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

const StudentsPage = () => {
	return (
		<React.Fragment>
			<main className="lvl2__main">
				<Intro {...content.intro} />
				{renderSinglePaneSection(content.content.singlePaneRow)}
				<RenderBtn render={content.renderButton} btn={content.button} />
				{loopSteps()}
			</main>
			<ContactForm />
		</React.Fragment>
	);
};

export default StudentsPage;