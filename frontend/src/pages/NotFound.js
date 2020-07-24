import React from 'react';
import styled from 'styled-components';
 
import Meta from '../components/global/Meta';
 
const NotFound = (props) => {
  return (
    <Container>
      <Meta title='NotFound' />
      <p> NotFound </p>
    </Container>
  );
};
 
const Container = styled.div`
`;
 
export default NotFound