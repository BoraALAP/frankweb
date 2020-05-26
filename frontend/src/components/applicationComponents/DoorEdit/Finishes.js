import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Layout from "./Layout";
import Selector from "../UI/Selector";
import { editContext } from "../../../context/context";
import Spinner from "../../UI/Spinner";
import ImageContainer from "../UI/ImageContainer";
import DoorCollections from "../../../dbComponents/DoorCollections";

const FINISHES_QUERY = gql`
  query FINISHES_QUERY($id: ID) {
    doorsConnection(where: { Id: $id }) {
      edges {
        node {
          Finishes {
            Id
            Name
            ImageUrl
          }
        }
      }
    }
  }
`;

const Finishes = (props) => {
  const { editStore, editDispatch } = useContext(editContext);
  const [options, setOptions] = useState([]);
  const { data, loading } = useQuery(FINISHES_QUERY, {
    variables: {
      id: editStore.productId,
    },
  });

  useEffect(() => {
    if (!loading && data.doorsConnection !== undefined) {
      setOptions(data.doorsConnection.edges[0].node.Finishes);
    }
  }, [loading]);

  if (options === undefined) {
    return <Spinner />;
  }

  const handleClick = (value, id) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "finishes",
      value,
      id,
    });
  };

  return (
    <Layout
      title="What kind of finish you want to have on the door?"
      gridSize={3}
      component="Finishes"
    >
      {options.map((selector, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(selector.Name, selector.Id)}
          select={selector.Name === editStore.dooredit.finishes.value}
        >
          <ImageContainer alt={selector.StyleNumber} src={selector.ImageUrl} />

          <p>{selector.Name}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default Finishes;
