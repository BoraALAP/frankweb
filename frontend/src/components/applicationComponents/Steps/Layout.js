import React, { useContext } from "react";
import styled from "styled-components";

import Selector from "../UI/Selector";
import appContext from "../../../context/context";

const Layout = ({ title, gridSize = 3, children, component }, props) => {
  const { store, dispatch } = useContext(appContext);

  const nextStep = (props) => {
    dispatch({
      type: "NEXT_STEP",
      step: component,
    });
  };

  const prevStep = (props) => {
    dispatch({
      type: "PREV_STEP",
    });
  };

  const resetStep = (props) => {
    dispatch({
      type: "RESET_STEP",
    });
  };

  return (
    <Container>
      <h2>{title}</h2>
      <Selector skip onClick={nextStep}>
        Skip
      </Selector>
      <SelectorContainer size={gridSize}>{children}</SelectorContainer>
      <Selector back onClick={prevStep}>
        Back
      </Selector>
      <Selector onClick={resetStep}>Start Over</Selector>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-gap: 24px;
  justify-items: center;
`;

const SelectorContainer = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
`;

export default Layout;
