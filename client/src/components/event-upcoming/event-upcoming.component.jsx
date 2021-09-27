import React from "react";

import "./event-upcoming.styles.scss";

const EventUpcoming = (props) => {
	/**
   * Upcoming event to display on the UpcomingEvents page 
   * 
   * The unit of the upcoming events list from the same-name page.
   * 
   */

  return (

    <article className="upcoming-event">
      <div className="upcoming-event__cover">
        cover
      </div>
      <div className="upcoming-event__requisites">
        <h2 className="upcoming-event__header">{props.name}</h2>
        <div className="upcoming-event__date-time">{props.startDate}{props.time}</div>
        <div className="upcoming-event__attendees">{props.attendees}</div>

      </div>
    </article>
  );
};

export default EventUpcoming;
