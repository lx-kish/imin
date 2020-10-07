import React from "react";
import { Link } from "react-router-dom";

import "./footer.styles.scss";

import IconFacebook from "../../components/icons/icon-facebook.component";
import IconLinkedIn from "../../components/icons/icon-linkedin.component";

const Footer = () => (
  <footer className="footer">
    <p className="footer__copyright">
      I'm In is a New Zealand registered Charitable Trust (CC123456). All Rights
      Reserved. Copyright &copy; 2020.
    </p>
    <div className="footer__media">
      <Link to={"/"} className="footer__link">
        <IconFacebook className="footer__icon color-white" />
      </Link>
      <Link to={"/"} className="footer__link">
        <IconLinkedIn className="footer__icon color-white" />
      </Link>
    </div>
  </footer>
);

export default Footer;
