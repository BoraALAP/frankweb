import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/branding/frank_logo.svg";

import SignOut from "../../pages/user/SignOut";
import Search from "../search/Search";
import { useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../../queries/User";

const Header = (props) => {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return (
    <Container>
      <Link to="/">
        <LogoS />
      </Link>
      <Nav>
        {data?.me ? (
          <>
            <Link to="/user/account">
              <p>{data?.me?.name ? data.me.name : "Account"}</p>
            </Link>
            <SignOut />
          </>
        ) : (
          <Link to="/user/signIn">
            <p>Sign In</p>
          </Link>
        )}
        <Link to="/application">
          <p>App</p>
        </Link>
      </Nav>
      <Search />
    </Container>
  );
};

export const SimpleHeader = () => {
  return (
    <Container>
      <Link to="/">
        <LogoS />
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-between;
  padding: 2.5vh 5vw;
`;

const Nav = styled.nav``;

const LogoS = styled(Logo)`
  display: grid;
  height: 80px;
  width: auto;
`;

export default Header;
