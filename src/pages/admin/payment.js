import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Typography,
  TablePagination,
} from "@mui/material";
import AdminLayout from "../../components/layout/AdminLayout";

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalDocs, setTotalDocs] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/admin/payments?page=${
            page + 1
          }&limit=${rowsPerPage}&search=${searchTerm}`
        );
        setPayments(response.data.totalPayments.docs);
        setTotalDocs(response.data.totalPayments.totalDocs);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchData();
  }, [searchTerm, page, rowsPerPage]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom>
        Payments
      </Typography>
      <TextField
        label="Search by User"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: 16 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Order Id</TableCell>
              <TableCell>Payment Id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Property</TableCell>
              <TableCell>Price</TableCell>
              {/* Add more columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell>{payment.user.name}</TableCell>
                <TableCell>{payment.user.email}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.razorpay_order_id}</TableCell>
                <TableCell>{payment.razorpay_payment_id}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.time}</TableCell>
                <TableCell>
                  {payment.listingId && payment.listingId.title}
                </TableCell>
                <TableCell>
                  {payment.listingId && payment.listingId.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30]}
        component="div"
        count={totalDocs}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </AdminLayout>
  );
}

export default AdminPayments;
