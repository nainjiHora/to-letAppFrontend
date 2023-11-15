import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import { Typography, Grid, Modal, TextField, Container } from "@mui/material";
import Swal from "sweetalert2";
import { red } from "@mui/material/colors";
import SubscriberLayout from "../../components/layout/SubscriberLayout";
import SubscriberCard from "../../components/card/SubscriberCard";
import { useNavigate } from "react-router-dom";
import ChargesCalculator from "../../components/ChargesCalculator";
import SearchIcon from '@mui/icons-material/Search';
const Post = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chargedPrice, setChargedPrice] = useState();
  const [listingPrice, setListingPrice] = useState();

  const [isModelOPen, setisModeoOpen] = useState(false);
  const [listingId, setListingId] = useState("");

  useEffect(() => {
    if (auth.user && auth.user._id) fetchListings();
  }, [auth.user]);

  const navigate = useNavigate();

  const handleRenewClick = async (listingId, price) => {
    setisModeoOpen(true);
    setListingPrice(price);
    setListingId(listingId);
  };
  const fetchListings = async () => {
    try {
      const response = await axios.get(`/listing/get/subs/${auth.user._id}`);
      setListings(response.data.listings);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setisModeoOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const amount = chargedPrice;
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
        name: "Premium",
        amount,
        planValidity: 30,
      };
      const listingData = {
        user: auth.user._id,
        listingId: listingId,
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
          try {
            const verifyUrl = "/paymentrenewal";
            const { data } = await axios.put(verifyUrl, {
              response,
              BookingData,
              planDetails,
              auth,
              listingData,
            });

            if (data.payment_id) {
              setisModeoOpen(false);
              fetchListings();
              Swal.fire({
                icon: "success",
                title: `Congratulation!!`,
                text: "Property Subscription Updated Successfully!",
                confirmButtonText: "cool",
              }).then(() => {
                navigate("/subscriber/ads");
              });
              setLoading(false);
            } else {
              setisModeoOpen(false);

              Swal.fire({
                title: "Error!",
                text: "Do you want to Try again !!",
                icon: "error",
                confirmButtonText: "Cool",
              });
            }
          } catch (error) {
            setisModeoOpen(false);

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
  };

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function changeList(index){
    console.log(index)
let temp=[...listings]
temp[index].is_booked=temp[index].is_booked?0:1
setListings(temp)
  }

  return (
    <SubscriberLayout>
      <Container className="posts" >
        <Typography variant="h3" align="center" className="ads-heading" sx={{ color: "#b30707", margin:"20px 0" ,letterSpacing:"0.5px"}}>
          Your Ads
        </Typography>
        <TextField
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          className="add-search-box"
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "50%", marginBottom: 2 }}
          InputProps={{
            startAdornment: <SearchIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
            
          }}  
        />

        <Grid container>
          {filteredListings.map((listing, idx) => (
            <Grid item xs={12} md={3} key={listing._id}>
              <SubscriberCard
                list={listing}
                
                handleRenewClick={handleRenewClick}
              />
            </Grid>
          ))}
        </Grid>

        <Container maxWidth="lg"></Container>
        <Modal
          open={isModelOPen}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClose={handleCloseModal}
        >
          <div
            className="modal-content"
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "70%",
              maxHeight: "100vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ChargesCalculator
              days={30}
              price={listingPrice}
              handleFormSubmit={handleFormSubmit}
              setChargedPrice={setChargedPrice}
            />
          </div>
        </Modal>
      </Container>
    </SubscriberLayout>
  );
};

export default Post;
