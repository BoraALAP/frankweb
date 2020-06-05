import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Layout from "./Layout";

import { editContext } from "../../../context/context";
import Spinner from "../../UI/Spinner";
import RelatedItem from "../UI/RelatedItem";

const DOOR_STYLES_QUERY = gql`
  query DOOR_STYLES_QUERY($id: ID) {
    doorsConnection(where: { Id: $id }) {
      edges {
        node {
          RelatedDoors {
            __typename
            Id
            StyleNumber
            ImageUrl
          }
        }
      }
    }
  }
`;

const DoorStyles = (props) => {
  const { editStore, editDispatch } = useContext(editContext);
  const [options, setOptions] = useState([]);
  const { data, loading } = useQuery(DOOR_STYLES_QUERY, {
    variables: {
      id: props.id,
    },
  });

  useEffect(() => {
    !loading && setOptions(data.doorsConnection.edges[0].node.RelatedDoors);
  }, [loading]);

  return (
    <Layout
      title="Would you like to checkout similar Doors?"
      gridSize={3}
      component="DoorStyles"
    >
      {options.map((item, index) => (
        <RelatedItem
          key={item.Id}
          StyleNumber={item.StyleNumber}
          ImageUrl={item.ImageUrl}
          Id={item.Id}
          Type={item.__typename}
          Link="selected"
        />
      ))}
    </Layout>
  );
};

export default DoorStyles;
