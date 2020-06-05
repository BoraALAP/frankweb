import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Layout from "./Layout";
import Selector from "../UI/Selector";
import { editContext } from "../../../context/context";
import Spinner from "../../UI/Spinner";
import ImageContainer from "../UI/ImageContainer";

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
      id: props.id,
    },
  });

  const handleClick = (value, id) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "finish",
      value,
      id,
    });
  };

  useEffect(() => {
    !loading && setOptions(data.doorsConnection.edges[0].node.Finishes);
  }, [loading]);

  if (options === undefined || options === []) {
    return <Spinner />;
  }

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
          select={selector.Name === editStore.doorEdit.finish.value}
        >
          <ImageContainer alt={selector.StyleNumber} src={selector.ImageUrl} />
          <p>{selector.Name}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default Finishes;
