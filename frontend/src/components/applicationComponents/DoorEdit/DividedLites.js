import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Layout from "./Layout";

import { editContext } from "../../../context/context";

import Selector from "../UI/Selector";
import Spinner from "../../UI/Spinner";
import ImageContainer from "../UI/ImageContainer";

const RELATED_DIVIDE_LITE_QUERY = gql`
  query RELATED_DIVIDE_LITE_QUERY($id: ID) {
    doorsConnection(where: { Id: $id }) {
      edges {
        node {
          RelatedGlasses {
            Name
            Id
            ImageUrl
            GlassAssociation {
              Association
              Id
            }
          }
        }
      }
    }
  }
`;

const DividedLites = (props) => {
  const { editStore, editDispatch } = useContext(editContext);
  const [options, setOptions] = useState([]);
  const { data, loading } = useQuery(RELATED_DIVIDE_LITE_QUERY, {
    variables: {
      id: props.id,
    },
  });

  useEffect(() => {
    !loading && setOptions(data.doorsConnection.edges[0].node.RelatedGlasses);
  }, [loading]);

  const handleClick = (value, id, associationValue, associationId) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "dividedLites",
      value,
      id,
    });
    editDispatch({
      type: "UPDATE_STEP",
      step: "glassAssociation",
      value: associationValue,
      id: associationId,
    });
  };

  return (
    <Layout
      title="What kind of Divide Lite would you like to have?"
      gridSize={3}
      component="DividedLites"
    >
      {options.map((selector, index) => (
        <Selector
          key={index}
          onClick={() =>
            handleClick(
              selector.Name,
              selector.Id,
              selector.GlassAssociation.Association,
              selector.GlassAssociation.Id
            )
          }
          select={selector.Name === editStore.doorEdit.dividedLites.value}
        >
          <ImageContainer
            alt={selector.StyleNumber}
            src={selector.ImageUrl}
            big
          />
          <p>{selector.Name}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default DividedLites;
