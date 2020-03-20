import React from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import Home from "./pages/Home";
import Doors from "./pages/Doors";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_API_ENDPOINT,
    fetchOptions: {
      credentials: "include"
    }
  })
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Doors />
    </ApolloProvider>
  );
};

export default App;
