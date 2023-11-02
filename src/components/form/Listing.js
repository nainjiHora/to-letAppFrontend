import React, { useContext, useState, useEffect } from "react";
import FileUpload from "../upload/FileUpload";
import { AuthContext } from "../../context/auth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { red } from "@mui/material/colors";
import axios from "axios";
import ChargesCalculator from "../ChargesCalculator";
import Map from "../map/Map";
const initialState = {
  images: [],
};
const formContainerStyle = {
  marginTop: "20px",
  padding: "20px",
  backgroundColor: "#FFFFFF",
  border: `2px solid ${red[500]}`,
  borderRadius: "8px",
};

const formGroupStyle = {
  marginBottom: "16px",
};

const buttonStyle = {
  backgroundColor: red[500],
  color: "#FFFFFF",
};

const Listing = (props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [pricingType, setPricingType] = useState("SELECT");
  const [category, setCategory] = useState("Select");
  const [price, setPrice] = useState("");
  const [otherCategory, setotherCategory] = useState("");

  const [maxPrice, setMaxPrice] = useState("");
  const [priceUnit, setPriceUnit] = useState("No unit");
  const [description, setDescription] = useState("");

  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [address, setAddress] = useState("");
  const [data] = useContext(AuthContext);

  const [Images, setImages] = useState([]);
  const [Imagevalues, setImagevalues] = useState(initialState);
  const [visible, setVisible] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [youtubeVideoLink, setYoutubeVideoLink] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [chargedPrice, setChargedPrice] = useState();
  const [isTrialOver, setisTrialOver] = useState(true);

  const [locationState, setLocationState] = useState({
    address: "",
    city: "",
    area: "",
    state: "",
    mapPosition: {
      lat: 20.5937,
      lng: 78.9629,
    },
    markerPosition: {
      lat: 20.5937,
      lng: 78.9629,
    },
  });

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
        user: data.user._id,
        title: title,
        pricingType: pricingType,
        price: price,
        maxPrice: maxPrice,
        priceUnit: priceUnit,
        description: description,
        images: Images,
        state: state,
        phone: phone,
        zipCode: zipCode,
        whatsappNumber: whatsappNumber,
        address: address,
        youtubeVideoLink: youtubeVideoLink,
        category: category,
        locationState: locationState,
        otherCategory: otherCategory,
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
            const verifyUrl = "/paymentverification";
            const { data } = await axios.post(verifyUrl, {
              response,
              BookingData,
              planDetails,
              auth,
              listingData,
            });

            Swal.fire({
              icon: "success",
              title: `Congratulation!!`,
              text: "Property Created Successfully!",
              confirmButtonText: "cool",
            }).then(() => {
              navigate("/subscriber/ads");
            });
            setLoading(false);
          } catch (error) {
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

  const handleWithoutChargesSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/listing/create", {
        user: data.user._id,
        title: title,
        pricingType: pricingType,
        price: price,
        maxPrice: maxPrice,
        priceUnit: priceUnit,
        description: description,
        images: Images,
        state: state,
        phone: phone,
        zipCode: zipCode,
        whatsappNumber: whatsappNumber,
        address: address,
        youtubeVideoLink: youtubeVideoLink,
        category: category,
        locationState: locationState,
        otherCategory: otherCategory,
      });

      Swal.fire({
        icon: "success",
        title: `Congratulation!!`,
        text: "Property Created Successfully!",
        confirmButtonText: "cool",
      }).then(() => {
        navigate("/subscriber/ads");
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Do you want to Try again !!",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  const checkoutHandler = async (amount, name, planValidity) => {
    setLoading(true);
    try {
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
        name,
        amount,
        planValidity,
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
            const verifyUrl = "/paymentverification";
            const { data } = await axios.post(verifyUrl, {
              response,
              BookingData,
              planDetails,
              auth,
            });
            toast.success("Payment Successful");
            setLoading(false);
          } catch (error) {}
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      setLoading(false);
    }
  };

  const goToSecondPage = () => {
    setCurrentPage(2);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToThirdPage = () => {
    setCurrentPage(3);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const checkPayments = async () => {
    try {
      const response = await axios.post("/check", { user: auth.user._id });

      setisTrialOver(response.data.data.isTrialOver);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching Payments:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (auth.user && auth.user._id) {
      checkPayments();
    }
  }, [auth.user]);

  return (
    <Container maxWidth="lg">
      {currentPage === 1 && (
        <form onSubmit={handleWithoutChargesSubmit} style={formContainerStyle}>
          <Typography variant="h4" align="center" gutterBottom>
            Listing Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box style={formGroupStyle}>
                <TextField
                  label="Title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box style={formGroupStyle}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="category">Select a category</InputLabel>
                  <Select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value="flat">Flat</MenuItem>
                    <MenuItem value="house">House</MenuItem>
                    <MenuItem value="pg">PG</MenuItem>
                    <MenuItem value="room">Room</MenuItem>
                    <MenuItem value="shop">Shop</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {category === "others" && (
                <Box style={formGroupStyle}>
                  <TextField
                    label="Other Category"
                    fullWidth
                    value={otherCategory}
                    onChange={(e) => setotherCategory(e.target.value)}
                  />
                </Box>
              )}

              <Box style={formGroupStyle}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="pricingType">Price Type</InputLabel>
                  <Select
                    id="pricingType"
                    value={pricingType}
                    onChange={(e) => setPricingType(e.target.value)}
                  >
                    <MenuItem value="PRICE">Price</MenuItem>
                    {/* <MenuItem value="PRICE_RANGE">Price Range</MenuItem>
                    <MenuItem value="DISABLED">Disabled</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>
              {pricingType === "PRICE" && (
                <Box style={formGroupStyle}>
                  <TextField
                    label="Price [₹]"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Box>
              )}
              {/* {pricingType === "PRICE_RANGE" && (
                <Box style={formGroupStyle}>
                  <TextField
                    label="Price [₹]"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Box>
              )}
              {pricingType === "PRICE_RANGE" && (
                <Box style={formGroupStyle}>
                  <TextField
                    label="Max Price [₹]"
                    fullWidth
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </Box>
              )} */}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box style={formGroupStyle}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="priceUnit">Price Unit</InputLabel>
                  <Select
                    id="priceUnit"
                    value={priceUnit}
                    onChange={(e) => setPriceUnit(e.target.value)}
                  >
                    <MenuItem value="">No unit</MenuItem>
                    <MenuItem value="year">Year (per year)</MenuItem>
                    <MenuItem value="month">Month (per month)</MenuItem>
                    <MenuItem value="week">Week (per week)</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box style={formGroupStyle}>
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>

          <Typography variant="h4" align="center" gutterBottom>
            Contact Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box style={formGroupStyle}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="state">State</InputLabel>
                  <Select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <MenuItem value="delhi">Delhi</MenuItem>
                    <MenuItem value="mumbai">Mumbai</MenuItem>
                    <MenuItem value="jaipur">Jaipur</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box style={formGroupStyle}>
                <TextField
                  label="Phone"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Box>
              <Box style={formGroupStyle}>
                <TextField
                  label="Zip Code"
                  fullWidth
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box style={formGroupStyle}>
                <TextField
                  label="WhatsApp Number"
                  fullWidth
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                />
              </Box>
              <Box style={formGroupStyle}>
                <TextField
                  label="Address"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>

          <Typography variant="h4" align="center" gutterBottom>
            Upload Images
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box style={formGroupStyle}>
                <label htmlFor="state">Images:</label>
                <div className="p-3">
                  <FileUpload
                    Imagevalues={Imagevalues}
                    setImagevalues={setImagevalues}
                    loadingDelete={loadingDelete}
                    setLoadingDelete={setLoadingDelete}
                    visible={visible}
                    setVisible={setVisible}
                    Images={Images}
                    setImages={setImages}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box style={formGroupStyle}>
                <TextField
                  label="YouTube Video Link"
                  fullWidth
                  value={youtubeVideoLink}
                  onChange={(e) => setYoutubeVideoLink(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" marginTop={3}>
            <Button
              onClick={goToNextPage}
              variant="contained"
              style={buttonStyle}
            >
              Next
            </Button>
          </Box>
        </form>
      )}

      {currentPage === 2 && (
        <>
          <div
            style={{
              margin: "100px",
              marginBlockStart: "150px",
              marginBottom: "50px",
            }}
          >
            <Map
              google={props.google}
              center={{ lat: 18.5204, lng: 73.8567 }}
              height="300px"
              zoom={15}
              setLocationState={setLocationState}
            />
          </div>

          <Button
            onClick={goToPreviousPage}
            variant="contained"
            style={buttonStyle}
          >
            Previous
          </Button>

          {!isTrialOver && (
            <Button
              type="submit"
              onClick={handleWithoutChargesSubmit}
              variant="contained"
              style={buttonStyle}
            >
              Submit
            </Button>
          )}

          {isTrialOver && (
            <Button
              onClick={goToNextPage}
              variant="contained"
              style={buttonStyle}
            >
              Next
            </Button>
          )}
        </>
      )}

      {isTrialOver && currentPage === 3 && (
        <ChargesCalculator
          price={price}
          goToPreviousPage={goToPreviousPage}
          handleFormSubmit={handleFormSubmit}
          setChargedPrice={setChargedPrice}
        />
      )}
    </Container>
  );
};

export default Listing;