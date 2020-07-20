import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import Layout from "./Layout";

import { editContext } from "../../../context/context";
import Selector from "../UI/Selector";
import Spinner from "../../UI/Spinner";
import ImageContainer from "../UI/ImageContainer";

const HANDLESETS_QUERY = gql`
  query HANDLESETS_QUERY {
    handleSetsConnection {
      edges {
        node {
          Id
          Finish
          FinishToken
          ImageUrl
          Design
          Locking
          Size
          ProductFamily
          FeedDYD
          ShowInDYD
          IsMultiPoint
          PartCode
          Brand
          WebSiteProductCategoryId
          WebSiteProductCategoryName
          PartType
        }
      }
    }
  }
`;

const HandleSets = () => {
  const { editStore, editDispatch } = useContext(editContext);
  const [options, setOptions] = useState([]);
  const { data, loading } = useQuery(HANDLESETS_QUERY);

  useEffect(() => {
    !loading && setOptions(data.handleSetsConnection.edges);
  }, [loading]);

  const handleClick = (value, id) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "handleSets",
      value,
      id,
    });
  };

  return (
    <Layout
      title="What would you like to have as a Handle?"
      gridSize={3}
      component="HandleSets"
    >
      {options.map(({ node }, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(node.PartCode, node.Id)}
          select={node.PartCode === editStore.doorEdit.handleSets.value}
        >
          <ImageContainer alt={node.StyleNumber} src={node.ImageUrl} big />
          <p>{node.PartCode}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default HandleSets;
