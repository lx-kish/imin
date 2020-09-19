import React from "react";
import { Link } from "react-router-dom";

import Btn from "../../btn/btn.component";
import logo from "../../../graphics/logo_pink.png";
import MenuIcon from "../../icons/icon-menu.component";
import LogInIcon from "../../icons/icon-log-in.component";

import "./navigation-bar.styles.scss";

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

const NavigationBar = (props) => {
  return (
    <nav className="navigation navigation--primary">
      <div className="navigation__content navigation__content--mobile">
        <div className="navigation__icon-box">
          <MenuIcon className="navigation__icon" />
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
              title={< LogInIcon className='color-white' />}
              className={"btn--tertiary navigation__btn btn--login"}
            />
          </Link>
        )}
      </div>

      <div className="navigation__content navigation__content--desktop">
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
                    "btn--tertiary navigation__btn--desktop paragraph--uppercase"
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
