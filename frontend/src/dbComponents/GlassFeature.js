import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_GLASS_FEATURE_MUTATION = gql`
  mutation CREATE_GLASS_FEATURE_MUTATION($Name: String, $Abbreviation: String) {
    createGlassFeature(Name: $Name, Abbreviation: $Abbreviation) {
      Name
      Abbreviation
    }
  }
`;

const GlassFeature = (props) => {
  const [createGlassFeature, { data, loading, error }] = useMutation(
    CREATE_GLASS_FEATURE_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbGlassFeatures.json");
      data.glassFeatures.map(async (item) => {
        const res = await createGlassFeature({
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
      <p>loaded GlassFeature</p>
    </Container>
  );
};

const Container = styled.div``;

export default GlassFeature;
