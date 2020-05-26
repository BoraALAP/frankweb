import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Layout from "./Layout";

import { editContext } from "../../../context/context";
import Spinner from "../../UI/Spinner";
import ImageContainer from "../UI/ImageContainer";
import Selector from "../UI/Selector";

const SIDELITE_QUERY = gql`
  query SIDELITE_QUERY($id: ID) {
    doorsConnection(where: { Id: $id }) {
      edges {
        node {
          Sidelites {
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

const Sidelite = (props) => {
  const { editStore, editDispatch } = useContext(editContext);
  const [options, setOptions] = useState([]);
  const { data, loading } = useQuery(SIDELITE_QUERY, {
    variables: {
      id: editStore.productId,
    },
  });

  useEffect(() => {
    if (!loading && data.doorsConnection !== undefined) {
      setOptions(data.doorsConnection.edges[0].node.Sidelites);
    }
  }, [loading]);

  if (options === undefined) {
    return <Spinner />;
  }

  const handleClick = (value, id) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "sidelite",
      value,
      id,
    });
  };

  console.log(options);

  return (
    <Layout
      title="Other Sidelite families works with this door"
      gridSize={3}
      component="Sidelite"
    >
      {options.map((item, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(item.StyleNumber, item.Id)}
          select={item.StyleNumber === editStore.dooredit.sidelite.value}
        >
          <ImageContainer
            alt={item.StyleNumber}
            src={item.BigImageUrl ? item.BigImageUrl : item.ImageUrl}
            big
          />
          <p>{item.StyleNumber}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default Sidelite;
