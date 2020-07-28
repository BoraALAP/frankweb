import React from 'react';
import styled from 'styled-components';

import Home1 from "../../assets/images/homepage1.jpg";
import Home2 from "../../assets/images/homepage2.jpg";
import Home3 from "../../assets/images/homepage3.jpg";
 
const TextWelcome = (props) => {
  return (
    <Container>
      <H1>
        <InRow>
          Family owned and <HomeImage src={Home1} />
        </InRow>
        <InRow>operated since 1981.</InRow>
        <InRow>We respect tradition, but</InRow>
        <InRow>challenge convention.</InRow>
        <InRow>Built on quality products</InRow>
        <InRow>
          <HomeImage src={Home2} /> and exceptional
        </InRow>
        <InRow>
          service, we make <HomeImage src={Home3} />
        </InRow>
        <InRow>windows and doors.</InRow>
      </H1>
    </Container>
  );
};
 
const Container = styled.div`
`;

const H1 = styled.h1`
  display: grid;
  font-size: 8vw;
  line-height: 15vw;
  margin: 0;
  white-space: nowrap;
  @media (min-width: 480px) {
    font-size: 4vw;
  line-height: 85px;
  }
`;

const InRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
  grid-gap: 16px;
`;

const HomeImage = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;
  height: 80px;
  width: 20vw;
  margin: 0;
`;
 
export default TextWelcome