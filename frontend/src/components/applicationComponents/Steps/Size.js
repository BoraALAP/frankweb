import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Selector from "../UI/Selector";
import Spinner from "../UI/Spinner";
import appContext from "../../../context/context";

const DOOR_COLLECTIONS_QUERY = gql`
  {
    doorCollections {
      Id
      Name
    }
  }
`;

const Size = ({ nextStep, prevStep }, props) => {
  const { measurement, setMeasurement } = useState({
    width: { value: "", added: false },
    height: { value: "", added: false }
  });
  const { dispatch } = useContext(appContext);

  const { loading } = useQuery(DOOR_COLLECTIONS_QUERY);

  const handleClick = text => {
    dispatch({
      type: "UPDATE_STEP",
      step: "size",
      payload: text
    });
    nextStep();
  };

  const options = {
    width: [{ name: '2.10"' }, { name: '3.0"' }, { name: '3.6"' }],
    height: [{ name: '6.8"' }, { name: "7'" }, , { name: "8'" }]
  };

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h3>What are the measurement?</h3>
          <SelectorContainer>
            <Selector skip onClick={() => nextStep()}>
              Skip
            </Selector>
            {options.width.map((selector, index) => (
              <Selector
                key={index}
                onClick={() => handleClick(`${selector.name}`)}
              >
                {selector.name}
              </Selector>
            ))}
          </SelectorContainer>
          <Selector back onClick={() => prevStep()}>
            Back
          </Selector>
        </>
      )}
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

export default Size;
