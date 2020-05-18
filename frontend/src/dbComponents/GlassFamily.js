import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_GLASS_FAMILY_MUTATION = gql`
  mutation CREATE_GLASS_FAMILY_MUTATION(
    $Brand: String
    $Name: String
    $Abbreviation: String
    $GlassType: String
    $PrivacyRating: Int
    $AvailableFeatures: [String]!
    $AvailableDividedLiteTypes: [String]!
    $IsLowE: Boolean
    $Description: String
    $ImageUrl: String
    $DetailUrl: String
    $BigImageUrl: String
  ) {
    createGlassFamily(
      Brand: $Brand
      Name: $Name
      Abbreviation: $Abbreviation
      GlassType: $GlassType
      PrivacyRating: $PrivacyRating
      AvailableFeatures: $AvailableFeatures
      AvailableDividedLiteTypes: $AvailableDividedLiteTypes
      IsLowE: $IsLowE
      Description: $Description
      ImageUrl: $ImageUrl
      DetailUrl: $DetailUrl
      BigImageUrl: $BigImageUrl
    ) {
      Brand
      Name
      Abbreviation
      GlassType
      PrivacyRating
      AvailableFeatures
      AvailableDividedLiteTypes
      IsLowE
      Description
      ImageUrl
      DetailUrl
      BigImageUrl
    }
  }
`;

const UPDATE_GLASS_FAMILY_MUTATION = gql`
  mutation UPDATE_GLASS_FAMILY_MUTATION(
    $Abbreviation: String
    $BigImageUrl: String
  ) {
    updateGlassFamily(
      where: { Abbreviation: $Abbreviation }
      data: { BigImageUrl: $BigImageUrl }
    ) {
      Abbreviation
      BigImageUrl
    }
  }
`;

const GlassFamily = (props) => {
  const [createGlassFamily] = useMutation(CREATE_GLASS_FAMILY_MUTATION);

  const [updateGlassFamily] = useMutation(UPDATE_GLASS_FAMILY_MUTATION);
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbGlassFamilies.json");
      data.glassFamilies.map(async (item, index) => {
        const create = async () => {
          const res = await createGlassFamily({
            variables: {
              ...item,
            },
          });
          console.log(index, data.glassFamilies.length, res);
        };

        const update = async () => {
          const res = await updateGlassFamily({
            variables: {
              Abbreviation: item.Abbreviation,
              BigImageUrl: item.BigImageUrl,
            },
          });
          console.log(index, data.glassFamilies.length, res);
        };

        // create();
        update();
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
