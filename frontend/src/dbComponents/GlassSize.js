import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_GLASS_SIZE_MUTATION = gql`
  mutation CREATE_GLASS_SIZE_MUTATION($Name: String, $Abbreviation: String) {
    createGlassSize(Name: $Name, Abbreviation: $Abbreviation) {
      Name
      Abbreviation
    }
  }
`;

const GlassSize = (props) => {
  const [createGlassSize, { data, loading, error }] = useMutation(
    CREATE_GLASS_SIZE_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbGlassSizes.json");

      data.glassSizes.map(async (item, index) => {
        console.log(item);
        const res = await createGlassSize({
          variables: {
            ...item,
          },
        });
        console.log(index, data.glassSizes.length, res);
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
      <p>loaded GlassSize</p>
    </Container>
  );
};

const Container = styled.div``;

export default GlassSize;
