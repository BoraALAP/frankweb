import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/branding/frank_logo.svg";

import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";

import SignOut from "../../pages/user/SignOut";
import Search from "../search/Search";
import { useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../../queries/User";
import Menu from "./Menu";

const Header = (props) => {
  const { data } = useQuery(CURRENT_USER_QUERY);

  const [sticky, setSticky] = useState({ show: true, scrollPos: 0 });

  const handleScroll = async() => {
    let prev =  sticky.scrollPos
    setSticky({
      show: document.body.getBoundingClientRect().top >= prev,
      scrollPos: document.body.getBoundingClientRect().top,
    });

    console.log(prev);
    
  };

  console.log(sticky, document.body.getBoundingClientRect().top);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  return (
    <Container show={sticky.show}>
      <Left>
        <Link to="/">
          <LogoS />
        </Link>
        <H4>
          We make
          <br />
          Windows and Doors
        </H4>
      </Left>
      {/* <Nav>
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
      </Nav> */}
      <Right>
        <MenuIcon />
        <SearchIcon />
      </Right>
      {/* <Search /> */}
      {/* <Menu /> */}
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
  padding: 2.5vh ${({ theme }) => theme.pagePaddingW};
  position: fixed;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.bg};

  top: ${(props) => (props.show ? "0" : "-30vh")};
  transition: top 1s ease;
`;

const Left = styled.div`
  grid-auto-flow: column;
  display: grid;
  grid-gap: 5rem;
  align-items: center;
`;

const Right = styled.div`
  width: 25vw;
  display: grid;
  justify-content: space-between;
  grid-auto-flow: column;
`;

const H4 = styled.h4`
  display: none;
  color: ${({ theme }) => theme.color.lightGrey};
  margin: 0;
  font-size: 1.0625rem;
  @media (min-width: 480px) {
    display: grid;
  }
`;

const Nav = styled.nav``;

const LogoS = styled(Logo)`
  display: grid;
  height: 80px;
  width: auto;
`;

export default Header;
