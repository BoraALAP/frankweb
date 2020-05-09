import React from "react";
import styled from "styled-components";

const Button = (props) => {
  return <Container {...props}>{props.children} </Container>;
};

const Container = styled.button`
  text-align: center;
  font-weight: 500;
  background-color: ${(props) =>
    props.display ? props.theme.color.white : props.theme.color.primary};
  color: ${(props) =>
    props.display ? props.theme.color.primary : props.theme.color.white};
  padding: ${({ theme }) => theme.boxPadding};
  width: 100%;
  border-radius: ${({ theme }) => theme.boxRadius};
  margin: auto;
  border-color: ${(props) =>
    props.display ? props.theme.color.primary : "none"};
  border-width: ${(props) => (props.display ? "1px" : "0")};
`;

export default Button;
