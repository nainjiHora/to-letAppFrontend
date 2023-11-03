import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Common from "../components/common";
import { useParams, useNavigate, Link } from "react-router-dom";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
import Swal from "sweetalert2";

const ListingDetails = () => {
  const comman = new Common()
  const nav = useNavigate()
  const { listingId } = useParams();
  const [listingDetails, setListingDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false)

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
            `/listing/single/${listingId}`
          ); // Replace with your API endpoint

          setListingDetails(response.data.listing);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching listing details:", error);
        }
      };
      fetchListingDetails();
    }
  }, []);

function editListing(){
  axios.post('/listing/edit',listingDetails).then((data)=>{
    console.log(data)
    if(data.data.success){  
      Swal.fire({
        icon: "success",
        title: `Congratulation!!`,
        text: "Listing Updated Successfully!",
        confirmButtonText: "Done",
      });
    setEditMode(false)
    }
  })
}

  function deleteListing() {
    axios.get(`/listing/delete/${listingId}`).then((data, err) => {
      if (data.data.success) {
        Swal.fire({
          icon: "success",
          // title: `Congratulation!!`,
          text: "Deleted Successfully!",
          confirmButtonText: "cool",
        });
        nav("/subscriber/ads")
      }
      else {
        Swal.fire({
          title: "Error!",
          text: "Something Went Wrong",
          icon: "error",
          confirmButtonText: "Cool",
        });
      }
    })
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  
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
              <div className="d-flex justify-content-between">
              {!editMode?<h2 className="mb-3">{comman.capitalize(listingDetails.title)}</h2>:<input className="" size={80} value={listingDetails.title} onInput={(e)=>{setListingDetails({...listingDetails,title:e.target.value})}}></input>}
              {auth && auth.user && auth.user._id==listingDetails.user&&<div style={{cursor:"pointer"}}>
              {!editMode ? <><button className=" btn btn-primary m-2"  onClick={()=>{setEditMode(true)}}>Edit</button>
               <button className=" btn btn-danger m-2" onClick={() => { deleteListing() }}>Delete</button></>:<>
               <button className=" btn btn-primary m-2"  onClick={()=>{editListing()}}>Done</button>
               <button className=" btn btn-danger m-2" onClick={() => { setEditMode(false)}}>Back</button>
               </>}
               </div>}
               </div>
              
               
                  <div className="d-flex m-3 ">
                  <span  style={{ fontWeight: "bold", fontSize: "20px",marginBottom:"20px" }}>Category:</span>
                  {!editMode?<span style={{ fontWeight: "", fontSize: "20px",marginLeft:"30px" }}>{listingDetails.category}</span>:
                  <select className="form-control w-50 " style={{marginLeft:"20px",marginBottom:"5px"}} onChange={(e) => {setListingDetails({...listingDetails,category:e.target.value})}} >
                    <option value="flat">Flat</option>
                    <option value="house">House</option>
                    <option value="pg">PG</option>
                    <option value="room">Room</option>
                    <option value="shop">Shop</option>
                    <option value="others">Others</option>
                  </select>}
                  </div>
                
              <h6 className="m-3">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-primary me-2"
                />
                <strong style={{ fontSize: "20px" }}>{comman.capitalize(listingDetails.state)}</strong>
              </h6>

              <hr />
              <div className="row m-2">
                <div style={{ fontWeight: "bold", fontSize: "20px" }} className="col-2">
                  <span>Price:</span>
                </div>
                <div className="col-6">
                  {editMode?<input type="number" className="form-control" value={listingDetails.price} onInput={(e) => { setListingDetails({ ...listingDetails, price: e.target.value }) }} disabled={!editMode}></input>:<><span style={{ fontWeight: "" ,fontSize:"20px" }}>{listingDetails.price}</span><span style={{ fontSize: "20px", fontWeight: "", marginLeft: "5px" }}>
                    {"/" + listingDetails.priceUnit}
                  </span></>}
                  
                </div>
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
              <div className="row m-2">
                <div className="col-2" style={{ fontWeight: "bold" }}>
                  <span style={{ fontSize: "20px" }}>Description:</span >
                </div>
                <div className="col-6">
                {editMode?<input type="text" className="form-control" value={listingDetails.description} onInput={(e) => { setListingDetails({ ...listingDetails, description: e.target.value }) }} disabled={!editMode}></input>:<span style={{ fontWeight: "" ,fontSize:"20px" }}>{listingDetails.description}</span>}
             
                </div>
              </div>

              <hr />
              <h3 className="mb-3"> <u>Contact Details</u> </h3>
              {!auth.user ? (
                <div>
                  <p>
                    {" "}
                    Contact:{" "}
                    <strong className="blurme">Login to Continue</strong>
                  </p>
                  <p>
                    <span style={{ fontSize: "20px" }}> WhatsApp:</span>{" "}
                    <strong className="blurme">Login to Continue</strong>
                  </p>
                </div>
              ) : (
                <div>
                  <div className="row m-2">
                    <div className="col-2">
                      <span style={{ fontWeight: "bold", fontSize: "20px" }}>   Contact:</span>
                    </div>
                    <div className="col-6">
                    {editMode?<input type="number" className="form-control" value={listingDetails.phone} onInput={(e) => { setListingDetails({ ...listingDetails, phone: e.target.value }) }} disabled={!editMode}></input>:<span style={{ fontWeight: "" ,fontSize:"20px" }}>{listingDetails.phone}</span>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2 m-2">
                      <span style={{ fontWeight: "bold", fontSize: "20px" }}> WhatsApp:</span>
                    </div>
                    <div className="col-6">
                    {editMode?<input type="number" className="form-control" value={listingDetails.whatsappNumber} onInput={(e) => { setListingDetails({ ...listingDetails, whatsappNumber: e.target.value }) }} disabled={!editMode}></input>:<span style={{ fontWeight: "" ,fontSize:"20px" }}>{listingDetails.whatsappNumber}</span>}
                    </div>
                  </div>
                </div>
              )}
              <div className="row m-2">
                <div className="col-2">
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}> Zip Code:</span>

                </div>
                <div className="col-6">

{editMode?<input type="number" className="form-control" value={listingDetails.zipCode} onInput={(e) => { setListingDetails({ ...listingDetails, zipCode: e.target.value }) }} disabled={!editMode}></input>:<span style={{ fontWeight: "" ,fontSize:"20px" }}>{listingDetails.zipCode}</span>}                </div>
              </div>
              <div className="row m-2">
                <div className="col-2">
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>   Address:</span>
                </div>
                <div className="col-6">
                {editMode?<input type="text" className="form-control" value={listingDetails.address} onInput={(e) => { setListingDetails({ ...listingDetails, address: e.target.value }) }} disabled={!editMode}></input>:<span style={{ fontWeight: "" ,fontSize:"20px" }}>{listingDetails.address}</span>}                </div>
              </div>



              {isLocationAvailable && (
                <>
                  {/* <p> <span style={{fontSize:"20px"}}></span>Address: <input type="text" value={listingDetails.description} onInput={(e)=>{setListingDetails({...listingDetails,description:e.target.value})}} disabled={!editMode}></input></p> */}
                  {/* <p><span style={{fontSize:"20px"}}>City:</span> <input type="text" value={listingDetails.description} onInput={(e)=>{setListingDetails({...listingDetails,description:e.target.value})}} disabled={!editMode}></input></p> */}
                  {/* <p><span style={{fontSize:"20px"}}>State: </span><input type="text" value={listingDetails.whats} onInput={(e)=>{setListingDetails({...listingDetails,description:e.target.value})}} disabled={!editMode}></input></p> */}
                </>
              )}

              <div className=""><Link to={"/"}><button className="btn btn-danger w-50 m-5">Back To Home</button></Link></div>
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
