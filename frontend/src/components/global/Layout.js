import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

import { endpoint, prodEndpoint } from "../../config.js";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: prodEndpoint,
    fetchOptions: {
      credentials: "include"
    }
  })
});
console.log(process.env.NODE_ENV);
const Layout = props => {
  console.log(process.env.NODE_ENV);
  return (
    <ApolloProvider client={client}>
      <Container>
        <Header />
        <Content>{props.children}</Content>
        <Footer />
      </Container>
    </ApolloProvider>
  );
};

const Container = styled.div``;

const Content = styled.div`
  padding: 5%;
`;

export default Layout;
