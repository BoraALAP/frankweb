import React from "react";
import styled from "styled-components";

const Selector = props => {
  return (
    <Container onClick={props.onClick} {...props}>
      <p>{props.children}</p>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 10px;
  border: ${props =>
    props.skip || props.back ? "1px solid #e3e3e3" : "1px solid #c2c2c2"};
  padding: 32px;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
`;

export default Selector;
