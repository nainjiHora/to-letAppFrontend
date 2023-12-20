import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import { Typography, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import Table from "react-bootstrap/Table";
import SubscriberLayout from "../../components/layout/SubscriberLayout";
import SearchIcon from '@mui/icons-material/Search';

const Payments = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (auth.user && auth.user._id) fetchPayments();
  }, [auth.user]);

  useEffect(() => {
    handleSearch();
  }, [payments, searchQuery]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`/payments/${auth.user._id}`);
      setPayments(response.data.payments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    const filteredPayments = payments.filter((payment) =>{return true});
    setSearchResults(filteredPayments);
  };

  return (
    
    <SubscriberLayout >
    <div className="payments">
      <Typography variant="h5" align="center" sx={{ color: "#b30707",marginBottom:"10px" }}>
        Payments
      </Typography>
      <TextField
        // label="Search by Payment ID"
        placeholder="Search by Payment ID"
        variant="outlined"
        // fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
          
        }}      />
      {searchResults.length === 0 ? (
        <p>No payments available.</p>
      ) : (
        <Table responsive="sm">
          <thead>
            <tr>
              <th>SNO</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Property</th>
              <th>Price</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {searchResults.map((payment, idx) => (
              <tr key={payment._id}>
                <td>{idx + 1}</td>
                <td>{payment.date}</td>
                <td>{payment.time}</td>
                <td>{payment.amount}</td>
                <td>{payment.listingId && payment.listingId.title}</td>
                <td>{payment.listingId && payment.listingId.price}</td>
                {/* Add more table cells as needed */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    </SubscriberLayout>
  );
};

export default Payments;
