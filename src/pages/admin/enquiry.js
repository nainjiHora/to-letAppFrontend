import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  TablePagination,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import AdminLayout from "../../components/layout/AdminLayout";

const CollapsibleTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [enquiries, setEnquiries] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `/enquiry/get?page=${page}&limit=${rowsPerPage}&search=${searchQuery}`
        );
        console.log(response);
        setTotalCount(response.data.totalCount);
        setEnquiries(response.data.enquiry);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchUsers();
  }, [page, rowsPerPage, searchQuery]);

  const toggleRow = (userId) => {
    const newExpandedRows = expandedRows.includes(userId)
      ? expandedRows.filter((id) => id !== userId)
      : [...expandedRows, userId];
    setExpandedRows(newExpandedRows);
  };

  return (
    <AdminLayout>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Date</TableCell>

              <TableCell>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enquiries.map((user) => (
              <React.Fragment key={user._id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => toggleRow(user._id)}
                    >
                      {expandedRows.includes(user._id) ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile}</TableCell>

                  <TableCell>{user.date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={expandedRows.includes(user._id)}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Description
                        </Typography>
                        <Typography variant="h6" gutterBottom component="div">
                          {user.comment}
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={parseInt(totalCount)}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </AdminLayout>
  );
};

export default CollapsibleTable;
