import React, { useEffect } from "react";
import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useLocation, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { CURRENT_USER_QUERY } from "../../queries/User";
import DisplayError from "../../components/UI/ErrorMessage";
import FieldSet from "../../components/user/FieldSet";
import { Primary } from "../../components/UI/Button";

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

  const { data } = useQuery(CURRENT_USER_QUERY);

  const [resetPassword, { error, loading, called }] = useMutation(
    RESET_PASSWORD,
    { refetchQueries: [{ query: CURRENT_USER_QUERY }] }
  );

  useEffect(() => {
    if (data?.me) {
      history.push("/user/account");
    }
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .required("Required"),
      confirmPassword: Yup.string()
        .min(8, "Confirm Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .required("Required"),
    }),
    onSubmit: async (values, actions) => {
      await resetPassword({ variables: { resetToken: token, ...values } });
      actions.resetForm({ values: { password: "", confirmPassword: "" } });
      actions.setSubmitting(false);
    },
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <FieldSet disabled={loading} area-busy={loading.toString()}>
          <h2>Reset Password for an Account</h2>
          <DisplayError formikError={formik.errors} error={error} />
          {!error && !loading && called && (
            <p>Success! You have set your new password!</p>
          )}

          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </label>
          <label htmlFor="password">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
          </label>
          <Primary
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {" "}
            {formik.isSubmitting ? "Reseting..." : "Reset Password"}
          </Primary>
        </FieldSet>
      </Form>
    </Container>
  );
};

const Container = styled.div``;
const Form = styled.form``;

export default ResetPassword;
