import React from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

import moment from "moment";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function SubscriberCard({ listing, handleRenewClick }) {
  const currentDate = moment().format("YYYY-MM-DD");
  const isExpired = moment(listing.expiryDate).isBefore(currentDate);

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
              <h4 className="card-title">{listing.title}</h4>
              <b>
                <p>Location: {listing.state}</p>
                <p>Phone Number : {listing.phone}</p>
                <p>Type : {listing.category}</p>
                <p>Price : {listing.price}</p>
                <p>Start Date : {listing.startDate}</p>

                <p>Expiry Date : {listing.expiryDate}</p>
              </b>
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
