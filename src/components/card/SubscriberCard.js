import React from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Common from "../common";

import moment from "moment";
import { Link,useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
function SubscriberCard({ list, handleRenewClick}) {
  const [listing,setListing]=useState(list)
  const currentDate = moment().format("YYYY-MM-DD");
  const isExpired = moment(listing.expiryDate).isBefore(currentDate);
  const userData=JSON.parse(localStorage.getItem('auth')).user
  var auth=JSON.parse(localStorage.getItem('auth'))
var common=new Common()
var nav=useNavigate()
function changeBooked(){
  Swal.fire({
    title:listing.is_booked? "Is this Place Available":"Is this Place Booked",
    text: listing.is_booked?"Are you sure this place is Available ?":"Are you sure this place is booked ?",
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
function boostListing(){
  Swal.fire({
    title:"Are you Sure to Boost this Listing?",
    text: "Boosting The listing will make this property listed on the top of others",
    icon: "info",
    confirmButtonText: 'Yes, Boost this List',
    cancelButtonText: "No, cancel it!",
    showCancelButton: true,
    dangerMode: true,
  }).then(function(isConfirm) {
    if (isConfirm.isConfirmed) {
      
      axios.get('/listing/boost/'+listing._id+'/'+userData._id).then((data)=>{
        
        if(data.data.success){
          let temp={...listing}
          temp.boost=1
          setListing(temp)
          
          let tempAuth={...auth}
         tempAuth.user.boost_available=tempAuth.user.boost_available-1
         localStorage.setItem("auth",JSON.stringify(tempAuth))
          Swal.fire({
            icon: "success",
            title: `Congratulation!!`,
            text: "Listing Boosted Successfully!",
            confirmButtonText: "Done",
          });
        }
        else{
          Swal.fire({
            title:"No Boost Available",
            text: "Buy Some Boosts to get your listings on Top",
            icon: "danger",
            confirmButtonText: 'Buy Boost',
            cancelButtonText: "Cancel",
            showCancelButton: true,
            dangerMode: true,
          }).then(function(isConfirm) {
            if (isConfirm.isConfirmed) {
              nav("/subscriber/boost")
            }
        })
      }
     
    
  })
    }
})
}
  return (
    <div>
      <div className="card-deck p-2">
        <div className="card p-2">
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
              
                <p>Price : {listing.price}<CurrencyRupeeIcon fontSize="small"/></p>
               
              
            </div>
          </Link>

          <div>
            <p style={{ color: isExpired ? "red" : "green" }}>
              Status: {isExpired ? "Expired" : "Active"}
            </p>
            {isExpired ? (
              <Button
                type="primary"
                onClick={() => handleRenewClick(listing._id, listing.price)}
              >
                Renew
              </Button>):<>
        {listing.boost==0 && <button className="btn btn-primary w-100" onClick={()=>boostListing()}>Boost</button>}
        <button className="btn  w-100 text-white mt-2" style={{backgroundColor:"#b30707",color:"#fff"}} onClick={()=>{changeBooked()}}>{listing.is_booked?"Mark as Available":"Mark as Booked"}</button>

              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriberCard;
