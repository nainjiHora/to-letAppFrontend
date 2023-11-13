import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TranslateIcon from "@mui/icons-material/Translate";
const Filters = ({ sortOption, handleSortChange }) => {
  const handleDropdownSelect = (eventKey) => {
    handleSortChange(eventKey);
  };

  const renderFilterIcon = () => {
    if (sortOption === "priceAsc") {
      return <ArrowDropDownIcon />;
    } else if (sortOption === "priceDesc") {
      return <ArrowDropUpIcon />;
    } else if (sortOption === "nameAsc") {
      return <TranslateIcon />;
    } else if (sortOption === "nameDesc") {
      return <ArrowDropUpIcon />;
    }
    return <FilterListIcon />;
  };
  return (
    <>
      <div className="filter-btn d-flex justify-content-end " style={{marginRight:"4rem"}}>
        <Dropdown onSelect={handleDropdownSelect}>
          <Dropdown.Toggle variant="default" id="filter-dropdown">
            {renderFilterIcon()} <span className="fw-bold" style={{fontSize:"1rem"}}>Filters</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="none">None</Dropdown.Item>
            <Dropdown.Item eventKey="priceAsc">
              Price (Low to High)
            </Dropdown.Item>
            <Dropdown.Item eventKey="priceDesc">
              Price (High to Low)
            </Dropdown.Item>
            <Dropdown.Item eventKey="nameAsc">Name (A to Z)</Dropdown.Item>
            <Dropdown.Item eventKey="nameDesc">Name (Z to A)</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="">Reset</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default Filters;
