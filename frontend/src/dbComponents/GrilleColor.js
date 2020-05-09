import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_GRILLE_COLOR_MUTATION = gql`
  mutation CREATE_GRILLE_COLOR_MUTATION(
    $Name: String
    $Abbreviation: String
    $Token: String
    $ImageUrl: String
  ) {
    createGrilleColor(
      Name: $Name
      Abbreviation: $Abbreviation
      Token: $Token
      ImageUrl: $ImageUrl
    ) {
      Name
      Abbreviation
      Token
      ImageUrl
    }
  }
`;

const GrilleColor = (props) => {
  const [createGrilleColor, { data, loading, error }] = useMutation(
    CREATE_GRILLE_COLOR_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbGrilleColors.json");
      data.grilleColors.map(async (item, index) => {
        const res = await createGrilleColor({
          variables: {
            ...item,
          },
        });
        console.log(index, data.grilleColors.length, res);
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
      <p>loaded GrilleColor</p>
    </Container>
  );
};

const Container = styled.div``;

export default GrilleColor;
