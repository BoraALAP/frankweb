import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_DOOR_LINE_MUTATION = gql`
  mutation CREATE_DOOR_LINE_MUTATION(
    $Brand: String
    $Name: String
    $ShortName: String
    $Abbreviation: String
    $ProductLineId: String
    $DetailUrl: String
    $SuppressCollectionName: Boolean
  ) {
    createDoorLine(
      Brand: $Brand
      Name: $Name
      ShortName: $ShortName
      Abbreviation: $Abbreviation
      ProductLineId: $ProductLineId
      DetailUrl: $DetailUrl
      SuppressCollectionName: $SuppressCollectionName
    ) {
      Brand
      Name
      ShortName
      Abbreviation
      ProductLineId
      DetailUrl
      SuppressCollectionName
    }
  }
`;

const DoorLine = (props) => {
  const [createDoorLine, { data, loading, error }] = useMutation(
    CREATE_DOOR_LINE_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbDoorLine.json");
      data.doorLine.map(async (item, index) => {
        const res = await createDoorLine({
          variables: {
            ...item,
          },
        });
        console.log(index, data.doorLine.length, res);
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
      <p>loaded DoorLine</p>
    </Container>
  );
};

const Container = styled.div``;

export default DoorLine;
