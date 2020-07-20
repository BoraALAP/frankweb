import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import nprogress from "nprogress";
import "../../styles/nprogress.css";

import Header, { SimpleHeader } from "./Header";
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

  return (
    <ApolloProvider client={client}>
      <Container>
        <Meta title={title} />
        <Header />
        <Content>{children}</Content>

        <Footer />
      </Container>
    </ApolloProvider>
  );
};

const Container = styled.div`
  display: grid;
`;

const Content = styled.div`
  padding: ${({ theme }) =>
    `calc(${theme.pagePaddingH}/ 2 + 126px) ${theme.pagePaddingW} calc(${theme.pagePaddingH}/ 2)`};
`;

export default Layout;
