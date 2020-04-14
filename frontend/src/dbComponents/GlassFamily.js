import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_GLASS_FAMILY_MUTATION = gql`
  mutation CREATE_GLASS_FAMILY_MUTATION(
    $Brand: String
    $name: String
    $abbreviation: String
    $glassType: String
    $privacyRating: Int
    $availableFeatures: [String!]!
    $availableDividedLiteTypes: [String!]!
    $isLowE: Boolean
    $description: String
    $imageUrl: String
    $detailUrl: String
  ) {
    createGlassFamily(
      Brand: $Brand
      name: $name
      abbreviation: $abbreviation
      glassType: $glassType
      privacyRating: $privacyRating
      availableFeatures: $availableFeatures
      availableDividedLiteTypes: $availableDividedLiteTypes
      isLowE: $isLowE
      description: $description
      imageUrl: $imageUrl
      detailUrl: $detailUrl
    ) {
      Brand
      name
      abbreviation
      glassType
      privacyRating
      availableFeatures
      availableDividedLiteTypes
      isLowE
      description
      imageUrl
      detailUrl
    }
  }
`;

const GlassFamily = (props) => {
  const [createGlassFamily, { data, loading, error }] = useMutation(
    CREATE_GLASS_FAMILY_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbGlassFamilies.json");
      data.glassFamilies.map(async (item) => {
        const res = await createGlassFamily({
          variables: {
            ...item,
          },
        });
        console.log(res);
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
      <p>loaded GlassFamily</p>
    </Container>
  );
};

const Container = styled.div``;

export default GlassFamily;
