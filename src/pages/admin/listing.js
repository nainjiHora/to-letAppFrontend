import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
  Box,
  Collapse,
  IconButton,
  CardMedia,
  Grid,
  TextField,
  InputAdornment,
  Switch,
  Button,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import AdminLayout from "../../components/layout/AdminLayout";
import { Link } from "react-router-dom";
const ListingsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listings, setListings] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showExpired, setShowExpired] = useState(false);
  const [showActive, setShowActive] = useState(false);
  const fetchListings = async () => {
    try {
      const response = await axios.get(
        `/listing/admin?page=${page}&limit=${rowsPerPage}&search=${searchQuery}&showExpired=${showExpired}&showActive=${showActive}`
      );
      setTotalCount(response.data.totalCount);
      setListings(response.data.listings);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [page, rowsPerPage, searchQuery, showExpired, showActive]);

  const toggleRow = (listingId) => {
    const newExpandedRows = expandedRows.includes(listingId)
      ? expandedRows.filter((id) => id !== listingId)
      : [...expandedRows, listingId];
    setExpandedRows(newExpandedRows);
  };
  const handleDelete = async (listing) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this listing?"
      );
      if (!confirmed) {
        return;
      }

      const response = await axios.delete(`/listing/admin/delete/${listing}`);

      fetchListings();

      if (response.status === 200) {
        setListings((prevListings) =>
          prevListings.filter((item) => item._id !== listing._id)
        );
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return (
    <AdminLayout>
      <Typography component="div">
        <Box component="span" fontWeight="bold" marginRight={2}>
          Show Expired Listings:
        </Box>
        <Switch
          checked={showExpired}
          onChange={() => setShowExpired(!showExpired)}
        />

        <Box component="span" fontWeight="bold" marginRight={2}>
          Show Active Listings:
        </Box>
        <Switch
          checked={showActive}
          onChange={() => setShowActive(!showActive)}
        />
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: 16 }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Expiry Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listings.map((listing) => (
              <React.Fragment key={listing._id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => toggleRow(listing._id)}
                    >
                      {expandedRows.includes(listing._id) ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {listing.title}
                  </TableCell>
                  <TableCell>{listing.user.email}</TableCell>
                  <TableCell>{listing.expiryDate}</TableCell>

                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(listing._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={expandedRows.includes(listing._id)}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                            >
                              Listing Details
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Address:{" "}
                              {listing.locationState
                                ? listing.locationState.address || "N/A"
                                : "N/A"}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Address:{" "}
                              {listing.locationState
                                ? listing.locationState.address || "N/A"
                                : "N/A"}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Location:{" "}
                              {listing.locationState
                                ? listing.locationState.city || "N/A"
                                : "N/A"}
                              ,{" "}
                              {listing.locationState
                                ? listing.locationState.state || "N/A"
                                : "N/A"}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              User Name : {listing.user.name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              User Email: {listing.user.email}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Is Trial Over:{" "}
                              {listing.user.istrialOver ? "True" : "False"}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" gutterBottom>
                              Title: {listing.title}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Category: {listing.category}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Pricing Per: {listing.priceUnit}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Price: {listing.price || "N/A"}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Phone: {listing.phone || "N/A"}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Whatsapp: {listing.whatsappNumber || "N/A"}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              ZipCode: {listing.zipCode || "N/A"}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Description: {listing.description || "N/A"}
                            </Typography>

                            <Typography variant="body2" gutterBottom>
                              Category: {listing.category || "N/A"}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Youtube Video LInk:{" "}
                              {listing.youtubeVideoLink || "N/A"}
                            </Typography>

                            <Link to={`/ads/${listing._id}`}>
                              <Button>Listing Url</Button>
                            </Link>

                            {/* ... Add other fields here */}
                          </Grid>
                        </Grid>
                        {listing.images && listing.images.length > 0 ? (
                          <Carousel showThumbs={false}>
                            {listing.images.map((image, index) => (
                              <div key={index}>
                                <img
                                  src={image}
                                  alt={`Image ${index}`}
                                  style={{
                                    maxHeight: "300px",
                                    width: "auto",
                                    margin: "0 auto",
                                  }}
                                />
                              </div>
                            ))}
                          </Carousel>
                        ) : (
                          <Typography variant="body2" gutterBottom>
                            No images available
                          </Typography>
                        )}
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
        rowsPerPageOptions={[5, 10, 20, 30]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(page);
        }}
      />
    </AdminLayout>
  );
};

export default ListingsTable;
