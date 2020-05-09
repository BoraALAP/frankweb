import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_LOCATION_ON_HOUSE_MUTATION = gql`
  mutation CREATE_LOCATION_ON_HOUSE_MUTATION(
    $Name: String!
    $ImageUrl: String
    $IconUrl: String
  ) {
    createLocationOnHouse(Name: $Name, ImageUrl: $ImageUrl, IconUrl: $IconUrl) {
      Name
      ImageUrl
      IconUrl
    }
  }
`;

const LocationOnHouse = (props) => {
  const [createLocationOnHouse, { data, loading, error }] = useMutation(
    CREATE_LOCATION_ON_HOUSE_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbLocationOnHouse.json");
      console.log(data.location);

      data.location.map(async (item, index) => {
        const res = await createLocationOnHouse({
          variables: {
            ...item,
          },
        });
        console.log(index, data.location.length, res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <p>loaded LocationOnHouse</p>
    </Container>
  );
};

const Container = styled.div``;

export default LocationOnHouse;
