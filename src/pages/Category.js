import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid, TextField } from "@mui/material";

import Filters from "../components/filters";

import Pagination from "@mui/material/Pagination";
import ListingCard from "../components/card/ListingCard";

const Category = () => {
  const { category } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSortChange = (event) => {
    setSortOption(event);
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          `/listing/category/${category}?page=${page}&limit=${rowsPerPage}&search=${searchTerm}&sort=${sortOption}`
        );
        setListings(response.data.activeListings);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };

    fetchListings();
  }, [category, page, rowsPerPage, searchTerm, sortOption]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="loccat">Category {category} </h1>
      <TextField
        label="Search by Title , Address , Location"
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
        style={{ marginTop: 20, alignSelf: "center", marginBottom:20}}
      />
    </>
  );
};

export default Category;
