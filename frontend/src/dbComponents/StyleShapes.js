import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_STYLE_SHAPE_MUTATION = gql`
  mutation CREATE_STYLE_SHAPE_MUTATION(
    $Brand: String
    $Name: String
    $Abbreviation: String
    $TopCut: Int
  ) {
    createStyleShape(
      Brand: $Brand
      Name: $Name
      Abbreviation: $Abbreviation
      TopCut: $TopCut
    ) {
      Brand
      Name
      Abbreviation
      TopCut
    }
  }
`;

const StyleShape = (props) => {
  const [createStyleShape, { data, loading, error }] = useMutation(
    CREATE_STYLE_SHAPE_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbStyleShape.json");
      data.styleShape.map(async (item) => {
        const res = await createStyleShape({
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
      <p>loaded StyleShape</p>
    </Container>
  );
};

const Container = styled.div``;

export default StyleShape;
