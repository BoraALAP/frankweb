import React, { useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import DisplayError from "../../components/UI/ErrorMessage";
import FieldSet from "../../components/user/FieldSet";
import { Primary, Tertiary } from "../../components/UI/Button";

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

const SignUp = () => {
  const history = useHistory();
  const { data } = useQuery(CURRENT_USER_QUERY);
  const [createUser, { loading, error, called }] = useMutation(
    CREATE_USER_MUTATION,
    { refetchQueries: [{ query: CURRENT_USER_QUERY }] }
  );

  useEffect(() => {
    if (data?.me) {
      history.push("/user/account");
    }
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .required("Required"),
    }),
    onSubmit: async (values, actions) => {
      await createUser({
        variables: {
          ...values,
        },
      });
      actions.resetForm({ values: { email: "", name: "", password: "" } });
      actions.setSubmitting(false);
    },
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <FieldSet disabled={loading} area-busy={loading.toString()}>
          <h2>Sign Up for an Account</h2>
          <DisplayError formikError={formik.errors} error={error} />
          {!error && !loading && called && (
            <p>Success! You are getting directed</p>
          )}
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
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
            {formik.isSubmitting ? "Checking..." : "Sign Me Up"}
          </Primary>
        </FieldSet>
      </Form>
      <Link to="/user/signIn">
        <Tertiary>I Have an Account</Tertiary>
      </Link>
    </Container>
  );
};

const Container = styled.div``;
const Form = styled.form``;

export default SignUp;
