import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
 
const Menu = (props) => {
  return(
    <Container>
      <Top>
        <Link to="/">Imagine</Link>
        <Link to="/">Make</Link>
        <Link to="/">Learn</Link>
        <Link to="/dealerFinder">Find a Dealer</Link>
      </Top>
      <Mid>
        <Link to="/">Windows</Link>
        <Link to="/">Doors</Link>
        <Link to="/">Patio Doors</Link>
      </Mid>
      <Bottom>
        <Link to="/">Placeholder 1</Link>
        <Link to="/">Placeholder 2</Link>
        <Link to="/">Placeholder 3</Link>
        <Link to="/">Placeholder 4</Link>
        <Link to="/">Placeholder 5</Link>
      </Bottom>
      <Footer>
      <Link to="/">Footer Placeholder 1</Link>
      <Link to="/">Footer Placeholder 2</Link>
      </Footer>

 
    </Container>
  );
};
 
const Container = styled.div`
display: grid;
  grid-gap: 3.5rem;
`;

const Top = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-auto-flow: column;
`;

const Mid = styled.div`
display: grid;
  grid-gap: 1rem;
`;

const Bottom = styled.div`
display: grid;
  grid-gap: 1rem;
`;

const Footer = styled.div`
display: grid;
grid-auto-flow: column;
  justify-content:space-between;
`;
 
export default Menu