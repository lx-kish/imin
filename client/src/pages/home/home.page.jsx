import React from 'react';
import { Link } from 'react-router-dom';

import './home.styles.scss';

import Image from '../../components/panes/image/image.component';
import PartArticle from '../../components/panes/part-article/part-article.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
	articles: [
		{
			articleClassName: 'home__section bg-grey',
			segmentClassName: 'home__segment',
			img: {
				src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/home-page/home-educate-1x.png`,
				// src: educateImg,
				alt: 'For those who want to educate',
				className: 'image'
			},
			text: {
				componentClassName: 'home__article',
				titles: {
					header: 'educate',
					headerCommonClassName: 'home__article-title--common heading-quaternary',
					headerClassName: 'home__article-title color-pink'
				},
				paragraph: {
					paragraph: `It's easy to teach your skills to our nation's future leaders. Our platform connects local industry and organisations with young people and supports your organisation to deliver a world class education experience.`,
					paragraphClassName: 'home__article-paragraph'
				},
				cta: {
					text: 'Become a community educator.',
					link: '/educators',
					className: 'home__cta-link color-pink paragraph--uppercase'
				}
			}
		},
		{
			articleClassName: 'home__section home__section--middle',
			segmentClassName: 'home__segment',
			img: {
				src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/home-page/home-learn-1x.png`,
				// src: learnImg,
				alt: 'For those who want to learn',
				className: 'image'
			},
			text: {
				componentClassName: 'home__article',
				titles: {
					header: 'learn',
					headerCommonClassName: 'home__article-title--common heading-quaternary',
					headerClassName: 'home__article-title color-violet'
				},
				paragraph: {
					paragraph: `It's easy to learn from industry experts. With I'm In, access education experiences to help you discover your future pathway. Combining the best of gamification with real world experiences you can engage in and track your learning jurney, like never before.`,
					paragraphClassName: 'home__article-paragraph'
				},
				cta: {
					text: `Learn through I'm In.`,
					link: '/students',
					className: 'home__cta-link color-violet paragraph--uppercase'
				}
			}
		},
		{
			articleClassName: 'home__section bg-grey',
			segmentClassName: 'home__segment',
			img: {
				src: `https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/static/pages-content/home-page/home-support-1x.png`,
				// src: supportImg,
				alt: 'For those who want to support',
				className: 'image'
			},
			text: {
				componentClassName: 'home__article',
				titles: {
					header: 'support',
					headerCommonClassName: 'home__article-title--common heading-quaternary',
					headerClassName: 'home__article-title color-pink'
				},
				paragraph: {
					paragraph: `Our mission is to help young people get off to a flying start by making industry led education free and accessible. We help young people into education and employment. Partner with us, and together we will see young kiwis take flight.`,
					paragraphClassName: 'home__article-paragraph'
				},
				cta: {
					text: 'Become a partner.',
					link: '/partners',
					className: 'home__cta-link color-pink paragraph--uppercase'
				}
			}
		}
	]
};

const renderIntro = () => {
	return (
		<section className="home-intro">
			<div className="home-intro__bg" />
			<div className="home-intro__content">
				<h1 className="home-intro__title heading-primary">Industry and Community-led Education</h1>
				<p className="home-intro__paragraph">
					At I'm In, our vision is to make community led education and development opportunities{' '}
					<b>free and accessible</b> for every young person in every corner of New Zealand. Our platform connects
					organisations, businesses and individuals who want to teach, with young people who want to learn.
				</p>
				<div className="home-intro__btn-box">
					<Link
						to={{
							pathname: '/signup',
							state: { role: 'student' }
						}}
						className="btn btn--home-intro btn--primary"
						// className="home-intro__btn btn btn-main btn--dt btn--primary"
					>
						Register Now
					</Link>
				</div>
			</div>
		</section>
	);
};

const renderPageTitle = () => {
	return <h2 className="home__page-title heading-secondary">How can you be part of I'm in?</h2>;
};

const renderSingleArticle = (data) => {
	return (
		<article className={data.articleClassName}>
			<div className={data.segmentClassName}>{<Image {...data.img} />}</div>
			<div className={data.segmentClassName}>{<PartArticle {...data.text} />}</div>
		</article>
	);
};

const renderArticles = () => {
	const array = content.articles;

	return array.map((item, i) => {
		return <React.Fragment key={i}>{renderSingleArticle(item)}</React.Fragment>;
	});
};

const HomePage = () => {
	return (
		<React.Fragment>
			<main className="home__main">
				{renderIntro()}
				{renderPageTitle()}
				{renderArticles()}
			</main>
			<ContactForm />
		</React.Fragment>
	);
};

export default HomePage;
