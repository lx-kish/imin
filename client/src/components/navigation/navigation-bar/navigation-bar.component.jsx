import React from 'react';
import { Link } from 'react-router-dom';

import siteMenu from '../siteMenu';

import './navigation-bar.styles.scss';

const SiteNavigation = (props) => {
	/**
   * Application navigation menu component
   * 
   * For mobile version it's located in a slider menu.
   * 
   * For desktop version it's located on the left side of the page 
   * (inside the <aside></aside> tag).
   * 
   */

	// const { links } = props;

	const element = (link, i) => (
		<Link key={i} to={link.link} className={link.className}>
			{link.name}
		</Link>
	);

	const showLinks = () =>
		siteMenu.map((link, i) => {
			return element(link, i);
		});

	return <nav className="header__nav">{showLinks()}</nav>;
};

export default SiteNavigation;
