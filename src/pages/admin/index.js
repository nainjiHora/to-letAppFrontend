import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Grid, Typography, Divider } from "@mui/material";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderProgress from "../../components/progress/RenderProgress";

import { AuthContext } from "../../context/auth";
function Admin() {
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalAmountInPayments, setTotalAmountInPayments] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUsersTrialOver, setTotalUsersTrialOver] = useState(0);
  const [totalExpiredListings, setTotalExpiredListings] = useState(0);
  const [totalNonExpiredListings, setTotalNonExpiredListings] = useState(0);
  const [totalListings, setTotalListings] = useState(0);
  const [auth, setAuth] = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const response = await axios.get("/admin/count");
      const data = response.data;

      setTotalPayments(data.totalPayments);
      setTotalAmountInPayments(data.totalAmountInPayments);
      setTotalUsers(data.totalUsers);
      setTotalUsersTrialOver(data.totalUsersTrialOver);
      setTotalExpiredListings(data.totalExpiredListings);
      setTotalNonExpiredListings(data.totalNonExpiredListings);
      setTotalListings(data.totalListings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (auth.user !== null) fetchData();
  }, [auth.user]);

  return (
    <AdminLayout>
      <Grid container>
        <Grid item xs={12}>
          <Divider>
            <Typography variant="h1">Statistics</Typography>
          </Divider>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* Transactions */}
        <Grid item xs={12} sm={6}>
          <RenderProgress
            number={totalPayments}
            name="Transactions"
            link="/admin/posts"
          />
        </Grid>
        {/* Plans */}
        <Grid item xs={12} sm={6}>
          <RenderProgress
            number={totalAmountInPayments}
            name="Money Recived"
            link="/admin/comments"
          />
        </Grid>
        {/* Money Received */}
        <Grid item xs={12} sm={6}>
          <RenderProgress
            number={totalUsers}
            name="Total Users"
            link="/admin/categories"
          />
        </Grid>
        {/* Users */}
        <Grid item xs={12} sm={6}>
          <RenderProgress
            number={totalUsersTrialOver}
            name="Users with Trial Over "
            link="/admin/users"
          />
        </Grid>
        {/* Users whose trial is over */}
        <Grid item xs={12} sm={6}>
          <RenderProgress
            number={totalExpiredListings}
            name="Expired Listings"
            link="/admin/users-trial-over"
          />
        </Grid>
        {/* Expired Listings */}
        <Grid item xs={12} sm={6}>
          <RenderProgress
            number={totalNonExpiredListings}
            name="Active Listings"
            link="/admin/expired-listings"
          />
        </Grid>
        {/* Non-Expired Listings */}
        <Grid item xs={12} sm={6}>
          <RenderProgress
            number={totalListings}
            name="Total Listings"
            link="/admin/non-expired-listings"
          />
        </Grid>
        {/* Total Listings */}
        {/* <Grid item xs={12} sm={6}>
          <RenderProgress
            number={totalListings}
            name="Total Listings"
            link="/admin/total-listings"
          />
        </Grid> */}
      </Grid>
    </AdminLayout>
  );
}

export default Admin;
