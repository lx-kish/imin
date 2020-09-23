import React from "react";

import "./icon-burger.styles.scss";

const IconBurger = ({ open, setOpen }) => {

  return (
    <div
      className={`burger${open ? ' is-active' : ''}`}
      onClick={() => setOpen()}
    >
      <span className="line" />
      <span className="line" />
      <span className="line" />
    </div>
  );
};

export default IconBurger;
