import React from "react";
import styled from "styled-components";

const Box = (props) => {
  return <Container>{props.children}</Container>;
};

const Container = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: ${({ theme }) => theme.boxPadding};
  border-radius: ${({ theme }) => theme.boxRadius};
  width: fit-content;
  height: fit-content;
`;

export default Box;
