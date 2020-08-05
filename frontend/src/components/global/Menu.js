import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MenuImage from "../../assets/images/menu.jpg";
import { motion } from "framer-motion";

const Menu = (props) => {
  const opacity = {
    initial: { x: -10, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 10, opacity: 0 },
  };

<<<<<<< HEAD
  return (
    <Container
      initial={{ y: "-100vh" }}
      animate={{ y: "0vh" }}
      transition={{ duration: 0.25 }}
      exit={{ y: "-100vh" }}
      key="container"
    >
      <Left
        initial="initial"
        animate="animate"
        exit="exit"
        variants={opacity}
        transition={{ delay: 0.35, duration: 0.75 }}
      >
        <ImgContainer src={MenuImage} />
      </Left>
      <Right
        initial="initial"
        animate="animate"
        exit="exit"
        variants={opacity}
        transition={{ delay: 0.65, duration: 0.75 }}
      >
        <Top>
          <Link to="/brochure/windows">Windows</Link>
          <Link to="/brochure/doors">Doors</Link>
          <Link to="/brochure/patio">Patio Doors</Link>
          <HR />
        </Top>
        <Mid>
          <Link to="/sub/frank">Who is Frank?</Link>
          <Link to="/sub/imagine">Imagine</Link>
          <Link to="/sub/make">Make</Link>
          <Link to="/sub/learn">Learn</Link>
          <Link to="/dealerFinder">Find a Dealer</Link>
        </Mid>
        <Bottom>
          <Link to="/contactUs">Contact Us</Link>
          <Link to="/dealerLogin">Dealer Login</Link>
          
        </Bottom>
      </Right>
    </Container>
=======
console.log(props.me);
  return (
    <AnimatePresence exitBeforeEnter>
      {props.open && (
        <Container
          initial={{ y: "-100vh" }}
          animate={{ y: "0vh" }}
          transition={{ duration: 0.25 }}
          exit={{ y: "-100vh" }}
          key="container"
        >
          <Left
            initial="initial"
            animate="animate"
            exit="exit"
            variants={opacity}
            transition={{ delay: 0.35, duration: 0.75 }}
          >
            <ImgContainer src={MenuImage} />
          </Left>
          <Right
            initial="initial"
            animate="animate"
            exit="exit"
            variants={opacity}
            transition={{ delay: 0.65, duration: 0.75 }}
          >
            <Top>
              <Link to="/brochure/windows">Windows</Link>
              <Link to="/brochure/doors">Doors</Link>
              <Link to="/brochure/patio">Patio Doors</Link>
            </Top>
            <Mid>
              <Link to="/sub/frank">Who is Frank?</Link>
              <Link to="/sub/imagine">Imagine</Link>
              <Link to="/sub/make">Make</Link>
              <Link to="/sub/learn">Learn</Link>
            </Mid>
            <Bottom>
              <Link to="/contactUs">Contact Us</Link>
              <Link to="/user/account">{ props.me ? "Account" : "Dealer Login" }</Link>
              <Link to="/dealerFinder">Find a Dealer</Link>
            </Bottom>
          </Right>
        </Container>
      )}
    </AnimatePresence>
>>>>>>> findingfix
  );
};

const Container = styled(motion.div)`
  display: grid;
  grid-gap: 3.5rem;
  position: absolute;
  background-color: ${({ theme }) => theme.color.bg};

  top: 0;
  padding: 160px 5vw 5vh;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;

  @media (min-width: 768px) {
    grid-template-columns: auto 25vw;
  }
`;

const Left = styled(motion.div)`
  display: none;
  @media (min-width: 768px) {
    display: grid;
  }
`;

const ImgContainer = styled.div`
  background-image: ${(props) => `url(${props.src})`};
  background-position: center center;
  background-size: cover;
  height: calc(90vh - 160px);
`;
const Right = styled(motion.div)`
  display: grid;
  grid-gap: 3.5rem;
  align-items: start;
  align-content: start;

  @media (min-width: 768px) {
    align-content: space-between;
    height: calc(90vh - 160px);
  }
`;

const Top = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const Mid = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const Bottom = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.primary};
`;

export default Menu;
