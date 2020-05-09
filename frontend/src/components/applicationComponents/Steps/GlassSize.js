import React, { useContext } from "react";

import styled from "styled-components";
import Selector from "../UI/Selector";

import appContext from "../../../context/context";

const GlassSize = ({ nextStep, prevStep }, props) => {
  const { dispatch } = useContext(appContext);

  const handleClick = (text) => {
    dispatch({
      type: "UPDATE_STEP",
      step: "glassSize",
      payload: text,
    });
    nextStep();
  };

  const options = [
    { name: "Opaque" },
    { name: "1/4 Lite" },
    { name: "1/2 Lite" },
    { name: "3/4 Lite" },
    { name: "Full Lite" },
  ];

  return (
    <Container>
      <h3>How much glass would you like to have on the door?</h3>
      <SelectorContainer>
        <Selector skip onClick={() => nextStep()}>
          Skip
        </Selector>
        {options.map((selector, index) => (
          <Selector key={index} onClick={() => handleClick(`${selector.name}`)}>
            {selector.name}
          </Selector>
        ))}
      </SelectorContainer>
      <Selector back onClick={() => prevStep()}>
        Back
      </Selector>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-gap: 80px;
`;

const SelectorContainer = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(3, 1fr);
`;

export default GlassSize;
