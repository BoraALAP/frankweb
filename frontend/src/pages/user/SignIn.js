import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

import { CURRENT_USER_QUERY } from "../../queries/User";

import DisplayError from "../../components/UI/ErrorMessage";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const SignIn = (props) => {
  const history = useHistory();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const { data } = useQuery(CURRENT_USER_QUERY);
  const [signIn, { error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: {
      ...formValue,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

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
    await signIn();

    setFormValue({ email: "", password: "" });
  };

  return (
    <Container>
      <h1>Sign In</h1>

      <Form onSubmit={handleSubmit}>
        <fieldset disabled={loading} area-busy={loading.toString()}>
          <h2>Sign in for an Account</h2>
          <DisplayError error={error} />
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
          <button type="submit">Sign me In</button>
        </fieldset>
      </Form>
      <Link to="/user/signUp">No Account</Link>
      <Link to="/user/requestReset">Don't remember Password</Link>
    </Container>
  );
};

const Container = styled.div``;
const Form = styled.form``;

export default SignIn;
