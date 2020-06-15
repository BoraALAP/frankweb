import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";

import FieldSet from "../../components/user/FieldSet";
import { Primary, Tertiary } from "../../components/UI/Button";

import DisplayError from "../../components/UI/ErrorMessage";

const REQUEST_RESET = gql`
  mutation REQUEST_RESET($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = () => {
  const [requestReset, { error, loading, called }] = useMutation(REQUEST_RESET);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    }),
    onSubmit: async (values, actions) => {
      await requestReset({ variables: { ...values } });
      actions.resetForm({ values: { email: "" } });
      actions.setSubmitting(false);
    },
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <FieldSet disabled={loading} area-busy={loading.toString()}>
          <h2>Request Password for an Account</h2>
          <DisplayError formikError={formik.errors} error={error} />
          {!error && !loading && called && (
            <p>Success! check your email for a reset link!</p>
          )}
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

          <Primary
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {" "}
            {formik.isSubmitting ? "Sending..." : "Request Password"}
          </Primary>
        </FieldSet>
      </Form>
      <Tertiary link to="/user/signIn">
        Sign In
      </Tertiary>
    </Container>
  );
};

const Container = styled.div``;
const Form = styled.form``;

export default RequestReset;
