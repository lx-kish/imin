import React from "react";

import AsideMenu from '../../components/navigation/aside-menu-dt/aside-menu-dt.component';
import EventUpcoming from '../../components/event-upcoming/event-upcoming.component';

import DesktopWidth from '../../utils/desktop-width/desktop-width';

import "./upcoming-events-list.styles.scss";

const UpcomingEventsList = (props) => {
	/**
   * Event page 
   * 
   * Contains list upcoming events.
   * 
   */

  const listUpcomingEvents = () => {
		return (
			<section className="upcoming-list__events">
        <EventUpcoming 
          name="Cake Baking Extravaganza"
          cover={`https://s3.amazonaws.com/imin-app-assets/img/static/pages-content/about-page/about-header-320.png`}
          startDate="2021-09-29"
          time="2pm - 5pm"
        />
        <EventUpcoming 
          name="Soup Cooking Extravaganza"
          cover={`https://s3.amazonaws.com/imin-app-assets/img/static/pages-content/about-page/about-header-320.png`}
          startDate="2021-10-06"
          time="3pm - 6pm"
        />
			</section>
		);
	};

  return (

    DesktopWidth() ?
      <main className="upcoming-list upcoming-list--dt">
        <div className="upcoming-list__content">
          <AsideMenu />
          <div className="upcoming-list">
            <h1 className="upcoming-list__heading">Upcoming experiences</h1>
            {listUpcomingEvents()}
          </div>
        </div>
      </main>
    : 
      <main className="upcoming-list">
        <h1 className="upcoming-list__heading">Upcoming experiences</h1>
        {listUpcomingEvents()}
      </main>
  );
};

export default UpcomingEventsList;
