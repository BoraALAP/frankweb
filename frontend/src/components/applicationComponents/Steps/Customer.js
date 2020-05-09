import React, { useContext } from "react";

import styled from "styled-components";
import Selector from "../UI/Selector";
import appContext from "../../../context/context";

const Customer = ({ nextStep, prevStep }, props) => {
  const { dispatch } = useContext(appContext);

  const options = [
    { name: "Homeowner" },
    { name: "Contractor" },
    { name: "Dealer" },
  ];

  const handleClick = (text) => {
    dispatch({
      type: "UPDATE_STEP",
      step: "person",
      payload: text,
    });
    nextStep();
  };

  return (
    <Container>
      <h3>Who are you?</h3>
      <SelectorContainer>
        {options.map((selector, index) => (
          <Selector key={index} onClick={() => handleClick(`${selector.name}`)}>
            {selector.name}
          </Selector>
        ))}
      </SelectorContainer>
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

export default Customer;
