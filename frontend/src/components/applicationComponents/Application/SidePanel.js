import React, { useContext } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

import { appContext } from "../../../context/context";
import Spinner from "../../UI/Spinner";

const PRODUCT_QUERY = gql`
  query door(
    $location: ID
    $size: ID
    $sizeCategory: ID
    $texture: String
    $glassFamily: ID
  ) {
    fullCount: doorsConnection(
      where: {
        OR: {
          LocationOnHouse_some: { Id_contains: $location }
          DoorCollection: { Surface_contains: $texture }
          AvailableSizes_some: { Id_contains: $size }
          GlassSizeCategory: { Id_contains: $sizeCategory }
          ParentGlassFamilyAbbreviation: { Id_contains: $glassFamily }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const SidePanel = (props) => {
  const { store, dispatch } = useContext(appContext);
  const { data, loading } = useQuery(PRODUCT_QUERY, {
    variables: {
      location: store.steps.location.id,
      texture:
        store.steps.texture.value === "skipped"
          ? ""
          : store.steps.texture.value,
      size: store.steps.size.id,
      sizeCategory: store.steps.glassSize.id,
      glassFamily: store.steps.glassFamily.id,
    },
    notifyOnNetworkStatusChange: true,
  });

  const fields = (field, text, step) => {
    if (store.steps[field].value) {
      return (
        <h6>
          {text}: <span>{store.steps[field].value}</span>
          <button onClick={() => dispatch({ type: "SET_STEP", step })}>
            edit
          </button>
        </h6>
      );
    } else {
      return (
        <h6>
          {text}: <span>{store.steps[field].value}</span>
        </h6>
      );
    }
  };

  return (
    <Container>
      <Top>
        {data ? (
          <h6>
            Possible Outcome: <span>{data.fullCount.aggregate.count}</span>
          </h6>
        ) : (
          <h6>
            Possible Outcome: <span>loading</span>
          </h6>
        )}
      </Top>

      <Bottom>
        {fields("location", "Location", 2)}
        {fields("texture", "Texture", 3)}
        {fields("size", "Size", 4)}
        {fields("glassSize", "Window Size", 5)}
        {fields("glassFamily", "Glass Family", 6)}
      </Bottom>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  align-self: center;
  position: fixed;
  top: 25%;
  right: 0;
  width: 20%;
  box-sizing: border-box;
  padding: 2em;
  background-color: ${({ theme }) => theme.color.lightGrey};
`;

const Top = styled.div``;

const Bottom = styled.div``;

export default SidePanel;
