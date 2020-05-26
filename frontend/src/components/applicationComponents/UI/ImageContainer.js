import React, { useContext } from "react";
import styled from "styled-components";
import { appContext } from "../../../context/context";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageContainer = ({ src, alt = "image", big, small, med }) => {
  const { store } = useContext(appContext);

  if (big) {
    return <BigContainer alt={alt} src={`${store.imgSrc}${src}`} />;
  } else if (med) {
    return <MediumContainer alt={alt} src={`${store.imgSrc}${src}`} />;
  } else {
    return <SmallContainer alt={alt} src={`${store.imgSrc}${src}`} />;
  }
};

const BigContainer = styled(LazyLoadImage)`
  display: grid;
  max-height: 238px;
  max-width: 100%;
`;
const MediumContainer = styled(LazyLoadImage)`
  display: grid;
  max-height: 10em;
  max-width: 100%;
`;
const SmallContainer = styled(LazyLoadImage)`
  display: grid;
  width: 3.5em;
  height: 3.5em;
`;

export default ImageContainer;
