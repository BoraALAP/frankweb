import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import appContext from "../../../context/context";
import Box from "./Box";

const ProductItem = ({ Id, ImageUrl, StyleNumber, Name, Type }) => {
  const { store } = useContext(appContext);

  return (
    <Box>
      <Container>
        <LinkS
          to={{
            state: { type: Type },
            pathname: `/product/${Type.toLowerCase()}/${Id}`,
          }}
        >
          <LazyLoadImage
            alt={Name}
            src={`${store.imgSrc}${ImageUrl.split(".com").pop()}`}
          />

          {StyleNumber && <h5>{StyleNumber}</h5>}
          {Name && <h5>{Name}</h5>}
          <small>{Type}</small>
        </LinkS>
      </Container>
    </Box>
  );
};

const Container = styled.div``;
const LinkS = styled(Link)`
  display: grid;
  grid-gap: 2px;

  h5 {
    margin: 8px 0px 0px;
  }
`;

export default ProductItem;
