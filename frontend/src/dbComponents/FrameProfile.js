import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_FRAME_PROFILE_MUTATION = gql`
  mutation CREATE_FRAME_PROFILE_MUTATION(
    $Abbreviation: String
    $Name: String
    $ImgURL: String
    $DoorCollectionAbbreviation: String
    $StyleShapeAbbreviation: String
  ) {
    createFrameProfile(
      Abbreviation: $Abbreviation
      Name: $Name
      ImgURL: $ImgURL
      DoorCollectionAbbreviation: $DoorCollectionAbbreviation
      StyleShapeAbbreviation: $StyleShapeAbbreviation
    ) {
      Abbreviation
      Name
      ImgURL
      DoorCollectionAbbreviation
      StyleShapeAbbreviation
    }
  }
`;

const FrameProfile = (props) => {
  const [createFrameProfile, { data, loading, error }] = useMutation(
    CREATE_FRAME_PROFILE_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbFrameProfile.json");
      data.frameProfile.map(async (item) => {
        const res = await createFrameProfile({
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
      <p>loaded FrameProfile</p>
    </Container>
  );
};

const Container = styled.div``;

export default FrameProfile;
