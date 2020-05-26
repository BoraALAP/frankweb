import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { appContext } from "../../../context/context";
import Box from "./Box";
import ImageContainer from "./ImageContainer";

const RelatedGlassItem = ({ item, Type = "glass" }) => {
  const { store } = useContext(appContext);
  return (
    <Box>
      <Container>
        <Link to={`/product/${Type}/${item.Id}`}>
          <ImageContainer
            alt={item.Name}
            src={item.BigImageUrl ? item.BigImageUrl : item.ImageUrl}
            med={item.BigImageUrl}
          />

          <h4>{item.Name}</h4>
        </Link>
      </Container>
    </Box>
  );
};

const Container = styled.div``;

const Horizontal = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(3, auto);
  padding-inline-start: 1em;
  justify-content: start;
  grid-gap: 24px;
  li {
    list-style: none;
  }
`;

const SubLevel = styled.div`
  margin-top: 2.5em;
  h5 {
    margin-bottom: 16px;
  }
`;

export default RelatedGlassItem;
