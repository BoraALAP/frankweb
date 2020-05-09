import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_FINISH_MUTATION = gql`
  mutation CREATE_FINISH_MUTATION(
    $Name: String
    $Value: String
    $ImageUrl: String
    $FinishTypeSelection: Int
    $Selected: Boolean
  ) {
    createFinish(
      Name: $Name
      Value: $Value
      ImageUrl: $ImageUrl
      FinishTypeSelection: $FinishTypeSelection
      Selected: $Selected
    ) {
      Name
      Value
      ImageUrl
      FinishTypeSelection
      Selected
    }
  }
`;

const Finishes = (props) => {
  const [createFinish, { data, loading, error }] = useMutation(
    CREATE_FINISH_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbFinishes.json");
      data.finishes.map(async (item, index) => {
        const res = await createFinish({
          variables: {
            ...item,
          },
        });
        console.log(index, data.finishes.length, res);
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
      <p>loaded Finishes</p>
    </Container>
  );
};

const Container = styled.div``;

export default Finishes;
