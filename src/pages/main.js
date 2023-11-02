import React, { useContext, useEffect, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { Container } from "react-bootstrap";
import ListingCard from "../components/card/ListingCard";

import { AuthContext } from "../context/auth";
import axios from "axios";

import Filters from "../components/filters";

import Properties from "../components/ui/properties";
import Location from "../components/ui/Location";
import Pagination from "@mui/material/Pagination";
import EnquiryForm from "../components/form/EnquiryForm";

const Main = () => {
  const [auth] = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [sortOption, setSortOption] = useState("none");
  const isDesktop = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    fetchListings();
  }, [auth.user, page, pageSize, sortOption, filterLocation, filterCategory]);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const fetchListings = async () => {
    try {
      const queryParams = `?page=${page}&limit=${pageSize}&search=${searchQuery}&sort=${sortOption}&category=${filterCategory}&location=${filterLocation}`;
      const response = await axios.get(`/listing/get/all${queryParams}`);
      const { listings, totalPages } = response.data;
      setListings(listings);
      setTotalPages(totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleFilterLocationChange = (event) => {
    setFilterLocation(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event);
  };

  const handleSearch = () => {
    setPage(1);
    fetchListings();
  };
  const handleFilterReset = () => {
    setFilterCategory("");
    setFilterLocation("");
    setSearchQuery("");

    fetchListings();
  };

  return (
    <div>
      <div class="container">
        <div class="searchwrapper">
          <div class="searchbox">
            <div class="row">
              <div class="col-md-5">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search by Title , Location , Category,..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div class="col-md-3">
                <select
                  class="form-control category"
                  id="filterCategory"
                  value={filterCategory}
                  onChange={handleFilterCategoryChange}
                >
                  <option value="">Category</option>

                  <option value="flat">Flat</option>
                  <option value="house">House</option>
                  <option value="pg">PG</option>
                  <option value="room">Room</option>
                  <option value="shop">Shop</option>
                  <option value="others">Others</option>
                  <option value="">Reset</option>
                </select>
              </div>
              <div class="col-md-3">
                <select
                  class="form-control category"
                  id="filterLocation"
                  value={filterLocation}
                  onChange={handleFilterLocationChange}
                >
                  <option value="">Location</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="jaipur">Jaipur</option>
                  <option value="">Reset</option>
                </select>
              </div>
              <div class="col-md-1">
                <input
                  type="button"
                  onClick={handleSearch}
                  class="btn btn-primary"
                  className="form-control"
                  value="Search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Properties />

      <Container maxWidth="md"></Container>

      <Filters sortOption={sortOption} handleSortChange={handleSortChange} />
      <Grid container>
        {listings.map((listing, idx) => (
          <Grid item xs={12} md={3} key={listing._id}>
            <ListingCard listing={listing} />
          </Grid>
        ))}
      </Grid>

    <div className="d-flex justify-content-center m-4">
    <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        // color="primary"
        size={"large"}
        style={{ marginTop: 16, alignSelf: "flex-end" ,fontSize:"20px"}}
      />
    </div>
      <Grid container justifyContent="center">
        <Grid item>
          <Location />
        </Grid>
      </Grid>
      <EnquiryForm />
    </div>
  );
};

export default Main;
