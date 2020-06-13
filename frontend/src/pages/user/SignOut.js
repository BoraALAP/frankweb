import React from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";

import { CURRENT_USER_QUERY } from "../../queries/User";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`;

const SignOut = (props) => {
  const [signOut, { error, loading }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return <Button onClick={() => signOut()}>Sign Out</Button>;
};

const Button = styled.button``;

export default SignOut;
