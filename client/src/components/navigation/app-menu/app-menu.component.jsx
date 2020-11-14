import React from 'react';
import { Link } from 'react-router-dom';

import appMenu from '../../../utils/appMenu';

import './app-navigation.styles.scss';

const AppNavigation = (props) => {
	/**
   * Application navigation menu component
   * 
   * For mobile version it's located in a slider menu.
   * 
   * For desktop version it's located on the left side of the page 
   * (inside the <aside></aside> tag).
   * 
   */

	const links = [
		{
			name: 'Profile',
			link: '/profile',
			className: 'navigation-link color-pink paragraph--uppercase'
		},
		{
			name: 'Account',
			link: '/accout',
			className: 'navigation-link color-pink paragraph--uppercase'
		},
		{
			name: 'Events',
			link: '/events',
			className: 'navigation-link color-pink paragraph--uppercase'
		},
		{
			name: 'Feedbacks',
			link: '/contact',
			className: 'navigation-link color-pink paragraph--uppercase'
		},
		{
			name: 'Log out',
			link: '/logout',
			className: 'navigation-link color-pink paragraph--uppercase'
		}
	];

	const element = (link, i) => (
		<li key={i} className="navigation__item">
			<Link to={link.link} className={link.className}>
				{link.name}
			</Link>
		</li>
	);

	const showLinks = () =>
		appMenu.map((link, i) => {
		// links.map((link, i) => {
			return element(link, i);
		});

	return <ul className="navigation__list">{showLinks()}</ul>;
};

export default AppNavigation;
