import React, { useContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import ImageContainer from "../UI/ImageContainer";

import styled from "styled-components";
import Selector from "../UI/Selector";

import Spinner from "../../UI/Spinner";
import { appContext } from "../../../context/context";
import Layout from "./Layout";

const FAMILY_QUERY = gql`
  query FAMILY_QUERY {
    glassFamiliesConnection(orderBy: PrivacyRating_DESC) {
      edges {
        node {
          Id
          Name
          Abbreviation
          GlassType
          PrivacyRating
          ImageUrl
          BigImageUrl
        }
      }
    }
  }
`;

const GlassFamily = (props) => {
  const { appStore, appDispatch } = useContext(appContext);
  const [options, setOptions] = useState([]);
  const { data, loading } = useQuery(FAMILY_QUERY);

  useEffect(() => {
    if (!loading && data.glassFamiliesConnection !== undefined) {
      if (appStore.glassSize.value === "Opaque") {
        data.glassFamiliesConnection.edges.find((element) => {
          // this is causing the problem on the console
          if (element.node.Name === "Opaque") {
            appDispatch({
              type: "UPDATE_STEP",
              step: "glassFamily",
              value: element.node.Name,
              id: element.node.Id,
            });
          }
        });
      }
      setOptions(data.glassFamiliesConnection.edges);
    }
  }, [loading]);

  if (options === undefined) {
    return <Spinner />;
  }

  const handleClick = (value, id) => {
    appDispatch({
      type: "UPDATE_STEP",
      step: "glassFamily",
      value,
      id,
    });
  };

  return (
    <Layout
      title="How much glass would you like to have on the door?"
      gridSize={4}
      component="glassFamily"
    >
      {options.map(({ node }, index) => {
        if (
          (node.Name !== "Opaque" && node.Name !== "Hammered") ||
          appStore.glassSize.value === "skipped"
        ) {
          return (
            <SelectorS
              key={index}
              onClick={() => handleClick(node.Name, node.Id)}
              select={node.Name === appStore.glassFamily.value}
            >
              <ImageContainer
                alt={node.Name}
                src={node.BigImageUrl ? node.BigImageUrl : node.ImageUrl}
                med={node.BigImageUrl}
              />

              <p>{node.Name}</p>
              <h6>
                Privacy Rating: <span>{node.PrivacyRating}</span>
              </h6>
            </SelectorS>
          );
        }
      })}
    </Layout>
  );
};

const SelectorS = styled(Selector)`
  grid-gap: 8px;
  justify-content: center;
  h6 {
    color: ${(props) =>
      props.select
        ? `${props.theme.color.white}`
        : `${props.theme.color.black}`};
  }
`;

export default GlassFamily;
