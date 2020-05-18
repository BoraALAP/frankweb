import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ImageContainer from "./ImageContainer";

import appContext from "../../../context/context";
import Box from "./Box";

const RelatedItem = ({ Id, ImageUrl, StyleNumber, Name, Type }) => {
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
          <ImageContainer alt={Name} src={ImageUrl} big />

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