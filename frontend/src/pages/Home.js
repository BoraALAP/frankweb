import React from 'react';
import styled from 'styled-components';
 
import Meta from '../components/global/Meta';
 
const Home = (props) => {
  return (
    <Container>
      <Meta title='Home' />
      <p> Home </p>
    </Container>
  );
};
 
const Container = styled.div`
`;
 
export default Home