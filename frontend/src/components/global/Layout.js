import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import nprogress from "nprogress";
import "../../styles/nprogress.css";

import Header from "./Header";
import Footer from "./Footer";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import Meta from "./Meta";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_API_ENDPOINT,
    fetchOptions: {
      credentials: "include",
    },
  }),
});

const Layout = ({ children, title }) => {
  const history = useHistory();

  

  useEffect(() => {
    history.listen((location) => {
      nprogress.start();
      setTimeout(() => {
        nprogress.done();
      }, 750);
    });

    
  }, [history]);

  const opacity = {
    initial: { x: -10, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 10, opacity: 0 },
  };

  return (
    <ApolloProvider client={client}>
      <Container>
        <Meta title={title} />
        <Header history={history} />
        <AnimatePresence exitBeforeEnter>
          <Content  initial="initial"
            animate="animate"
            exit="exit"
            variants={opacity}>{children}</Content>
        </AnimatePresence>
        <Footer />
      </Container>
    </ApolloProvider>
  );
};

const Container = styled(motion.div)`
  display: grid;
`;

const Content = styled(motion.div)`
  padding: ${({ theme }) =>
    `calc(${theme.pagePaddingH}/ 2 + 126px) ${theme.pagePaddingW} calc(${theme.pagePaddingH}/ 2)`};
`;

export default Layout;
