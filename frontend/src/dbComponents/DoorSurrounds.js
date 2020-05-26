import React, { useEffect } from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_DOOR_SURROUND_MUTATION = gql`
  mutation CREATE_DOOR_SURROUND_MUTATION(
    $StyleNumber: String
    $Surface: String
    $ImageUrl: String
  ) {
    createDoorSurround(
      StyleNumber: $StyleNumber
      Surface: $Surface
      ImageUrl: $ImageUrl
    ) {
      StyleNumber
      Surface
      ImageUrl
    }
  }
`;

const DoorSurrounds = (props) => {
  const [createDoorSurround, { data, loading, error }] = useMutation(
    CREATE_DOOR_SURROUND_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbDoorSurrounds.json");
      console.log(data);

      data.doorSurrounds.map(async (item, index) => {
        const res = await createDoorSurround({
          variables: {
            ...item,
          },
        });
        console.log(index, data.doorSurrounds.length, res);
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
      <p>loaded DoorSurrounds</p>
    </Container>
  );
};

const Container = styled.div``;

export default DoorSurrounds;
