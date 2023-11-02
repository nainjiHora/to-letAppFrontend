import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid, CardContent, Box, Divider } from "@mui/material";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
// LocationOn
import { Carousel } from "react-responsive-carousel";
import { AuthContext } from "../context/auth";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { LocationOn as LocationOnIcon } from "@mui/icons-material";
import {
  compose,
  withProps,
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { GoogleMapsAPI } from "../custom-config";

const ListingDetails = () => {
  const { listingId } = useParams();
  const [listingDetails, setListingDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    if (auth.user !== null) {
      const fetchListingDetails = async () => {
        try {
          const response = await axios.get(`/listing/single/${listingId}`); // Replace with your API endpoint
          console.log(response);
          setListingDetails(response.data.listing);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching listing details:", error);
        }
      };
      fetchListingDetails();
    } else {
      const fetchListingDetails = async () => {
        try {
          const response = await axios.get(
            `/listing/single/except/${listingId}`
          ); // Replace with your API endpoint
          console.log(response);
          setListingDetails(response.data.listing);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching listing details:", error);
        }
      };
      fetchListingDetails();
    }
  }, [listingId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(listingDetails);
  const isLocationAvailable =
    listingDetails.locationState &&
    listingDetails.locationState.mapPosition &&
    listingDetails.locationState.markerPosition;
  const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{
          lat: isLocationAvailable
            ? listingDetails.locationState.mapPosition.lat
            : 26.9124,
          lng: isLocationAvailable
            ? listingDetails.locationState.mapPosition.lng
            : 75.7873,
        }}
      >
        <Marker
          position={{
            lat: isLocationAvailable
              ? listingDetails.locationState.markerPosition.lat
              : 26.9124,
            lng: isLocationAvailable
              ? listingDetails.locationState.markerPosition.lng
              : 75.7873,
          }}
        />
      </GoogleMap>
    ))
  );

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <div style={{ maxWidth: "100%" }}>
            <Carousel showThumbs={true} showArrows={true}>
              {listingDetails.images.map((url, index) => (
                <div key={index}>
                  <img src={url} alt={`Image ${index}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">{listingDetails.title}</h4>
              <h6 className="mb-3">
                Category: <strong>{listingDetails.category}</strong>
              </h6>
              <h6 className="mb-3">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-primary me-2"
                />
                <strong>{listingDetails.state}</strong>
              </h6>

              <hr />
              <div style={{ fontWeight: "bold" }}>
                Price: {listingDetails.price} /
                <span style={{ fontSize: "18px", fontWeight: "normal" }}>
                  {listingDetails.priceUnit}
                </span>
              </div>
              {listingDetails.pricingType === "Range" && (
                <div>
                  <p style={{ fontSize: "18px" }}>
                    Max Price: <strong>{listingDetails.maxPrice}</strong>{" "}
                    <span style={{ fontSize: "18px", fontWeight: "normal" }}>
                      {listingDetails.priceUnit}
                    </span>
                  </p>
                </div>
              )}
              <hr />

              <pre style={{ fontWeight: "bold" }}>
                Description: {listingDetails.description}{" "}
              </pre>

              <hr />
              <h6>Contact Details </h6>
              {!auth.user ? (
                <div>
                  <p>
                    {" "}
                    Contact:{" "}
                    <strong className="blurme">Login to Continue</strong>
                  </p>
                  <p>
                    WhatsApp:{" "}
                    <strong className="blurme">Login to Continue</strong>
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    Contact: <strong>{listingDetails.phone}</strong>
                  </p>
                  <p>
                    WhatsApp: <strong>{listingDetails.whatsappNumber}</strong>
                  </p>
                </div>
              )}

              <p>
                Zip Code: <strong>{listingDetails.zipCode}</strong>
              </p>

              <p>
                Address: <strong>{listingDetails.address}</strong>
              </p>

              {isLocationAvailable && (
                <>
                  <p>Address: {listingDetails.locationState.address}</p>
                  <p>City: {listingDetails.locationState.city}</p>
                  <p>State: {listingDetails.locationState.state}</p>
                </>
              )}
            </Card.Body>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={12} md={12}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">Locate On Map</h4>

              <hr />
              <div className="App" style={{ margin: "0px", marginTop: "10px" }}>
                <MyMapComponent
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `800px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </div>
            </Card.Body>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ListingDetails;
