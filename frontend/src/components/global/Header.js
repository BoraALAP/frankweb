import React, { useState, useContext } from "react";
import styled from "styled-components";

import appContext from "../../context/context";
import Search from "../Search";

const Header = (props) => {
  const { store, dispatch } = useContext(appContext);

  return (
    <Container>
      <p>Header</p>

      <Search />
    </Container>
  );
};

const Container = styled.div``;

export default Header;
