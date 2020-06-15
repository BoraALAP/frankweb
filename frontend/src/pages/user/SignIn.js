import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

import { useFormik } from "formik";
import * as Yup from "yup";

import { CURRENT_USER_QUERY } from "../../queries/User";

import DisplayError from "../../components/UI/ErrorMessage";
import FieldSet from "../../components/user/FieldSet";
import { Primary, Tertiary } from "../../components/UI/Button";

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

  const { data } = useQuery(CURRENT_USER_QUERY);
  const [signIn, { error, loading }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .required("Required"),
    }),
    onSubmit: async (values, actions) => {
      await signIn({ variables: { ...values } });
      actions.resetForm({ values: { email: "", password: "" } });
      actions.setSubmitting(false);
    },
  });

  useEffect(() => {
    if (data?.me) {
      history.push("/user/account");
    }
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <FieldSet disabled={loading} area-busy={loading.toString()}>
          <h2>Sign In</h2>
          <DisplayError formikError={formik.errors} error={error} />
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>

          <Primary
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {" "}
            {formik.isSubmitting ? "Checking..." : "Sign Me In"}
          </Primary>
        </FieldSet>
      </Form>
      <Tertiary link to="/user/signUp">
        No Account
      </Tertiary>
      <Tertiary link to="/user/requestReset">
        Don't Remember Password
      </Tertiary>
    </Container>
  );
};

const Container = styled.div``;
const Form = styled.form``;

export default SignIn;
