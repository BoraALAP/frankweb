import React, { useState } from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import DisplayError from "../../components/UI/ErrorMessage";

import { CURRENT_USER_QUERY } from "../../queries/User";

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const SignUp = (props) => {
  const [formValue, setFormValue] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    variables: {
      email: formValue.email,
      name: formValue.name,
      password: formValue.password,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createUser();

    setFormValue({ email: "", name: "", password: "" });
  };
  return (
    <Container>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={loading} area-busy={loading.toString()}>
          <h2>Signup for an Account</h2>
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
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formValue.name}
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
          <button type="submit">Sign me Up</button>
        </fieldset>
      </Form>
    </Container>
  );
};

const Container = styled.div``;
const Form = styled.form``;

export default SignUp;
