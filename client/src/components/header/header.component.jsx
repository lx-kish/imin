import React from 'react';
import { Link } from 'react-router-dom';

import useClickOutside from '../../utils/useClickOutside';
import appMenu from '../navigation/appMenu';
import siteMenu from '../navigation/siteMenu';

import logo from '../../graphics/logo_pink.png';
import LogInIcon from '../icons/icon-log-in.component';
import LogOutIcon from '../icons/icon-log-out.component';
import BurgerIcon from '../navigation/burger icon/icon-burger.component';
import SlideBar from '../navigation/slide bar/slide-bar.component';
import NavigationBar from '../navigation/navigation-bar/navigation-bar.component';

import './header.styles.scss';

const Header = (props) => {
	/** Render navigation bar.
   * Desktop navigation has menu items located in the navigation bar directly.
   * Mobile navigation has menu items hide with slide (dissapeared) panel
   * and showes it by click on 'burger' icon at the left.
   *
   * Stage I:
   * 1) Render both options.
   * 2) Set className with modifier --mb / --dt for the appropriate nav bars.
   * 3) Set 'display: none;' css property for appropriate navbar base on the screen resolution, checking with mixins.
   *
   * Stage II:
   * 1) Change menu items list depends on logged in/out user.
   * 2) Show appropriate menu items for logged in user based on it's role.
   *
   * As a part of mobile navigation, burger menu icon should be implemented.
   * @DONE
   * 1) Implement the icon itself - @DONE
   * 2) Implement slide menu - @DONE
   * 3) Implement the state of the menu - @DONE
   * 4) Hide slide bar by tapping outside the slide bar - @DONE
   * 5) Hide slide bar by tapping on burger icon - @DONE
   * 6) Hide slide bar by clicking menu item - @DONE
   * 
   * Slide menu with burger icon implementation has been inspired by:
   * https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/
   * 
   * Burger menu icon implementation has been inspired by:
   * https://codepen.io/maximakymenko/pen/aboWJpX/
   * https://codepen.io/RRoberts/pen/ZBYaJr
   * 
   * Detect click outside React component:
   * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
   * https://www.youtube.com/watch?v=J-g9ZJha8FE&feature=youtu.be&t=692s
   * 
   */

	// console.log('navigation bar props ===> ', props);

	const delimeter = [
		{
			name: 'delimeter',
			link: '',
			className: 'navigation-link__delimeter'
		}
	];

	const slideMenu = props.data?._id ? [ ...appMenu, ...delimeter, ...siteMenu ] : siteMenu;

	/** Single state hook useState for all the state properties */
	const [ fullState, setFullState ] = React.useState({
		open: false
	});

	const menuRef = React.useRef();

	const setState = () => {
		setFullState({
			...fullState,
			open: !fullState.open
		});
	};

	const hideSliderMenu = () => {
		setFullState({
			...fullState,
			open: false
		});
	};

	useClickOutside(menuRef, hideSliderMenu);

	return (
		<header className="header header--primary">
			<div className="header__content container header__content--mb">
				<div className="header__nav-box header__nav-box--mb" ref={menuRef}>
					<BurgerIcon open={fullState.open} setOpen={setState} />
					<SlideBar open={fullState.open} links={slideMenu} hideSliderMenu={hideSliderMenu} />
				</div>
				<div className="header__logo-box">
					<img src={logo} alt="Logo" className="header__logo" />
				</div>
				{props.data?._id ? (
					// 'isAuth'
					<div className="header__btn-box header__btn-box--mb">
						<Link
							to={{
								pathname: '/logout'
							}}
							className={'btn btn--tertiary header__btn header__btn--mb btn--login'}
						>
							{<LogOutIcon className="color-white" />}
						</Link>
					</div>
				) : (
					<div className="header__btn-box header__btn-box--mb">
						<Link
							to={{
								pathname: '/signin',
								state: { role: 'student' }
							}}
							className={'btn btn--tertiary header__btn header__btn--mb btn--login'}
						>
							{<LogInIcon className="color-white" />}
						</Link>
					</div>
				)}
			</div>

			<div className="header__content container header__content--dt">
				<div className="header__logo-box">
					<img src={logo} alt="Logo" className="header__logo" />
				</div>

				<div className="header__nav-box">
					<NavigationBar />

					<div className="header__nav-item header__btn-box">
						{props.data?._id ? (
							// 'Auth'
							<Link
								to={{
									pathname: '/logout'
								}}
								className={'btn btn--dt btn--tertiary header__btn--dt paragraph--uppercase'}
							>
								{'sign out'}
							</Link>
						) : (
							<Link
								to={{
									pathname: '/signin',
									state: { role: 'student' }
								}}
								className={'btn btn--dt btn--tertiary header__btn--dt paragraph--uppercase'}
							>
								{'sign in'}
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
