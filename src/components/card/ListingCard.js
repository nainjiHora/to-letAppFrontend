import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Common from "../common";
import { useState } from "react";
import "./main.css"
import axios from "axios";


function ListingCard({ listing }) {

  function updateViewCount(){
    axios.post("/updateViewCount",{email:JSON.parse(localStorage.getItem('auth')).user.email}).then(()=>{
      let a=JSON.parse(localStorage.getItem('auth'))
      a.user.view_count=a.user.view_count?a.user.view_count+1:1
      localStorage.setItem("auth",JSON.stringify(a))
    })
  }
  const [onHover,setOnHover]=useState(false)
  var common=new Common()
  return (
    <div onMouseEnter={()=>{setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}} className="list-card">
      <div className="card-deck p-2">
        <div className="card p-2" >
          <div>
            <Carousel>
              {listing.images.map(
                (url, index) =>
                  url && (
                    <Carousel.Item key={index}>
                      <div class="img-wrapper">
                      <img
                        src={url}
                        className="smallimg d-block w-100 h-40 "
                        alt={`Image ${index}`}
                        
                      />
                      </div>
                    </Carousel.Item>
                  )
              )}
            </Carousel>
          </div>
         
            <div className="card-body bginc">
              <div className="d-flex justify-content-between"><h4 className="card-title">{common.capitalize(listing.title)}</h4><h5>{listing.price}</h5></div>
              <div className="d-flex justify-content-between"><h4 className="card-title">{common.capitalize(listing.state)}</h4><h5>{common.capitalize(listing.category)}</h5></div>

              {<Link to={`/ads/${listing._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <button className="btn btn-danger w-100" style={{backgroundColor:onHover?"":"",border:onHover?"":"none"}} onClick={()=>{updateViewCount()}}>More Details</button>
              </Link>}

            </div>
          
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
