import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Selector from "..//UI/Selector";
import appContext from "../../../context/context";

const DOOR_QUERY = gql`
  query DOOR_QUERY {
    doors(first: $first) {
      Id
      StyleNumber
      ImageUrl
      DoorCollection {
        Name
      }
    }
  }
`;

const Success = ({ nextStep, prevStep, beginning }, props) => {
  const { dispatch } = useContext(appContext);

  const { data, loading } = useQuery(DOOR_QUERY, { first: 12 });

  console.log(data);

  return (
    <Container>
      <h2>Success</h2>
      <Selector onClick={beginning}>Start Over</Selector>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 32px;
  grid-template-columns: repeat(3, 1fr);
`;

export default Success;
