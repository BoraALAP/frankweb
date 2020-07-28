import React from "react";
import styled from "styled-components";


import { Link } from "react-router-dom";
import TextWelcome from "../components/home/TextWelcome";

const Home = (props) => {
  return (
    <Container>
      <Left>
      <TextWelcome />
      </Left>

      <Right>
        <Link to="/contactUs">Contact Us</Link>
        <Link to="/dealerLogin">Dealer Login</Link>
        <p>Our story starts 35 years ago, with a commitment to quality that has remained family owned and operated. Learn more about us <Link to="/sub/frank">here.</Link> </p>

      </Right>
    </Container>
  );
};

const Container = styled.div`
display: grid;



@media (min-width: 480px) {
  grid-template-columns: auto 25vw;
  grid-gap: 1.5rem
  }
`;

const Left = styled.div``;

const Right = styled.div`
display: none;
grid-auto-flow: row;
align-items: end;
align-content: end;
grid-gap: 1.5rem;
  @media (min-width: 480px) {
    display: grid;
  }
`;

export default Home;
