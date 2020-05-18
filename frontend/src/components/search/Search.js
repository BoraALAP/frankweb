import React, { useState, useContext } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import appContext from "../../context/context";
import Button from "../UI/Button";

const Search = (props) => {
  let history = useHistory();
  const [search, setSearch] = useState("");
  const { dispatch } = useContext(appContext);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchForm = (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_SEARCH", payload: search });
    history.push("/search");
  };

  return (
    <Container onSubmit={handleSearchForm}>
      <label>search:</label>
      <input type="text" onChange={handleSearchChange} value={search} />

      <Button type="submit">Search</Button>
    </Container>
  );
};

const Container = styled.form`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  grid-gap: 16px;
`;

export default Search;
