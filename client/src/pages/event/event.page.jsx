import React from "react";
import { Formik } from 'formik';

import AsideMenu from '../../components/navigation/aside-menu-dt/aside-menu-dt.component';
import DesktopWidth from '../../utils/desktop-width/desktop-width';

import "./event.styles.scss";

const Event = (props) => {
	/**
   * Event page 
   * 
   * Contains event settings and properties.
   * 
   */

  // console.log(
	// 	'%c Event.page, props ===> ',
	// 	'color: orangered; font-weight: bold;',
	// 	{ ...props },
	// );

  return (

    DesktopWidth() ?
      <main className="app-page app-page--dt event">
        <div className="event__content">
          <AsideMenu />
          <div className="app-page event">
            <h1 className="event__heading">Host experience</h1>
            {/* {listUpcomingEvents()} */}
          </div>
        </div>
      </main>
    : 
      <main className="app-page event">
        <h1 className="event__heading">Host experience</h1>
        {/* {listUpcomingEvents()} */}
      </main>
  );
};

export default Event;
