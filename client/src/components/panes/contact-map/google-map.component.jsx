import React from 'react';

import './google-map.styles.scss';

const GoogleMap = (props) => {

	/**
	 * Based on 
	 * https://dev.to/talorlanczyk/how-to-integrate-google-maps-places-with-reactjs-37jd
	 */

	const googleMapRef = React.useRef();
	let googleMap;

	React.useEffect(() => {

		// console.log(
    //   '%c google map API key ===> ',
    //   'color: orange; font-weight: bold;',
    //   process.env.REACT_APP_GOOGLE_MAP_API_KEY
    // );

		const googleMapScript = document.createElement('script');
		googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env
			.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`;
		googleMapScript.async = true;
		window.document.body.appendChild(googleMapScript);
		googleMapScript.addEventListener('load', () => {
			createGoogleMap();
			// getLatLng();
		}); 
	}, []);
	// you can add at the end of the src &language=en to be only English without this it will be localized.
  const createGoogleMap = () => {
  // const createGoogleMap = (coordinates) => {
    googleMap = new window.google.maps.Map(googleMapRef.current, {
      zoom: props.zoom,
      center: {
        lat: props.latitude,
        lng: props.longitude,
        // lat: coordinates.lat(),
        // lng: coordinates.lng(),
      },
      disableDefaultUI: true,
    });
  };

	// const getLatLng = () => {
  //   let lat, lng, placeId;
  //   new window.google.maps.Geocoder().geocode(
  //     { address: `${placeName}` },
  //     function (results, status) {
  //       if (status === window.google.maps.GeocoderStatus.OK) {
  //         placeId = results[0].place_id;
  //         createGoogleMap(results[0].geometry.location);
  //         lat = results[0].geometry.location.lat();
  //         lng = results[0].geometry.location.lng();
  //         new window.google.maps.Marker({
  //           position: { lat, lng },
  //           map: googleMap,
  //           animation: window.google.maps.Animation.DROP,
  //           title: `${placeName}`,
  //         });
  //       } else {
  //         alert(
  //           "Geocode was not successful for the following reason: " + status
  //         );
  //       }
  //     }
  //   );
  // };

	// React.useEffect(() => {
	// 	new window.google.maps.Map(googleMapRef.current, {
	// 		zoom: props.zoom,
	// 		center: {
	// 			lat: props.latitude,
	// 			lng: props.longitude
	// 		}
	// 	});
	// 	/**
  //    * Input dependencies:
  //    * undefined => every render,
  //    * [a, b] => when a or b change,
  //    * [] => only once
  //    * https://medium.com/@sdolidze/the-iceberg-of-react-hooks-af0b588f43fb
  //    */
	// }, []);

	return <div className="google-map" ref={googleMapRef} id="google-map" />;
};

// class GoogleMap extends React.Component {
//      componentDidMount() {
//          new google.maps.Map(this.refs.map, {
//             zoom: 12,
//             center: {
//                 lat: this.props.lat,
//                 lng: this.props.lon
//              }
//           });
//       }

//   render() {
//       return <div className="google-map" ref="map" />
//   }
// }

export default GoogleMap;
