import React, { useContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import ImageContainer from "../UI/ImageContainer";

import Selector from "../UI/Selector";
import Spinner from "../../UI/Spinner";
import { appContext } from "../../../context/context";
import Layout from "./Layout";

const LOCATION_QUERY = gql`
  query LOCATION_QUERY {
    locationOnHousesConnection {
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

const Location = () => {
  const { store, dispatch } = useContext(appContext);
  const [options, setOptions] = useState([]);
  const { data, loading } = useQuery(LOCATION_QUERY);

  useEffect(() => {
    if (!loading && data.locationOnHousesConnection !== undefined) {
      setOptions(data.locationOnHousesConnection.edges);
    }
  }, [loading]);

  if (options === undefined) {
    return <Spinner />;
  }

  const handleClick = (value, id) => {
    dispatch({
      type: "UPDATE_STEP",
      step: "location",
      value,
      id,
    });
  };

  return (
    <Layout title="Where are you going to use this door?" component="location">
      {options.map((selector, index) => (
        <Selector
          key={index}
          select={selector.node.Name === store.steps.location.value}
          onClick={() => handleClick(selector.node.Name, selector.node.Id)}
        >
          {selector.node.Name}
        </Selector>
      ))}
    </Layout>
  );
};

export default Location;
