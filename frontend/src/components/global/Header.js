import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/branding/frank_logo.svg";

// import { appContext } from "../../context/context";
import Search from "../search/Search";

const Header = (props) => {
  // const { store, dispatch } = useContext(appContext);

  return (
    <Container>
      <Link to="/">
        <LogoS />
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

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-between;
`;

const Nav = styled.nav``;

const LogoS = styled(Logo)`
  display: grid;
  height: 80px;
  width: auto;
`;

export default Header;
