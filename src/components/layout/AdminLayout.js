import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import LoadingToRedirect from "./LoadingToRedirect";
import AdminNav from "../nav/AdminNav";
const AdminLayout = ({ children }) => {
  const [auth, setAuth] = useContext(AuthContext);

  const router = useNavigate();

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (auth?.token) {
      getCurrentAdmin();
    }
  }, [auth?.token]);

  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get(`/current-admin`);
      if (data.ok) {
        setLoading(false);
      }
    } catch (err) {
      router("/home");
    }
  };

  return loading ? (
    <LoadingToRedirect />
  ) : (
    <div className="d-flex">
      <AdminNav />
      <div className="flex-grow-1 over">{children}</div>
    </div>
  );
};

export default AdminLayout;
