import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import DisplayError from "../../components/UI/ErrorMessage";
import FieldSet from "../../components/user/FieldSet";
import { Primary } from "../../components/UI/Button";

const DealerLogin = (props) => {
  const history = useHistory();

  const [ dealer, setDealer ] = useState(false);
  const [ error, setError ] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
        .required("Required"),
    }),
    onSubmit: async (values, actions) => {
      if(values.password === process.env.REACT_APP_DEALER_PASSWORD){
        setDealer(true)
      } else {
        setError("Password is wrong")
      }
      actions.resetForm({ values: { password: "" } });
      actions.setSubmitting(false);
    },
  });

  useEffect(() => {
    if (dealer) {
      history.push("/dealerDashboard");
    }
  });

  return (
    <Container>
      <DisplayError formikError={formik.errors} error={error}/>
      <Form onSubmit={formik.handleSubmit}>
        <FieldSet disabled={formik.isSubmitting} area-busy={formik.isSubmitting.toString()}>
          <h2>Dealer Login</h2>
          
          <Inner>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Inner>

          <Primary
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? "Logining in..." : "Login"}
          </Primary>
        </FieldSet>
      </Form>
    </Container>
  );
};

const Container = styled.div``;
const Form = styled.form`

  label{
    display: none;
  }
`;

const Inner = styled.div`
display: grid;
grid-gap: 5vw;
`

export default DealerLogin;
