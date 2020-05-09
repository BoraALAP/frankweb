import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_ARCHITECTURAL_STYLE_MUTATION = gql`
  mutation CREATE_ARCHITECTURAL_STYLE_MUTATION($Style: String) {
    createArchitecturalStyle(Style: $Style) {
      Style
    }
  }
`;

const ArchitecturalStyle = (props) => {
  const [createArchitecturalStyle, { data, loading, error }] = useMutation(
    CREATE_ARCHITECTURAL_STYLE_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbArchitecturalStyle.json");
      data.ArchitecturalStyle.map(async (item, index) => {
        const res = await createArchitecturalStyle({
          variables: {
            Style: item,
          },
        });
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
      <p>loaded ArchitecturalStyle</p>
    </Container>
  );
};

const Container = styled.div``;

export default ArchitecturalStyle;
