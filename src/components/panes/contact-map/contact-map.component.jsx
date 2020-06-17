import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class ContactMap extends React.Component {

    render() {

        const style = {
            width: '690px',
            height: '635px'
        }

        return (
            <div className={this.props.className} >
                <Map
                    google={this.props.google}
                    zoom={15}
                    initialCenter={{
                        lat: -41.2922011,
                        lng: 174.773596
                    }}
                    style={style}
                >
                    <Marker />
                </Map>
            </div>
        );
    }
}

// export default ContactMap;
export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAP_API_KEY)
})(ContactMap);