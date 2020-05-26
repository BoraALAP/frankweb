import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// import { appContext } from "../../context/context";
import Search from "../search/Search";

const Header = (props) => {
  // const { store, dispatch } = useContext(appContext);

  return (
    <Container>
      <Link to="/">
        <p>Header</p>
      </Link>
      <Nav>
        <Link to="/application">
          <p>App</p>
        </Link>
      </Nav>

      <Search />
    </Container>
  );
};

const Container = styled.div``;
const Nav = styled.nav``;

export default Header;
