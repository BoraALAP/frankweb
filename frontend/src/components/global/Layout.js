import React, { useEffect } from "react";
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

import { endpoint, prodEndpoint } from "../../config.js";
import Meta from "./Meta";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: endpoint,
    fetchOptions: {
      credentials: "include",
    },
  }),
});

const Layout = (props) => {
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
        <Meta />
        <SimpleHeader />
        <Content>{props.children}</Content>

        <Footer />
      </Container>
    </ApolloProvider>
  );
};

const Container = styled.div`
  display: grid;
`;

const Content = styled.div`
  padding: 2.5vh 5vw;
`;

export default Layout;
