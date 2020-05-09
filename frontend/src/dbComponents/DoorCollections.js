import React, { useEffect } from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_DOOR_COLLECTION_MUTATION = gql`
  mutation CREATE_DOOR_COLLECTION_MUTATION(
    $Brand: String
    $Name: String
    $ShortName: String
    $Abbreviation: String
    $Material: String
    $Surface: String
    $Accugrain: Boolean
    $Paintable: Boolean
    $Stainable: Boolean
  ) {
    createDoorCollection(
      Brand: $Brand
      Name: $Name
      ShortName: $ShortName
      Abbreviation: $Abbreviation
      Material: $Material
      Surface: $Surface
      Accugrain: $Accugrain
      Paintable: $Paintable
      Stainable: $Stainable
    ) {
      Brand
      Name
      ShortName
      Abbreviation
      Material
      Surface
      Accugrain
      Paintable
      Stainable
    }
  }
`;

const DoorCollections = (props) => {
  const [createDoorCollection, { data, loading, error }] = useMutation(
    CREATE_DOOR_COLLECTION_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbCollection.json");
      data.doorCollections.map(async (item, index) => {
        const res = await createDoorCollection({
          variables: {
            ...item,
          },
        });
        console.log(index, data.doorCollections.length, res);
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
      <p>loaded DoorCollection</p>
    </Container>
  );
};

const Container = styled.div``;

export default DoorCollections;
