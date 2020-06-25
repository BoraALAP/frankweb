import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Box from "./Box";
import ImageContainer from "./ImageContainer";

const RelatedGlassItem = ({ item, Type = "glass" }) => {
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

export default RelatedGlassItem;
