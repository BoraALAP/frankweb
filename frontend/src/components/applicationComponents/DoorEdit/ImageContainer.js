import React from "react";
import styled from "styled-components";
import ImageContainer from "../UI/ImageContainer";

const ImgContainer = (props) => {
  return (
    <Container>
      <ImgBox>
        <Top>
          {props.topSrc && (
            <ImageContainer alt={props.topAlt} src={props.topSrc} big />
          )}
        </Top>
        <Bottom>
          {props.sideSrc && (
            <ImageContainer
              alt={`left ${props.sideAlt}`}
              src={props.sideSrc}
              big
            />
          )}
          <ImageContainer alt={props.alt} src={props.src} big />
          {props.sideSrc && (
            <ImageContainer
              alt={`right ${props.sideAlt}`}
              src={props.sideSrc}
              big
            />
          )}
        </Bottom>
      </ImgBox>
      <h4>Style Number: {props.name}</h4>
    </Container>
  );
};

const Container = styled.div``;
const Top = styled.div``;
const Bottom = styled.div`
  display: grid;
  grid-auto-flow: column;
`;
const ImgBox = styled.div``;

export default ImgContainer;
