import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../../queries/User";
import { useLocation, Redirect, useHistory } from "react-router-dom";
import DisplayError from "../../components/UI/ErrorMessage";

const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
    $password: String!
    $confirmPassword: String!
    $resetToken: String!
  ) {
    resetPassword(
      password: $password
      confirmPassword: $confirmPassword
      resetToken: $resetToken
    ) {
      id
      email
      name
    }
  }
`;

const ResetPassword = (props) => {
  const history = useHistory();
  const location = useLocation().search;
  const token = new URLSearchParams(location).get("resetToken");

  const [formValue, setFormValue] = useState({
    password: "",
    confirmPassword: "",
  });

  const { data } = useQuery(CURRENT_USER_QUERY);

  const [resetPassword, { error, loading, called }] = useMutation(
    RESET_PASSWORD,
    {
      variables: {
        ...formValue,
        resetToken: token,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  useEffect(() => {
    if (data?.me) {
      history.push("/account");
    }
  });

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword();

    setFormValue({ password: "", confirmPassword: "" });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={loading} area-busy={loading.toString()}>
          <h2>Reset Password for an Account</h2>
          <DisplayError error={error} />
          {!error && !loading && called && (
            <p>Success! You have set your new password!</p>
          )}

          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValue.password}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formValue.confirmPassword}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Sign me In</button>
        </fieldset>
      </Form>
    </Container>
  );
};

const Container = styled.div``;
const Form = styled.form``;

export default ResetPassword;
