import React from "react";
import { Link } from "react-router-dom";

import useClickOutside from "../../../utils/useClickOutside";

import Btn from "../../btn/btn.component";
import logo from "../../../graphics/logo_pink.png";
// import MenuIcon from "../../icons/icon-menu.component";
import LogInIcon from "../../icons/icon-log-in.component";
import BurgerIcon from "../burger icon/icon-burger.component";
import SlideBar from "../slide bar/slide-bar.component";

import "./navigation-bar.styles.scss";

const NavigationBar = (props) => {

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

  const links = [
    {
      name: "Home",
      link: "/",
      className: "navigation-link color-pink paragraph--uppercase",
    },
    {
      name: "About",
      link: "/about",
      className: "navigation-link color-pink paragraph--uppercase",
    },
    {
      name: "Platform",
      link: "/platform",
      className: "navigation-link color-pink paragraph--uppercase",
    },
    {
      name: "Contact",
      link: "/contact",
      className: "navigation-link color-pink paragraph--uppercase",
    },
  ];

  /** Single state hook useState for all the state properties */
  const [fullState, setFullState] = React.useState({
    open: false,
  });

  const menuRef = React.useRef();

  const setState = () => {
    // console.log("from setState before setting ===> ", fullState.open);
    // console.log("setting state...");
    setFullState({
      ...fullState,
      open: !fullState.open,
    });
    // console.log("from setState after setting ===> ", fullState.open);
  };

  const hideSliderMenu = () => {
    // console.log("Clicked outside the menu", fullState);

    setFullState({
      ...fullState,
      open: false
    });
  };

  useClickOutside(menuRef, hideSliderMenu);

  const element = (link, i) => (
    <li key={i} className="navigation__item">
      <Link to={link.link} className={link.className}>
        {link.name}
      </Link>
    </li>
  );

  const showLinks = () =>
    links.map((link, i) => {
      return element(link, i);
    });

  return (
    <nav className="navigation navigation--primary">
      <div className="navigation__content navigation__content--mb">
        <div className="navigation__menu-box" ref={menuRef}>
          <BurgerIcon
            open={fullState.open}
            setOpen={setState}
          />
          <SlideBar
            open={fullState.open}
            links={links}
            hideSliderMenu={hideSliderMenu}
          />
        </div>

        <div className="navigation__logo-box">
          <img src={logo} alt="Logo" className="navigation__logo" />
        </div>

        {props.isAuth ? (
          "Auth"
        ) : (
          <Link
            to={{
              pathname: "/signin",
              state: { role: "student" },
            }}
            className="navigation__btn-box"
          >
            <Btn
              title={<LogInIcon className="color-white" />}
              className={"btn btn--tertiary navigation__btn navigation__btn--mb btn--login"}
            />
          </Link>
        )}
      </div>

      <div className="navigation__content navigation__content--dt">
        <div className="navigation__logo-box">
          <img src={logo} alt="Logo" className="navigation__logo" />
        </div>

        <ul className="navigation__list">
          {showLinks()}

          <li className="navigation__item">
            {props.isAuth ? (
              "Auth"
            ) : (
              <Link
                to={{
                  pathname: "/signin",
                  state: { role: "student" },
                }}
              >
                <Btn
                  title={"sign in"}
                  className={
                    "btn btn--dt btn--tertiary navigation__btn--dt paragraph--uppercase"
                  }
                />
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
//{ pathname: '/route', state: { foo: 'bar'} }
export default NavigationBar;
