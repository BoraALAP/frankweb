import React, { useContext } from "react";

import styled from "styled-components";
import Selector from "../UI/Selector";
import appContext from "../../../context/context";

const Location = ({ nextStep, prevStep }, props) => {
  const { dispatch } = useContext(appContext);

  const handleClick = (text) => {
    dispatch({
      type: "UPDATE_STEP",
      step: "location",
      payload: text,
    });
    nextStep();
  };

  const options = [
    { name: { Name: "Entry" } },
    { name: "Patio" },
    { name: "House of Garage" },
    { name: "Side of House" },
    { name: "Back of House" },
    { name: "Side of Garage" },
  ];

  return (
    <Container>
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

export default Location;
