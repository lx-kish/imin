import React from "react";
import { Link } from 'react-router-dom';

import IconChartBar from '../icons/icon-chart-bar.component';
import IconEye from '../icons/icon-eye.component';
import IconGroups from '../icons/icon-groups.component';

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
      <figure className="upcoming-event__cover">
				<img
					src={props.cover}
					// src={`https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/userpics/${user.photo}`}
					alt={props.name}
					className="upcoming-event__photo"
				/>
			</figure>
      <div className="upcoming-event__requisites">
        <h2 className="upcoming-event__header heading-quaternary">{props.name}</h2>
        <div className="upcoming-event__date-time color-pink heading-quinary">
          <span className="upcoming-event__date">{props.startDate}</span>
          <span className="upcoming-event__time">{props.time}</span>
        </div>
        <div className="upcoming-event__footer">
          <Link 
            to={{
              pathname: "/signin",
              state: props.attendees,
            }}
            className="upcoming-event__attending"
          >
            <span className="upcoming-event__icon-attending">
              <IconGroups className="upcoming-event__icon-group"/>
            </span>
            <span className="heading-quinary heading-quinary--uppercase">
              {`${20} attending`}
            </span>
          </Link>
          <div className="upcoming-event__btn-box">
            <Link
				      to={{
                pathname: "#",
				  	    state: ""
			  	    }}
		  		    className="btn btn--upcoming-event"
            >
	  			    <IconEye className="color-violet" />
  			    </Link>
            <Link
				      to={{
                pathname: "#",
				        state: ""
		    	    }}
	  			    className="btn btn--upcoming-event"
            >
				      <IconChartBar className="color-pink" />
			      </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventUpcoming;
