import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ImageContainer from "./ImageContainer";

import Box from "./Box";

const RelatedItem = ({
  Id,
  ImageUrl,
  BigImageUrl,
  StyleNumber,
  Name,
  Type = "Door",
  Link = "product",
}) => {
  return (
    <Box>
      <Container>
        <LinkS
          to={{
            state: { type: Type },
            pathname: `/${Link}/${Type.toLowerCase()}/${Id}`,
          }}
        >
          <ImageContainer
            alt={Name}
            src={BigImageUrl ? BigImageUrl : ImageUrl}
            big
          />

          {StyleNumber && <h5>{StyleNumber}</h5>}
          {Name && <h5>{Name}</h5>}
          <small>{Type}</small>
        </LinkS>
      </Container>
    </Box>
  );
};

const Container = styled.div`
  display: grid;
`;
const LinkS = styled(Link)`
  display: grid;
  grid-gap: 2px;

  h5 {
    margin: 8px 0px 0px;
  }
`;

export default RelatedItem;
