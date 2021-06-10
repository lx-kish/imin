import React from 'react';
import { Link } from 'react-router-dom';

import appMenu from '../appMenu';

import './aside-menu-dt.styles.scss';

const AsideMenuDesktop = (props) => {
	// console.log(
	//   '%c arguments of problem-controller ===> ',
	//   'color: orangered; font-weight: bold;',
	//   appMenu
	// );
	// return (
	// 	<nav>
	// 		<ul>
	// 			<li>item 1</li>
	// 		</ul>
	// 	</nav>
	// );
	const element = (link, i) => (
		<li key={i} className={`aside-menu__item`}>
			<Link to={link.link} className={`aside-menu__link`}>
				{link.name}
			</Link>
		</li>
	);

	const showLinks = (links) => links.map((link, i) => element(link, i));

	return (
		<nav className={`aside-menu`}>
			<ul className={`aside-menu__list`}>{showLinks(appMenu)}</ul>
		</nav>
	);
};

export default AsideMenuDesktop;
