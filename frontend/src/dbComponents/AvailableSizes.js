import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_AVAILABLE_SIZES_MUTATION = gql`
  mutation CREATE_AVAILABLE_SIZES_MUTATION(
    $Size: String
    $Place: String
    $Width: String
    $Height: String
  ) {
    createAvailableSizes(
      Size: $Size
      Place: $Place
      Width: $Width
      Height: $Height
    ) {
      Size
      Place
      Width
      Height
    }
  }
`;

const UPDATE_AVAILABLE_SIZES_MUTATION = gql`
  mutation UPDATE_AVAILABLE_SIZES_MUTATION(
    $Size: String
    $Place: String
    $Width: String
    $Height: String
  ) {
    updateAvailableSizes(
      where: { Size: $Size }
      data: { Place: $Place, Width: $Width, Height: $Height }
    ) {
      Size
      Place
      Width
      Height
    }
  }
`;

const AvailableSizes = (props) => {
  const [createAvailableSizes] = useMutation(CREATE_AVAILABLE_SIZES_MUTATION);
  const [updateAvailableSizes] = useMutation(UPDATE_AVAILABLE_SIZES_MUTATION);

  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbAvailableSizes.json");
      const create = () => {
        data.AvailableSizes.map(async (item, index) => {
          const res = await createAvailableSizes({
            variables: {
              Size: item.Size,
              Place: item.Place,
              Width: item.Width,
              Height: item.Height,
            },
          });
          console.log(index, data.AvailableSizes.length, res);
        });
      };

      const update = () => {
        data.AvailableSizes.map(async (item, index) => {
          console.log(item);

          const res = await updateAvailableSizes({
            variables: {
              Size: item.Size,
              Place: item.Place,
              Width: item.Width,
              Height: item.Height,
            },
          });
          console.log(index, data.AvailableSizes.length, res);
        });
      };

      update();
      // create();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <p>loaded AvailableSizes</p>
    </Container>
  );
};

const Container = styled.div``;

export default AvailableSizes;
