import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Primary = (props) => {
  return (
    <>
      {props.link ? (
        <Link to={props.to}>
          <PrimaryS {...props}>{props.children} </PrimaryS>
        </Link>
      ) : (
        <PrimaryS {...props}>{props.children} </PrimaryS>
      )}
    </>
  );
};

const Secondary = (props) => {
  return (
    <>
      {props.link ? (
        <Link to={props.to}>
          <SecondaryS {...props}>{props.children} </SecondaryS>
        </Link>
      ) : (
        <SecondaryS {...props}>{props.children} </SecondaryS>
      )}
    </>
  );
};

const Tertiary = (props) => {
  return (
    <>
      {props.link ? (
        <Link to={props.to}>
          <TertiaryS {...props}>{props.children} </TertiaryS>
        </Link>
      ) : (
        <TertiaryS {...props}>{props.children} </TertiaryS>
      )}
    </>
  );
};

const Button = styled.button`
  text-align: center;
  font-weight: 500;
  min-height: 32px;
  width: 100%;
  margin: auto;
  border-color: none;
  border-width: 0;
  padding: ${({ theme }) => theme.buttonPadding};
  border-radius: ${({ theme }) => theme.boxRadius};
`;

const PrimaryS = styled(Button)`
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.white};
`;

const SecondaryS = styled(Button)`
  background-color: none;
  color: ${(props) => props.theme.color.primary};
  border: 1px solid ${(props) => props.theme.color.primary};
`;

const TertiaryS = styled(Button)`
  background-color: inherit;
  color: ${(props) => props.theme.color.primary};
`;

export { Primary, Secondary, Tertiary };
