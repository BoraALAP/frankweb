import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <Container>
      <Left>
        <Link to="/">About us </Link>
        <Link to="/">Contact Us </Link>
        <Link to="/">Paradigm</Link>
        <Link to="/">Find a dealer</Link>
        <Link to="/">Your Projects </Link>
        <Link to="/">Privacy Policy</Link>
      </Left>
      <Right><p>
        <a href="tel:+19056605021">+1-905-660-5021</a> |{" "}
        <a href="mailto:admin@frankwd.com">admin@frankwd.com</a> | <br />
        <a
          href="https://www.google.com/maps/place/248+Bowes+Rd,+Concord,+ON+L4K+1J9/data=!4m2!3m1!1s0x882b2ef33a5c88f9:0x10157b4990c72448?sa=X&ved=2ahUKEwjinY7Ws9LqAhXEl3IEHduZA4sQ8gEwAHoECAsQAQ"
          target="_blank"
        >
          248 Bowes Rd, Concord ON, Canada, L4K 1J9
        </a>
        <br />
        Copyright © 2020 FrankWD. All rights reserved.</p>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  grid-auto-flow: row;
  display: grid;
  padding: ${({ theme }) => theme.pagePaddingW};
  grid-gap: 2rem;
  justify-content: space-between;

  @media (min-width: 480px) {
    grid-auto-flow: column;
  }
`;

const Left = styled.div`
  display: grid;
  grid-gap: 24px;
  
  align-content: start;
  grid-auto-flow: row;

  @media (min-width: 480px) {
    
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Right = styled.div`
p{
  margin:0;
  line-height: 2.5em;
}`;

export default Footer;
