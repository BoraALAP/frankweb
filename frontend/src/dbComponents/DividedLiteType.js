import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_DIVIDED_LITE_TYPE_MUTATION = gql`
  mutation CREATE_DIVIDED_LITE_TYPE_MUTATION(
    $Name: String
    $Abbreviation: String
    $GrilleColorCanBeVisualized: Boolean
  ) {
    createDividedLiteType(
      Name: $Name
      Abbreviation: $Abbreviation
      GrilleColorCanBeVisualized: $GrilleColorCanBeVisualized
    ) {
      Name
      Abbreviation
      GrilleColorCanBeVisualized
    }
  }
`;

const DividedLiteType = (props) => {
  const [createDividedLiteType, { data, loading, error }] = useMutation(
    CREATE_DIVIDED_LITE_TYPE_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbDividedLiteType.json");
      data.dividedLiteType.map(async (item, index) => {
        const res = await createDividedLiteType({
          variables: {
            ...item,
          },
        });
        console.log(index, data.dividedLiteType.length, res);
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
      <p>loaded DividedLiteType</p>
    </Container>
  );
};

const Container = styled.div``;

export default DividedLiteType;
