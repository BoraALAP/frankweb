import React from "react";
import styled from "styled-components";
import ImageContainer from "../UI/ImageContainer";

const ImgContainer = (props) => {
  return (
    <Container>
      <ImageContainer alt={props.alt} src={props.src} big />
      <h4>Style Number: {props.name}</h4>
    </Container>
  );
};

const Container = styled.div``;

export default ImgContainer;
