import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Primary } from '../../components/UI/Button';
 
const Make = (props) => {
  const BuilderCard = ({title, desc, button = "Open Builder", to, img}) => (
    <Card>
      <Img src={img}/>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      <Primary link to={to}>{button}</Primary>
    </Card>
  )

  return (
    <Container>
      <BuilderCard img="" title="Entry Door" desc="" to="/builder/doorapplication"/>
      <BuilderCard img="" title="Window" desc="" to="/builder/windowapplication"/>
      <BuilderCard img="" title="Patio Door" desc="" to="/builder/patioapplication"/>
    </Container>
  );
};
 
const Container = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
`;

const Card = styled.div`

`;

const Img = styled.img`

`

const Title = styled.h1`

`

const Desc = styled.p`

`


 
export default Make