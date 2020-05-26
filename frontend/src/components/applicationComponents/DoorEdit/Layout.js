import React, { useContext } from "react";
import styled from "styled-components";

import { editContext } from "../../../context/context";

const Layout = ({ title, gridSize = 3, children, component }, props) => {
  const { editStore, editDispatch } = useContext(editContext);

  return (
    <Container>
      <h2>{title}</h2>

      <SelectorContainer size={gridSize}>{children}</SelectorContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-gap: 24px;
  justify-items: center;
  text-align: center;
`;

const SelectorContainer = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
`;

export default Layout;
