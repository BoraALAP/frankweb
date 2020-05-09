import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_GLASS_ASSOCIATION_MUTATION = gql`
  mutation CREATE_GLASS_ASSOCIATION_MUTATION($Association: String) {
    createGlassAssociation(Association: $Association) {
      Association
    }
  }
`;

const GlassAssociation = (props) => {
  const [createGlassAssociation, { data, loading, error }] = useMutation(
    CREATE_GLASS_ASSOCIATION_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbGlassAssociation.json");
      data.glassAssociation.map(async (item, index) => {
        const res = await createGlassAssociation({
          variables: {
            Association: item,
          },
        });
        console.log(index, data.glassAssociation.length, res);
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
      <p>loaded GlassAssociation</p>
    </Container>
  );
};

const Container = styled.div``;

export default GlassAssociation;
