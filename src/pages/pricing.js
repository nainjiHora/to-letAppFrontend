import { useContext, useEffect, useState } from "react";
import Card from "../components/card/Card";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth";
import Button from "react-bootstrap/Button";
import { Card, Grid } from "@mui/material";

const Pricing = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [wallet, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [checkSubscription, setCheckSubscription] = useState({});
  const [isExpired, setisExpired] = useState(true);
  const [isTrialOver, setisTrialOver] = useState(true);
  const plans = [
    {
      _id: "1",
      name: "Trial Plan",
      planTime: 7,
      planAmount: 0,
      planProfit: 0,
      planTotalIncome: 0,
      img: "trial-plan-image-url",
    },
    {
      _id: "2",
      name: "Premium Plan",
      planTime: 30,
      planAmount: 100,
      planProfit: 10,
      planTotalIncome: 300,
      img: "premium-plan-image-url",
    },
  ];

  const checkPayments = async () => {
    try {
      const response = await axios.post("/check", { user: auth.user._id });

      let data = response.data.data;
      setisExpired(response.data.data.isExpired);
      setisTrialOver(response.data.data.isTrialOver);
      setCheckSubscription(response.data.data.isExpired);
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
  }, [auth.user, isExpired, isTrialOver]);

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
  return (
    <div>
      <h1>Welcome To Pricing</h1>
      <Grid container spacing={2}>
        {plans.map((plan) => (
          <Grid key={plan._id} item xs={12} sm={6}>
            <Card
              name={plan.name}
              planValidity={plan.planTime}
              amount={plan.planAmount}
              checkoutHandler={checkoutHandler}
              isTrialOver={isTrialOver}
              isExpired={isExpired}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Pricing;
