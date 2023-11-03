import React from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Common from "../common";

import moment from "moment";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
function SubscriberCard({ list, handleRenewClick}) {
  const [listing,setListing]=useState(list)
  const currentDate = moment().format("YYYY-MM-DD");
  const isExpired = moment(listing.expiryDate).isBefore(currentDate);
var common=new Common()
function changeBooked(){
  Swal.fire({
    title: "Is this Place Booked",
    text: "Are you Confirm this place is booked ?",
    icon: "warning",
    confirmButtonText: 'Yes, I am sure!',
    cancelButtonText: "No, cancel it!",
    showCancelButton: true,
    dangerMode: true,
  }).then(function(isConfirm) {
    if (isConfirm.isConfirmed) {
      
      axios.post('/listing/edit',listing).then((data)=>{
        
        if(data.data.success){
          let temp={...listing}
          temp.is_booked=temp.is_booked?0:1
          setListing(temp)
          
         
          Swal.fire({
            icon: "success",
            title: `Congratulation!!`,
            text: "Listing Updated Successfully!",
            confirmButtonText: "Done",
          });
        }
      })
     
    } 
  })

}
  return (
    <div>
      <div className="card-deck p-2">
        <div className="card p-2">
        <div className="d-flex justify-content-end"><input type="checkbox" checked={listing.is_booked} onChange={()=>{changeBooked()}}></input><span style={{fontSize:"14px",fontWeight:"600",marginLeft:"4px"}}>Booked</span></div>
          <div>
            <Carousel>
              {listing.images.map(
                (url, index) =>
                  url && (
                    <Carousel.Item key={index}>
                      <img
                        src={url}
                        className="smallimg d-block w-100"
                        

                        alt={`Image ${index}`}
                      />
                    </Carousel.Item>
                  )
              )}
            </Carousel>
          </div>
          <Link
            to={`/ads/${listing._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card-body">
              <h4 className="card-title">{common.capitalize(listing.title)}</h4>
              
                <p>Price : {listing.price}</p>
               
              
            </div>
          </Link>

          <div>
            <p style={{ color: isExpired ? "red" : "green" }}>
              Status: {isExpired ? "Expired" : "Active"}
            </p>
            {isExpired && (
              <Button
                type="primary"
                onClick={() => handleRenewClick(listing._id, listing.price)}
              >
                Renew
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriberCard;
