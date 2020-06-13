import React, { useContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import Selector from "../UI/Selector";
import Spinner from "../../UI/Spinner";
import { appContext } from "../../../context/context";
import Layout from "./Layout";

const GLASS_SIZE_QUERY = gql`
  query GLASS_SIZE_QUERY {
    glassSizesConnection(orderBy: Name_ASC) {
      edges {
        node {
          __typename
          Id
          Name
        }
      }
    }
  }
`;

const GlassSize = (props) => {
  const { appStore, appDispatch } = useContext(appContext);
  const [options, setOptions] = useState([]);
  const { data, loading } = useQuery(GLASS_SIZE_QUERY);

  useEffect(() => {
    if (!loading && data.glassSizesConnection !== undefined) {
      setOptions(data.glassSizesConnection.edges);
    }
  }, [loading]);

  if (options === undefined) {
    return <Spinner />;
  }

  const handleClick = (value, id) => {
    appDispatch({
      type: "UPDATE_STEP",
      step: "glassSize",
      value,
      id,
    });
  };

  return (
    <Layout
      title="How much glass would you like to have on the door?"
      component="glassSize"
    >
      {options.map(({ node }, index) => {
        if (node.Name !== "Transom")
          return (
            <Selector
              key={index}
              onClick={() => handleClick(node.Name, node.Id)}
              select={node.Name === appStore.glassSize.value}
            >
              {node.Name}
            </Selector>
          );
      })}
    </Layout>
  );
};

export default GlassSize;
