import React from "react";
import styled from "styled-components";
import Header, { SimpleHeader } from "./Header";
import Footer from "./Footer";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

import { endpoint, prodEndpoint } from "../../config.js";

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
  return (
    <ApolloProvider client={client}>
      <Container>
        <SimpleHeader />
        <Content>{props.children}</Content>
        <Footer />
      </Container>
    </ApolloProvider>
  );
};

const Container = styled.div``;

const Content = styled.div`
  padding: 5%;
  width: 100%;
`;

export default Layout;
