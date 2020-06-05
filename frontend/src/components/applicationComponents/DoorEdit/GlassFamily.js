import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Layout from "./Layout";

import { editContext } from "../../../context/context";
import Spinner from "../../UI/Spinner";
import ImageContainer from "../UI/ImageContainer";
import Selector from "../UI/Selector";

const RELATED_GLASS_PARENT_QUERY = gql`
  query RELATED_GLASS_PARENT_QUERY($id: ID) {
    doorsConnection(where: { Id: $id }) {
      edges {
        node {
          RelatedFamily {
            __typename
            Id
            Name
            ImageUrl
            BigImageUrl
          }
        }
      }
    }
  }
`;

const GlassFamily = (props) => {
  const { editStore, editDispatch } = useContext(editContext);
  const [options, setOptions] = useState([]);
  const { data, loading } = useQuery(RELATED_GLASS_PARENT_QUERY, {
    variables: {
      id: props.id,
    },
  });

  useEffect(() => {
    !loading && setOptions(data.doorsConnection.edges[0].node.RelatedFamily);
  }, [loading]);

  const handleClick = (value, id) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "glassFamily",
      value,
      id,
    });
  };

  return (
    <Layout
      title="Other Glass families works with this door"
      gridSize={3}
      component="GlassFamily"
    >
      {options.map((item, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(item.Name, item.Id)}
          select={item.Name === editStore.doorEdit.glassFamily.value}
        >
          <ImageContainer
            alt={item.StyleNumber}
            src={item.BigImageUrl ? item.BigImageUrl : item.ImageUrl}
            med={item.BigImageUrl}
          />
          <p>{item.Name}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default GlassFamily;
