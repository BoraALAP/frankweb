import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_STYLE_LAYOUT_PAIRS_MUTATION = gql`
  mutation CREATE_STYLE_LAYOUT_PAIRS_MUTATION(
    $Abbreviation: String
    $Name: String
    $ImageUrl: String
    $DoorCollectionAbbreviation: String
    $StyleShapeAbbreviation: String
  ) {
    createStyleLayoutPairs(
      Abbreviation: $Abbreviation
      Name: $Name
      ImageUrl: $ImageUrl
      DoorCollectionAbbreviation: $DoorCollectionAbbreviation
      StyleShapeAbbreviation: $StyleShapeAbbreviation
    ) {
      Abbreviation
      Name
      ImageUrl
      DoorCollectionAbbreviation
      StyleShapeAbbreviation
    }
  }
`;

const StyleLayoutPairs = props => {
  const [createStyleLayoutPairs, { data, loading, error }] = useMutation(
    CREATE_STYLE_LAYOUT_PAIRS_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbStyleLayoutPairs.json");
      data.frameProfile.map(async item => {
        const res = await createStyleLayoutPairs({
          variables: {
            ...item
          }
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
      <p>loaded StyleLayoutPairs</p>
    </Container>
  );
};

const Container = styled.div``;

export default StyleLayoutPairs;
