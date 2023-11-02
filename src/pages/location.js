import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import Filters from "../components/filters";
import Pagination from "@mui/material/Pagination";
import ListingCard from "../components/card/ListingCard";

const Location = () => {
  const { state } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(12); // Rows per page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [sortOption, setSortOption] = useState("none");

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleSortChange = (event) => {
    setSortOption(event);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          `/listing/location/${state}?page=${page}&limit=${rowsPerPage}&search=${searchTerm}&sort=${sortOption}`
        );
        setListings(response.data.activeListings);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };

    fetchListings();
  }, [state, page, rowsPerPage, sortOption, searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(listings);

  return (
    <>
      <h1 className="loccat">Location {state} </h1>
      <TextField
        label="Search by Title , Address , Category"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: 16 }}
      />
      <Filters sortOption={sortOption} handleSortChange={handleSortChange} />
      <Grid container>
        {listings.map((listing, idx) => (
          <Grid item xs={12} md={3} key={listing._id}>
            <ListingCard listing={listing} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: 16, alignSelf: "center" }}
      />
    </>
  );
};

export default Location;
