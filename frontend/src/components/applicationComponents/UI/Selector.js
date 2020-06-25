import React from "react";
import styled from "styled-components";

const Selector = (props) => {
  if (Array.isArray(props.children) || props.children > 2) {
    return (
      <Container onClick={props.onClick} {...props}>
        {props.children}
      </Container>
    );
  } else {
    return (
      <Container onClick={props.onClick} {...props}>
        <p>{props.children}</p>
      </Container>
    );
  }
};

const Container = styled.div`
  border: ${(props) =>
    props.skip || props.back ? "1px solid #e3e3e3" : "1px solid #c2c2c2"};
  padding: ${(props) => (props.skip || props.back ? "8px 32px" : "32px")};
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  font-size: 0.875em;
  grid-gap: 1em;
  display: grid;
  align-items: center;
  justify-items: center;
  color: ${(props) =>
    props.select ? `${props.theme.color.white}` : `${props.theme.color.black}`};
  background-color: ${(props) =>
    props.select
      ? `${props.theme.color.primary}`
      : `${props.theme.color.white}`};
`;

export default Selector;
