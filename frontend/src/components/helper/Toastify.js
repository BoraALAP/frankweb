import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Primary } from "../UI/Button";

const Toastify = (props) => {
  const [close, setClose] = useState(false);

  useEffect(() => {
    setClose(localStorage.getItem('toast'));
  }, [])
  

  const closeToast = () => {
    setClose(true);
    localStorage.setItem('toast',true);
  };

  return (
    <ToastContainerS active={close}>
      <Left>
        <h5>This website uses cookies</h5>
        <p>
          We use cookies to personalise content and ads, to provide social media
          features and to analyse our traffic. We also share information about
          your use of our site with our social media, advertising and analytics
          partners who may combine it with other information that you’ve
          provided to them or that they’ve collected from your use of their
          services.
        </p>
      </Left>
      <Right>
        <Primary onClick={closeToast}>Accept</Primary>
      </Right>
    </ToastContainerS>
  );
};

const ToastContainerS = styled.div`
  width: 100vw;
  bottom: 0;
  left: 0;
  position: fixed;
  padding: 2rem 5vw;
  display: ${(props) => (props.active ? "none" : "grid")};
  grid-auto-flow: column;
  border-top: ${({ theme }) => `1px solid ${theme.color.secondary}`};
  box-sizing: border-box;
  align-items: center;
  h5 {
    margin: 0;
  }
  p {
    max-width: 600px;
    margin: 0;
    color: ${({ theme }) => theme.color.grey};
  }
`;

const Left = styled.div`
  grid-gap: 0.5rem;
  display: grid;
`;

const Right = styled.div``;

export default Toastify;
