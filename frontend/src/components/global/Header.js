import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../../queries/User";

import disableScroll from "disable-scroll";

import { ReactComponent as Logo } from "../../assets/branding/frank_logo.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";

import SignOut from "../../pages/user/SignOut";
import Search from "../search/Search";

import MenuComp from "./Menu";

const Header = (props) => {
  const { data } = useQuery(CURRENT_USER_QUERY);
  const [menuState, setMenuState] = useState(false);

  const [sticky, setSticky] = useState(true);

  props.history.listen(location => {
    setMenuState(false)
  })

  useEffect(() => {
    if (menuState) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [menuState]);

  let prev = window.pageYOffset;
  const handleScroll = () => {
    let current = window.pageYOffset;
    if (prev > current) {
      setSticky(true);
    } else {
      setSticky(false);
    }
    prev = current;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  const handleMenu = () => {
    setMenuState(!menuState);
  };

  return (
    <Container show={sticky}>
      <HeaderS>
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
          <MenuIconS menuprop={menuState} onClick={handleMenu} />
          {/* <SearchIcon /> */}
        </Right>
      </HeaderS>
      {/* <Search /> */}
      <MenuStyle open={menuState} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  align-items: center;
  position: fixed;
  z-index: 1000;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.bg};
  transition: top 1s ease;
  top: ${(props) => (props.show ? "0" : "-30vh")};
`;

const MenuStyle = styled(MenuComp)`
  z-index: 800;
`;

const HeaderS = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  padding: 2.5vh ${({ theme }) => theme.pagePaddingW};
`;

const Left = styled.div`
  grid-auto-flow: column;
  display: grid;
  grid-gap: 3vw;
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

const MenuIconS = styled(MenuIcon)`
  transform: ${(props) => props.menuprop ? "rotate(-45deg)" : "rotate(0)"};
  transition: transform 0.75s ease;
`;

const LogoS = styled(Logo)`
  display: grid;
  height: 80px;
  width: auto;
`;

export default Header;
