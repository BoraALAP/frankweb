import React from 'react';
import styled from 'styled-components';
 
import Meta from "../../components/global/Meta";
 
const Frank = (props) => {
  return (
    <Container>
      <Meta title='Frank' />
      <p> Frank </p>
    </Container>
  );
};
 
const Container = styled.div`
`;
 
export default Frank