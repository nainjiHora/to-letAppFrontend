import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import { red } from "@mui/material/colors";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

import { useEffect,useRef } from "react";
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
let form=useRef()
let params=useParams()

  const [charge,setCharge]=useState(0)
  const [auth,setAuth]=useState(JSON.parse(localStorage.getItem("auth")))
  const [user,setUser]=useState(auth.user)
  const [url,setUrl]=useState("")
  const [accessCode,setAccessCode]=useState("")
  const [encRequest,setEnc]=useState("")



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
        const planDetails = {
          name: "listing",
          amount,
          planValidity: 14,
        };
 
       
          
            try {
  
             handleFormSubmit(1,charge)
            } catch (error) {
              // setisModeoOpen(false);
  
              Swal.fire({
                title: "Error!",
                text: "Do you want to Try again !!",
                icon: "error",
                confirmButtonText: "Cool",
              });
            }
          
        
  
       
      } catch (error) {
        console.error("Error saving listing:", error);
      }
    }else{
      if(user.listing_count>0){
        
        // return
handleFormSubmit(0)
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
  function ccavenue(){
    axios.post('/try',{email:user.email,name:user.name,amount:charge,plan:'subscriber/ads'}).then((data)=>{
      setUrl(data.data.paymentUrl)
      setEnc(data.data.paymentEnc)
      setAccessCode(data.data.payment_key)
      pay();
    })
  }
  function pay(){
    
    setTimeout(() => {
     
      form.current && form.current.submit();
    }, 500);
   }

   

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
    <form ref={form} id="nonseamless" method="post" name="redirect" action={url}>
    <input type="hidden" id="encRequest" name="encRequest" value={encRequest} />
    <input type="hidden" name="access_code" id="access_code" value={accessCode} />
  </form>
    </Container>
  );
};

export default ChargesCalculator;
