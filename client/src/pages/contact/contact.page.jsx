import React from 'react';
import { Link } from 'react-router-dom';

import './contact.styles.scss';

import ImageJenny from '../../graphics/pages-content/contact-page/jenny.png';
import ImageThomas from '../../graphics/pages-content/contact-page/thomas.png';
import ImageIsaac from '../../graphics/pages-content/contact-page/isaac.png';

import IconEnvelop from '../../components/icons/icon-envelope.component';
import IconLinkedIn from '../../components/icons/icon-linkedin.component';

import ContactDetails from '../../components/panes/contact-details/contact-details.component';
import GoogleMap from '../../components/panes/contact-map/google-map.component';
import EnquiryForm from '../../components/forms/enquiry-form/enquiry-form.component';
import TeamArticle from '../../components/panes/contact-team-article/contact-team-article.component';
import DoubleLinksIconBox from '../../components/panes/double-links-icon-box/double-links-icon-box.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
	contactDetails: {
		sectionClassName: 'bg-pink',
		rowClassName: 'container contact__row',
		colClassName: 'flex-item__of-2',
		details: {
			componentClassName: 'contact-details__box',
			title: {
				className: 'contact-details__title color-white',
				text: 'We’d love to hear from you.'
			},
			detailsBox: {
				className: 'bg-white contact-details__details',
				title: {
					className: 'heading-tertiary heading-tertiary--uppercase',
					text: 'Concact us'
				},
				emailBox: {
					className: 'contact-details__item',
					iconClassName: 'contact__icon color-pink',
					paragraph: {
						className: 'paragraph contact-details__paragraph',
						text: 'thomas@imin.org.nz'
					}
				},
				phoneBox: {
					className: 'contact-details__item',
					iconClassName: 'contact__icon color-pink',
					paragraph: {
						className: 'paragraph contact-details__paragraph',
						text: '+6421 193 7699'
					}
				},
				locationBox: {
					className: 'contact-details__item',
					iconClassName: 'contact__icon color-pink',
					paragraph: {
						className: 'paragraph contact-details__paragraph',
						text: '123 Placeholder Street, Te Are, Wellington 6011'
					}
				}
			}
		},
		map: {
			className: 'contact__map-box',
			latitude: -41.2922011,
			longitude: 174.773596,
			zoom: 15
		}
	},
	team: {
		sectionClassName: 'team',
		rowClassName: 'team__row container',
		colClassName: 'team__col',
		members: [
			{
				image: {
					src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/contact-page/jenny.png`,
					// src: ImageJenny,
					alt: 'Jenny Bennet photo',
					className: 'team-member__photo'
				},
				storyClassName: 'team-member__container',
				title: {
					name: 'Jenny Bennet',
					className: 'team-member__title heading-quinary'
				},
				role: {
					name: 'Education Manager',
					className: 'team-member__role paragraph'
				},
				description: {
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in purus sagittis, ultricies ante at, posuere magna. Morbi non nisi.',
					className: 'team-member__description paragraph'
				},
				links: {
					className: 'team-member__media',
					link1: {
						to: '/',
						className: 'team-member__link',
						icon: {
							component: 'envelop',
							className: 'contact__icon color-pink'
						}
					},
					link2: {
						to: '/',
						className: 'team-member__link',
						icon: {
							component: 'linkedin',
							className: 'contact__icon color-pink'
						}
					}
				}
			},
			{
				image: {
					src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/contact-page/thomas.png`,
					// src: ImageThomas,
					alt: 'Thomas Maharaj photo',
					className: 'team-member__photo'
				},
				storyClassName: 'team-member__container',
				title: {
					name: 'Thomas Maharaj',
					className: 'team-member__title heading-quinary'
				},
				role: {
					name: 'Founder & Managing Director',
					className: 'team-member__role paragraph'
				},
				description: {
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in purus sagittis, ultricies ante at, posuere magna. Morbi non nisi.',
					className: 'team-member__description paragraph'
				},
				links: {
					className: 'team-member__media',
					link1: {
						to: '/',
						className: 'team-member__link',
						icon: {
							component: 'envelop',
							className: 'contact__icon color-pink'
						}
					},
					link2: {
						to: '/',
						className: 'team-member__link',
						icon: {
							component: 'linkedin',
							className: 'contact__icon color-pink'
						}
					}
				}
			},
			{
				image: {
					src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/contact-page/isaac.png`,
					// src: ImageIsaac,
					alt: 'Isaac Winsley photo',
					className: 'team-member__photo'
				},
				storyClassName: 'team-member__container',
				title: {
					name: 'Isaac Winsley',
					className: 'team-member__title heading-quinary'
				},
				role: {
					name: 'Impact Manager',
					className: 'team-member__role paragraph'
				},
				description: {
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in purus sagittis, ultricies ante at, posuere magna. Morbi non nisi.',
					className: 'team-member__description paragraph'
				},
				links: {
					className: 'team-member__media',
					link1: {
						to: '/',
						className: 'team-member__link',
						icon: {
							component: 'envelop',
							className: 'contact__icon color-pink'
						}
					},
					link2: {
						to: '/',
						className: 'team-member__link',
						icon: {
							component: 'linkedin',
							className: 'contact__icon color-pink'
						}
					}
				}
			}
		]
	}
};

const ContactPage = () => {
	const renderContactDetailsSection = (data) => {
		return (
			<section className={data.sectionClassName}>
				<div className="container contact__row">
					<ContactDetails {...data.details} />
					<GoogleMap {...data.map} />
				</div>
			</section>
		);
	};

	const teamLoop = () => {
		const array = content.team.members;

		return array.map((item, i) => {
			return (
				<article className="team-member__article" key={i}>
					<TeamArticle
						{...item}
						link={
							<DoubleLinksIconBox
								{...item.links}
								icon1={<IconEnvelop className={item.links.link1.icon.className} />}
								icon2={<IconLinkedIn className={item.links.link2.icon.className} />}
							/>
						}
					/>
				</article>
			);
		});
	};

	const renderTeamSection = (data) => {
		return (
			<section className={data.sectionClassName}>
				<h2 className="team__heading heading-secondary heading-secondary--uppercase">Our team</h2>
				<div className="team__row container">{teamLoop()}</div>
			</section>
		);
	};

	return (
		<React.Fragment>
			{renderContactDetailsSection(content.contactDetails)}
			<EnquiryForm />
			{renderTeamSection(content.team)}
			<ContactForm />
		</React.Fragment>
	);
};

export default ContactPage;
