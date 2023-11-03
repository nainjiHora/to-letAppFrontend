import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Common from "../common";

function ListingCard({ listing }) {

  var common=new Common()
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
                        className="smallimg d-block w-100 h-50"
                        alt={`Image ${index}`}
                        
                      />
                    </Carousel.Item>
                  )
              )}
            </Carousel>
          </div>
         
            <div className="card-body">
              <h4 className="card-title">{common.capitalize(listing.title)}</h4>
              <b>
                <p>Location: {listing.state}</p>
                <p>Type : {listing.category}</p>
                <p>Price : {listing.price}</p>
              </b>
              <Link to={`/ads/${listing._id}`} style={{ textDecoration: "none", color: "inherit" }}><button className="btn btn-danger w-100">To-Let</button></Link>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
