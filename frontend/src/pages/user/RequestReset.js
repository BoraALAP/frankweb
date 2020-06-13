import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { CURRENT_USER_QUERY } from "../../queries/User";

import DisplayError from "../../components/UI/ErrorMessage";

const REQUEST_RESET = gql`
  mutation REQUEST_RESET($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = (props) => {
  const [formValue, setFormValue] = useState({
    email: "",
  });

  const [requestReset, { error, loading, called }] = useMutation(
    REQUEST_RESET,
    {
      variables: {
        email: formValue.email,
      },
    }
  );

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestReset();
    setFormValue({ email: "" });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={loading} area-busy={loading.toString()}>
          <h2>Request Password for an Account</h2>
          <DisplayError error={error} />
          {!error && !loading && called && (
            <p>Success! check your email for a reset link!</p>
          )}
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValue.email}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Request Password</button>
        </fieldset>
      </Form>
      <Link to="/user/signIn">Sign In</Link>
    </Container>
  );
};

const Container = styled.div``;
const Form = styled.form``;

export default RequestReset;
