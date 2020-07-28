import React from "react";
import styled from "styled-components";

const FieldSet = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled.fieldset`
  display: grid;
  justify-content: center;
  align-content: center;
  border: none;
  box-sizing: border-box;
  margin: 0;
  min-width: 320px;
  max-width: 400px;
  width: 80vw;
  margin-bottom: 3em;
`;

const Content = styled.div`
  display: grid;
  justify-content: stretch;
  align-content: center;
  grid-auto-flow: row;
  grid-gap: 1em;

  h1 {
    display: grid;
    margin: 0;
  }
  div {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 0.5em;
  }
  input {
    background: none;
  }
`;

export default FieldSet;
