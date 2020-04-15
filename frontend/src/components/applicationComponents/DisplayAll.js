import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import appContext from "../../context/context";

const DOOR_QUERY = gql`
  query DOOR_QUERY {
    doors(first: 12) {
      Id
      StyleNumber
      ImageUrl
    }
  }
`;

const DisplayAll = ({ nextStep, prevStep }, props) => {
  const { store, dispatch } = useContext(appContext);

  const { data, loading, error } = useQuery(DOOR_QUERY);
  if (!loading) {
    console.log(data.doors.length);
  }

  return (
    <Container>
      {!loading &&
        data.doors.map((door, index) => (
          <div key={index}>
            <img src={`${store.imgSrc}${door.ImageUrl.split(".com").pop()}`} />
            <h4>{door.StyleNumber}</h4>
          </div>
        ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
`;

export default DisplayAll;
