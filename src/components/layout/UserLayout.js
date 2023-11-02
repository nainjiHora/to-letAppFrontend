import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import LoadingToRedirect from "./LoadingToRedirect";

const UserLayout = ({ children }) => {
  const [auth, setAuth] = useContext(AuthContext);

  const router = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.token) {
      getCurrentUser();
    }
  }, [auth?.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/current-user`);
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
      <div className="flex-grow-1">{children}</div>
    </div>
  );
};

export default UserLayout;
