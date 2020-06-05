import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Layout from "./Layout";

import { editContext } from "../../../context/context";
import Spinner from "../../UI/Spinner";
import ImageContainer from "../UI/ImageContainer";
import Selector from "../UI/Selector";

const TRANSOM_QUERY = gql`
  query TRANSOM_QUERY($id: ID) {
    doorsConnection(where: { Id: $id }) {
      edges {
        node {
          Transoms {
            __typename
            StyleNumber
            Id
            ImageUrl
          }
        }
      }
    }
  }
`;

const Transom = (props) => {
  const { editStore, editDispatch } = useContext(editContext);
  const [options, setOptions] = useState([]);
  const { data, loading } = useQuery(TRANSOM_QUERY, {
    variables: {
      id: props.id,
    },
  });

  useEffect(() => {
    !loading && setOptions(data.doorsConnection.edges[0].node.Transoms);
  }, [loading]);

  const handleClick = (value, id) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "transom",
      value,
      id,
    });
  };

  return (
    <Layout
      title="Other Transom families works with this door"
      gridSize={3}
      component="Transom"
    >
      {options.map((item, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(item.StyleNumber, item.Id)}
          select={item.StyleNumber === editStore.doorEdit.transom.value}
        >
          <ImageContainer
            alt={item.StyleNumber}
            src={item.BigImageUrl ? item.BigImageUrl : item.ImageUrl}
            med
          />
          <p>{item.StyleNumber}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default Transom;
