import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_CAMING_OPTION_MUTATION = gql`
  mutation CREATE_CAMING_OPTION_MUTATION(
    $Name: String
    $Abbreviation: String
    $GlassFamilyAbbreviation: String
    $Token: String
    $ImageUrl: String
  ) {
    createCamingOption(
      Name: $Name
      Abbreviation: $Abbreviation
      GlassFamilyAbbreviation: $GlassFamilyAbbreviation
      Token: $Token
      ImageUrl: $ImageUrl
    ) {
      Name
      Abbreviation
      GlassFamilyAbbreviation
      Token
      ImageUrl
    }
  }
`;

const CamingOption = (props) => {
  const [createCamingOption, { data, loading, error }] = useMutation(
    CREATE_CAMING_OPTION_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbCamingOptions.json");
      data.camingOptions.map(async (item) => {
        const res = await createCamingOption({
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
      <p>loaded CamingOption</p>
    </Container>
  );
};

const Container = styled.div``;

export default CamingOption;
