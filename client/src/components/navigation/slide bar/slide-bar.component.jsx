import React from "react";
import { Link } from "react-router-dom";

import "./slide-bar.styles.scss";

const SlideBar = ({ open, links, hideSliderMenu }) => {

  const element = (link, i) => (
    <li key={i} className="slide-bar__item">
      <Link to={link.link} className={link.className} onClick={() => hideSliderMenu()}>
        {link.name}
      </Link>
    </li>
  );
  
  const delimeter = (link, i) => (
    <hr key={i} className={link.className} />
  );

  const showLinks = (links) =>
    links.map((link, i) => {
      if(link.name === 'delimeter') return delimeter(link, i);
      return element(link, i);
    });

  return (
    <ul className={`slide-bar${open ? ' is-active' : ''}`}>
      {showLinks(links)}
    </ul>
  );
};

export default SlideBar;
