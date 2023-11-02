import React, { useState, useEffect, useContext } from "react";
// import AdminNav from "../../components/nav/AdminNav";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import LoadingToRedirect from "./LoadingToRedirect";
import SubscriberNav from "../nav/SubscriberNav";

const SubscriberLayout = ({ children }) => {
   // context
   const [auth, setAuth] = useContext(AuthContext);
   // hooks
   const router = useNavigate();
 
   // state
   const [loading, setLoading] = useState(true);
   const [count, setCount] = useState(3);
 
   useEffect(() => {
     if (auth?.token) {
       getCurrentSubscriber();
     }
   }, [auth?.token]);
 
   const getCurrentSubscriber = async () => {
     try {
       const { data } = await axios.get(`/current-subscriber`);
       if (data.ok) {
         setLoading(false);
       }
     } catch (err) {
        router("/");
     }
   };

  return loading ? (
    <LoadingToRedirect />
  ) : (
    <>
   
    <div className="d-flex" >
      {/* <AdminNav /> */}
      <SubscriberNav style={{"position":"relative"}}/>
      <div className="flex-grow-1 over" style={{"position":"relative"}}>
        {children}
      </div>
    </div>
    </>
    
  );
};

export default SubscriberLayout;
