import React, { useState, useEffect, useContext } from "react";
// import AdminNav from "../../components/nav/AdminNav";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import LoadingToRedirect from "./LoadingToRedirect";

const TrialLayout = ({ children }) => {
   // context
   const [auth, setAuth] = useContext(AuthContext);
   // hooks
   const router = useNavigate();
 
   // state
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     if (auth?.token) {
       getCurrentSubscriber();
     }
   }, [auth?.token]);
 
   const getCurrentSubscriber = async () => {
     try {
       const { data } = await axios.get(`/current-trial-user`);
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
    <div className="d-flex">
      {/* <AdminNav /> */}
      <div className="flex-grow-1">
        {children}
      </div>
    </div>
  );
};

export default TrialLayout;
