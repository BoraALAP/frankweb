import React, { useContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Selector from "../UI/Selector";
import appContext from "../../../context/context";

const DOOR_QUERY = gql`
  query DOOR_QUERY {
    doors(first: 12) {
      Id
    }
  }
`;

const Customer = ({ nextStep, prevStep }, props) => {
  const { dispatch } = useContext(appContext);

  const { data, loading, error } = useQuery(DOOR_QUERY);

  if (!loading) {
    console.log(data);
  }

  const options = [
    { name: "Homeowner" },
    { name: "Contractor" },
    { name: "Dealer" }
  ];

  const handleClick = text => {
    dispatch({
      type: "UPDATE_STEP",
      step: "person",
      payload: text
    });
    nextStep();
  };

  return (
    <Container>
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
`;

const SelectorContainer = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(3, 1fr);
`;

export default Customer;
