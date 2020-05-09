import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_RATING_ELIGIBILITY_MUTATION = gql`
  mutation CREATE_RATING_ELIGIBILITY_MUTATION($Name: String) {
    createRatingEligibility(Name: $Name) {
      Name
    }
  }
`;

const RatingEligibility = (props) => {
  const [createRatingEligibility, { data, loading, error }] = useMutation(
    CREATE_RATING_ELIGIBILITY_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbRatingEligibility.json");
      data.RatingEligibility.map(async (item, index) => {
        const res = await createRatingEligibility({
          variables: {
            Name: item,
          },
        });
        console.log(index, data.RatingEligibility.length, res);
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
      <p>loaded RatingEligibility</p>
    </Container>
  );
};

const Container = styled.div``;

export default RatingEligibility;
