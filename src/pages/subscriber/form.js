import { useContext, useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { Button, Typography } from "@mui/material";
import { PostAdd, Block } from "@mui/icons-material";

import Listing from "../../components/form/Listing";
import { AuthContext } from "../../context/auth";
import SubscriberLayout from "../../components/layout/SubscriberLayout";

const Form = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isExpired, setisExpired] = useState(true);
  const [isTrialOver, setisTrialOver] = useState(true);
  const checkPayments = async () => {
    try {
      const response = await axios.post("/check", { user: auth.user._id });

      setisExpired(response.data.data.isExpired);
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
  }, [auth.user, isExpired, isTrialOver]);

  return (
    <SubscriberLayout>
      {isExpired ? (
        <>
          <Button
            variant="contained"
            style={{
              backgroundColor: "red",
              color: "white",
              marginRight: "5px",
            }}
          >
            Buy Plans
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Block />}
            disabled
            className='ad-btn'
                     
                    to="/signin" style={{ backgroundImage:" linear-gradient(to top bottom , #FF512F, #DD2476)","margin":"10px" ,color:"#fff",borderRadius:"7px" }} 
          >
            Post Your Ad
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            c
            // style={{ backgroundColor: "red", padding: "10px", margin: "10px" }}
            startIcon={<PostAdd />}
            className='ad-btn'
                     
                    to="/signin" style={{ backgroundImage:" linear-gradient(to top bottom , #FF512F, #DD2476)","margin":"10px" ,color:"#fff",borderRadius:"7px" }} 
          >
            Post Your Ad
          </Button>
          <Listing />
        </>
      )}
    </SubscriberLayout>
  );
};

export default Form;
