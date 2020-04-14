import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_WEBAPI_ENDPOINT,
    fetchOptions: {
      credentials: "include"
    }
  })
});

const Layout = props => {
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
