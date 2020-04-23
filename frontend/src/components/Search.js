import React, { useState, useContext } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import appContext from "../context/context";

const Search = (props) => {
  const [search, setSearch] = useState("");
  const { store, dispatch } = useContext(appContext);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchForm = (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_SEARCH", payload: search });
  };

  return (
    <Container onSubmit={handleSearchForm}>
      <label>search:</label>
      <input type="text" onChange={handleSearchChange} value={search} />

      <button type="submit">Search</button>
    </Container>
  );
};

const Container = styled.form``;

export default Search;
