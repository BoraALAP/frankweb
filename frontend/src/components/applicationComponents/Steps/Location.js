import React, { useContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { LazyLoadImage } from "react-lazy-load-image-component";

import styled from "styled-components";
import Selector from "../UI/Selector";
import Spinner from "../../applicationComponents/UI/Spinner";
import appContext from "../../../context/context";

const LOCATION_QUERY = gql`
  query LOCATION_QUERY {
    locationOnHousesConnection {
      edges {
        node {
          __typename
          Id
          Name
        }
      }
    }
  }
`;

const Location = ({ nextStep, prevStep }, props) => {
  const { dispatch } = useContext(appContext);
  const [options, setOptions] = useState([]);
  const { data, loading } = useQuery(LOCATION_QUERY);

  useEffect(() => {
    if (!loading && data.locationOnHousesConnection !== undefined) {
      setOptions(data.locationOnHousesConnection.edges);
    }
  }, [loading]);

  if (options === undefined) {
    return <Spinner />;
  }

  const handleClick = (text) => {
    dispatch({
      type: "UPDATE_STEP",
      step: "location",
      payload: text,
    });
    nextStep();
  };

  return (
    <Container>
      <h3>Where are you going to use this door?</h3>
      <SelectorContainer>
        <Selector skip onClick={() => nextStep()}>
          Skip
        </Selector>
        {options.map((selector, index) => (
          <Selector
            key={index}
            onClick={() => handleClick(`${selector.node.Id}`)}
          >
            {selector.node.Name}
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
