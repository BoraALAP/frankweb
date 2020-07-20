import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Layout from "./Layout";

import { editContext } from "../../../context/context";
import Selector from "../UI/Selector";
import ImageContainer from "../UI/ImageContainer";

const DOORSURROND_QUERY = gql`
  query DOORSURROND_QUERY {
    doorSurroundsConnection {
      edges {
        node {
          Id
          StyleNumber
          Surface
          ImageUrl
        }
      }
    }
  }
`;

const DoorSurround = () => {
  const { editStore, editDispatch } = useContext(editContext);
  const [options, setOptions] = useState([]);
  const { data, loading } = useQuery(DOORSURROND_QUERY);

  useEffect(() => {
    !loading && setOptions(data.doorSurroundsConnection.edges);
  }, [loading]);

  const handleClick = (value, id) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "doorSurround",
      value,
      id,
    });
  };

  return (
    <Layout
      title="What would you like to have as a Handle?"
      gridSize={3}
      component="DoorSurround"
    >
      {options.map(({ node }, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(node.StyleNumber, node.Id)}
          select={node.StyleNumber === editStore.doorEdit.doorSurround.value}
        >
          <ImageContainer alt={node.StyleNumber} src={node.ImageUrl} big />
          <p>{node.StyleNumber}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default DoorSurround;
