import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
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

const DoorCollections = props => {
  const [state, setState] = useState(undefined);
  const [createDoorCollection, { data, loading, error }] = useMutation(
    CREATE_DOOR_COLLECTION_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const run = async text => {
    console.log("====================================");
    console.log("running", text);
    console.log("====================================");
    if (state !== undefined) {
      console.log(state);
      const res = await createDoorCollection({
        variables: {
          ...state
        }
      });
      console.log(res);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbCollection.json");
      data.doorCollections.map(async item => {
        const res = await createDoorCollection({
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
      <button onClick={run}>add</button>
    </Container>
  );
};

const Container = styled.div``;

export default DoorCollections;
