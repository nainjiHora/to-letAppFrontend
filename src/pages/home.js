// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { AuthContext } from "../context/auth";
// const Home = () => {
//   const [auth, setAuth] = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [listings, setListings] = useState([]);
//   const [checkSubscription, setCheckSubscription] = useState({});
//   const [isExpired, setisExpired] = useState(true);
//   const [isTrialOver, setisTrialOver] = useState(true);
//   const plans = [
//     {
//       _id: "1",
//       name: "Trial Plan",
//       planTime: 7,
//       planAmount: 0,
//       planProfit: 0,
//       planTotalIncome: 0,
//       img: "trial-plan-image-url",
//     },
//     {
//       _id: "2",
//       name: "Premium Plan",
//       planTime: 30,
//       planAmount: 100,
//       planProfit: 10,
//       planTotalIncome: 300,
//       img: "premium-plan-image-url",
//     },
//   ];

//   const checkPayments = async () => {
//     try {
      
//       const response = await axios.post("/check", { user: auth.user._id }); 
      
//       let data = response.data.data;
//       setisExpired(response.data.data.isExpired);
//       setisTrialOver(response.data.data.isTrialOver);
//       setCheckSubscription(response.data.data.isExpired);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching Payments:", error);
//       setLoading(false);
//     }
//   };
  
  
  
  
  
  

//   const checkoutHandler = async (amount, name, planValidity) => {
//     setLoading(true);
//     try {
      
//       const {
//         data: { key },
//       } = await axios.get("/getkey");
//       const {
//         data: { order },
//       } = await axios.post("/checkout", {
//         amount,
//       });

      
//       const BookingData = {
//         razorpay_order_id: order.id,
//         razorpay_payment_id: order.id,
//         amount: order.amount,
//       };
//       const planDetails = {
//         name,
//         amount,
//         planValidity,
//       };

      
//       const options = {
//         key,
//         amount: order.amount,
//         currency: "INR",
//         name: "Razorpay",
//         description: "RazorPay",
//         image: "",
//         order_id: order.id,
        
//         handler: async (response) => {
//           try {
//             const verifyUrl = "/paymentverification"; 
//             const { data } = await axios.post(verifyUrl, {
//               response,
//               BookingData,
//               planDetails,
//               auth,
//             });
//             toast.success("Payment Successful");
//             setLoading(false);
//           } catch (error) {}
//         },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();
//     } catch (error) {
//       console.error("Error processing payment:", error);
//       setLoading(false);
//     }
//   };
//   const getAllListings = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("/listing/get"); 
//       setListings(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching listings:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome To Home</h1>
//       {/* <div className="row">
//         {plans.map((plan) => (
//           <Card
//             key={plan._id}
//             name={plan.name}
//             planValidity={plan.planTime}
//             amount={plan.planAmount}
//             checkoutHandler={checkoutHandler}
//             isTrialOver = {isTrialOver}
//             isExpired = {isExpired}
//           />
//         ))}
//       </div>

// <h2>Get All Listings endpoint /listing/get</h2>
// <div>
// <button onClick={getAllListings}>Get All Listings</button>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <ul>
//             {listings.map((listing) => (
//               <li key={listing._id}>{listing.title}</li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <h2>Check Posting Ability</h2>
//       {isExpired ? (
//         <>
//           <Button variant="primary">Buy Plans</Button>
//           <Button variant="primary" disabled>
//             Post Your Ad
//           </Button>
//         </>
//       ) : (
//         <>
//           <Button variant="primary">Post Your Ad</Button>
//         <Listing/>
//         </>
      
        
//       )} */}
//     </div>
//   );
// };

// export default Home;
