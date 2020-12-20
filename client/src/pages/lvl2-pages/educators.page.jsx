import React from 'react';

import './lvl2-pages.styles.scss';

import ImageSignUp from '../../graphics/pages-content/educators-page/1-sign-up.png';
import ImageApplyToHost from '../../graphics/pages-content/educators-page/2-apply-to-host.png';
import ImageEducate from '../../graphics/pages-content/educators-page/3-educate.png';
import ImageSeeTheImpact from '../../graphics/pages-content/educators-page/4-see-the-impact.png';
import ImageBeAnImpact from '../../graphics/pages-content/educators-page/5-be-an-impact-partner.png';
import ImageTheNextWave from '../../graphics/pages-content/educators-page/6-the-next-wave.png';

import Intro from '../../components/intro/intro.component';
import RenderBtn from '../../components/intro/render-btn.component';
import ParagraphTitled from '../../components/panes/paragraphs/paragraph-titled/paragraph-titled.component';
import StepArticle from '../../components/panes/step-article/step-article.component';

import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
	intro: {
		introClassName: 'intro',
		containerClassName: 'intro__container intro__container--educators-page',
		bgClassName: 'intro__bg intro__bg--educators',
		title: 'Become a Community Educator.',
		titleClassName: 'intro__title intro__title--lvl2 heading-primary color-pink'
	},
	button: {
		boxClassName: 'lvl2__btn-box',
		linkTo: '/signup',
		role: 'educator',
		title: 'Register Now',
		className: 'btn btn--lvl2 btn--primary'
	},
	content: {
		singlePaneRow: {
			sectionClassName: 'lvl2__article lvl2__container',
			pane: {
				titleClassName: 'lvl2__heading heading-secondary',
				title: 'Why educate?',
				paragraphClassName: 'lvl2__paragraph paragraph',
				paragraph:
					'Become an educator today and co-create the future, helping young New Zealanders open their eyes to a world of possibilities as they gain exposure and insights into your industry and their community.'
			}
		},
		doublePanesSections: [
			{
				sectionClassName: 'lvl2__section--double-pane',
				left: {
					componentClassName: 'lvl2__flex--left',
					img: {
						src: ImageSignUp,
						alt: 'Sign Up',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'Sign up.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-pink'
						},
						text: {
							paragraph: 'It’s free and always will be.',
							paragraphClassName: 'lvl2__flex-item lvl2__flex-item--right'
						}
					}
				},
				right: {
					componentClassName: 'lvl2__flex--right',
					img: {
						src: ImageApplyToHost,
						alt: 'Apply to host',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'Apply to host.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-pink'
						},
						text: {
							paragraph:
								'An I’m In education advisor works with your team every step of the way, helping your team to plan a great experience.',
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
						src: ImageEducate,
						alt: 'Educate',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'Educate.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-pink'
						},
						text: {
							paragraph:
								'Run a local experience, pass on knowledge and skills, and make a difference for the future leaders in your community.',
							paragraphClassName: 'lvl2__flex-item lvl2__flex-item--right'
						}
					}
				},
				right: {
					componentClassName: 'lvl2__flex--right',
					img: {
						src: ImageSeeTheImpact,
						alt: 'See the impact',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'See the impact.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-pink'
						},
						text: {
							paragraph:
								'Good things are worth celebrating. Our world-class impact measurement tools help us to celebrate your social impact.',
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
						src: ImageBeAnImpact,
						alt: 'Be an Impact Partner',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'Be an Impact Partner.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-pink'
						},
						text: {
							paragraph:
								'Make corporate social responsibility meaningful. Automatically, your business becomes a registered I’m In impact partner. You receive impact reports and accreditation for the difference you are making.',
							paragraphClassName: 'lvl2__flex-item lvl2__flex-item--right'
						}
					}
				},
				right: {
					componentClassName: 'lvl2__flex--right',
					img: {
						src: ImageTheNextWave,
						alt: 'The Next Wave',
						className: 'lvl2__image-pane'
					},
					flexCont: {
						className: 'lvl2__flex lvl2__flex--step',
						title: {
							header: 'The Next Wave.',
							headerClassName: 'lvl2__flex-item lvl2__flex-item--left heading-primary color-pink'
						},
						text: {
							paragraph:
								'Meet the future leaders of New Zealand. Inspire their aspirations, build great relationships and in turn, meet potential employees, future students and do your part to strengthen New Zealand.',
							paragraphClassName: 'lvl2__flex-item lvl2__flex-item--right'
						}
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

const EducatorsPage = () => {
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

export default EducatorsPage;