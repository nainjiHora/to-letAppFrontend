import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import { red } from "@mui/material/colors";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
const buttonStyle = {
  backgroundColor: red[500],
  color: "#FFFFFF",
};


const ChargesCalculator = ({
  price,
  goToPreviousPage,
  handleFormSubmit,
  setChargedPrice,
  days,
}) => {
let nav=useNavigate()
  const [charge,setCharge]=useState(0)
  const [auth,setAuth]=useState(JSON.parse(localStorage.getItem("auth")))
  const [user,setUser]=useState(auth.user)



  const calculateCharges = () => {
    axios.post("/getPlanDetail",{user_id:auth.user._id}).then((data)=>{
      setUser(data.data.result[0])
      if(data.data.result[0].plan.toLowerCase()=="percent"){
           let a=(5/100)*price
           setCharge(a)
      }
      else{
       if( data.data.result[0].listing_count>0){
        setCharge(0)
       }
       else{
        Swal.fire({
          title:"Plan Expired ",
          text: "Your plan is Expired , Renew Your plan To list your property",
          icon: "info",
          confirmButtonText: 'Go To Plan Page',
          cancelButtonText: "No, cancel it!",
          showCancelButton: true,
          dangerMode: true,
        }).then(function(isConfirm) {
          if (isConfirm.isConfirmed) {
            nav("/subscriber/plans")
          }})
       }
      }
    })
  };

  var postList=async()=>{
    if(charge>0){
      try {
        const amount = charge;
        const {
          data: { key },
        } = await axios.get("/getkey");
        const {
          data: { order },
        } = await axios.post("/checkout", {
          amount,
        });
  
        const BookingData = {
          razorpay_order_id: order.id,
          razorpay_payment_id: order.id,
          amount: order.amount,
        };
        const planDetails = {
          name: "listing",
          amount,
          planValidity: 14,
        };
 
        const options = {
          key,
          amount: order.amount,
          currency: "INR",
          name: "Razorpay",
          description: "RazorPay",
          image: "",
          order_id: order.id,
  
          handler: async (response) => {
            console.log(response)
            try {
  
              handleFormSubmit()
            } catch (error) {
              // setisModeoOpen(false);
  
              Swal.fire({
                title: "Error!",
                text: "Do you want to Try again !!",
                icon: "error",
                confirmButtonText: "Cool",
              });
            }
          },
        };
  
        const razor = new window.Razorpay(options);
        razor.open();
      } catch (error) {
        console.error("Error saving listing:", error);
      }
    }else{
      if(user.listing_count>0){
        console.log(9)
        // return
handleFormSubmit()
      }
      else{
        Swal.fire({
          title:"Plan Expired ",
          text: "Your plan is Expired , Renew Your plan To list your property",
          icon: "info",
          confirmButtonText: 'Go To Plan Page',
          cancelButtonText: "No, cancel it!",
          showCancelButton: true,
          dangerMode: true,
        }).then(function(isConfirm) {
          if (isConfirm.isConfirmed) {
            nav("/subscriber/plans")
          }})
      }
    }
  }
  useEffect(()=>{
    calculateCharges()
  },[])

  return (
    <Container maxWidth="lg">
      <form style={{ margin: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Charges Calculation
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box>
              <p style={{ fontWeight: "bold" }}>
              {console.log(auth)}
               {user.plan=="percent"?(<h5>As per Plan you have to pay 5% of the listing price</h5>):(<h5>You can List {user.listing_count-1} Properties After Listing this Property for Free As per your Plan.</h5>)}
              </p>
              {/* <p style={{ fontWeight: "bold" }}>Maximum Charge: 500</p> */}
              <Typography
                variant="hg"
                align="center"
                style={{ fontWeight: "bold" }}
                gutterBottom
              >
                Validity : 14 days
              </Typography>

              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                Listing Price: {price} ₹
              </Typography>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                 Amount to pay for listing&nbsp;:&nbsp;{charge}&nbsp;₹
              </Typography>
              <div
                style={{ display: "flex", margin: "10px ", padding: "10px" }}
              >
                {goToPreviousPage && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={goToPreviousPage}
                  >
                    Back to Listing Information
                  </Button>
                )}

                <Button
                  
                  
                  variant="contained"
                  style={buttonStyle}
                  onClick={()=>{postList()}}
                >
                   Post
                </Button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ChargesCalculator;
