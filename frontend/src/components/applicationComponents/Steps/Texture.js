import React, { useContext } from "react";

import styled from "styled-components";
import Selector from "../UI/Selector";
import appContext from "../../../context/context";

const Texture = ({ nextStep, prevStep }, props) => {
  const { dispatch } = useContext(appContext);

  const handleClick = (text) => {
    dispatch({
      type: "UPDATE_STEP",
      step: "texture",
      payload: text,
    });
    nextStep();
  };

  const options = [
    { name: "Wood Grain", value: "Woodgrain" },
    { name: "Smooth", value: "Smooth" },
  ];

  return (
    <Container>
      <h3>What kind of texture?</h3>
      <SelectorContainer>
        <Selector skip onClick={() => nextStep()}>
          Skip
        </Selector>
        {options.map((selector, index) => (
          <Selector
            key={index}
            onClick={() => handleClick(`${selector.value}`)}
          >
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

export default Texture;
