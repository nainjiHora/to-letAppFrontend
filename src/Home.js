
import React, { useState } from 'react';
import { compose, withProps, withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Map from './components/map/Map';
import { GoogleMapsAPI } from './custom-config';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
// import MyCarousel from './MyCarousel';
import MyCarousel from './components/slider/MyCarasoul';
// import { GoogleMapsAPI } from './client-config';
const Home = (props) => {
  const [locationState, setLocationState] = useState({
    address: '',
    city: '',
    area: '',
    state: '',
    mapPosition: {
      lat: 18.5204,
      lng: 73.8567
    },
    markerPosition: {
      lat: 18.5204,
      lng: 73.8567
    }
  });
//   const MyMapComponent = compose(
//     withProps({
//       googleMapURL:
//         `https://maps.googleapis.com/maps/api/js?key=Ykey=${GoogleMapsAPI}&v=3.exp&libraries=geometry,drawing,places`,
//       loadingElement: <div style={{ height: `100%` }} />,
//       containerElement: <div style={{ height: `400px` }} />,
//       mapElement: <div style={{ height: `100%` }} />
//     }),
//     withScriptjs,
//     withGoogleMap
//   )(props => (
//     <GoogleMap defaultZoom={8} defaultCenter={{ lat: locationState.mapPosition.lat, lng: locationState.mapPosition.lng }}>
//       <Marker position={{ lat: locationState.markerPosition.lat, lng: locationState.markerPosition.lng }} />
//     </GoogleMap>
//   ));

const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{
          lat: locationState.mapPosition.lat,
          lng: locationState.mapPosition.lng,
        }}
      >
        <Marker
          position={{
            lat: locationState.markerPosition.lat,
            lng: locationState.markerPosition.lng,
          }}
        />
      </GoogleMap>
    ))
  );

  
  return (
    // style={{ margin: '100px' , marginBlockStart:"150px" }}
    <div >
<section id="hero">
  <div class="container">
    <div class="searchwrapper">
      <div class="searchbox">
        <div class="row">
          <div class="col-md-5"><input type="text" class="form-control" placeholder="Search by Keywords..."/></div>
          {/* <div class="col-md-3"><input type="text" class="form-control" placeholder="Location"/></div> */}
          <div class="col-md-3">
            <select class="form-control category">
              <option>Category</option>
              <option>Hotels</option>
              <option>Cafes</option>
              <option>Nightlife</option>
              <option>Restauarants</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-control category">
              <option>Category</option>
              <option>Hotels</option>
              <option>Cafes</option>
              <option>Nightlife</option>
              <option>Restauarants</option>
            </select>
          </div>
          <div class="col-md-1"><input type="button"  class="form-control" value="Search"/></div>
        </div>
      </div>
    </div>
  </div>
</section>
<footer>
  <div class="container">
    <p class="text-center">Designed by <a href="https://www.linkedin.com/in/prince-sargbah-b0155479" target="_blank">Prince J. Sargbah</a> | Thank you for viewing this</p>
  </div>
</footer>


     <Card style={{ width: '18rem' }}>
        <MyCarousel/>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      {/* <Map
        google={props.google}
        center={{ lat: 18.5204, lng: 73.8567 }}
        height='300px'
        zoom={15}
        setLocationState={setLocationState} // Pass the function as a prop
      /> */}
      {/* Display location information */}

	 
      <div>
	  <h4>Home Page location</h4>
        Address: {locationState.address}<br />
        City: {locationState.city}<br />
        Area: {locationState.area}<br />
        State: {locationState.state}<br />
		Map Position : {locationState.mapPosition.lat} <br />
		Marker Position : {locationState.markerPosition.lat} <br />
		<MyMapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      </div>
    </div>
  );
}

export default Home;