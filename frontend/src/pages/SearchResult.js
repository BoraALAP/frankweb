import React, { useState, useContext } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

import appContext from "../context/context";
import Spinner from "../components/UI/Spinner";
import RelatedItem from "../components/applicationComponents/UI/RelatedItem";
import Button from "../components/UI/Button";

const DOOR_QUERY = gql`
  query DOOR_QUERY(
    $searchQuery: String
    $first: Int
    $afterDoor: String
    $afterTransom: String
    $afterSidelite: String
    $afterGlass: String
  ) {
    doorsConnection(
      where: { StyleNumber_contains: $searchQuery }
      first: $first
      after: $afterDoor
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          __typename
          Id
          StyleNumber
          ImageUrl
        }
      }
    }
    glassesConnection(
      where: { Name_contains: $searchQuery }
      first: $first
      after: $afterGlass
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          __typename
          Id
          Name
          ImageUrl
        }
      }
    }
    sidelitesConnection(
      where: { StyleNumber_contains: $searchQuery }
      first: $first
      after: $afterSidelite
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          __typename
          Id
          StyleNumber
          ImageUrl
        }
      }
    }
    transomsConnection(
      where: { StyleNumber_contains: $searchQuery }
      first: $first
      after: $afterTransom
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          __typename
          Id
          StyleNumber
          ImageUrl
        }
      }
    }
  }
`;

const SearchResult = (props) => {
  const tabs = [
    { name: "Doors", collection: "doorsConnection" },
    { name: "Transoms", collection: "transomsConnection" },
    { name: "Sidelites", collection: "sidelitesConnection" },
    { name: "Glasses", collection: "glassesConnection" },
  ];

  const [active, setActive] = useState(tabs[0].name);

  const { store } = useContext(appContext);

  const { data, loading, fetchMore } = useQuery(DOOR_QUERY, {
    variables: {
      searchQuery: store.search,
      first: 12,
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleMore = (collection) => {
    fetchMore({
      query: DOOR_QUERY,
      variables: {
        first: 12,
        afterDoor: data.doorsConnection.pageInfo.endCursor,
        afterGlass: data.glassesConnection.pageInfo.endCursor,
        afterSidelite: data.sidelitesConnection.pageInfo.endCursor,
        afterTransom: data.transomsConnection.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }

        return {
          doorsConnection: {
            edges: [
              ...previousResult.doorsConnection.edges,
              ...fetchMoreResult.doorsConnection.edges,
            ],
            pageInfo: fetchMoreResult.doorsConnection.pageInfo,
            __typename: "DoorConnection",
          },
          glassesConnection: {
            edges: [
              ...previousResult.glassesConnection.edges,
              ...fetchMoreResult.glassesConnection.edges,
            ],
            pageInfo: fetchMoreResult.glassesConnection.pageInfo,
            __typename: "GlassConnection",
          },
          sidelitesConnection: {
            edges: [
              ...previousResult.sidelitesConnection.edges,
              ...fetchMoreResult.sidelitesConnection.edges,
            ],
            pageInfo: fetchMoreResult.sidelitesConnection.pageInfo,
            __typename: "SideliteConnection",
          },
          transomsConnection: {
            edges: [
              ...previousResult.transomsConnection.edges,
              ...fetchMoreResult.transomsConnection.edges,
            ],
            pageInfo: fetchMoreResult.transomsConnection.pageInfo,
            __typename: "TransomConnection",
          },
        };
      },
    });
  };

  const handleDisplay = (target) => {
    setActive(target);
  };

  if (!data) {
    return <Spinner />;
  }

  return (
    <Container loading={loading}>
      <Tabs>
        {tabs.map((item, index) => {
          if (data[item.collection].edges.length > 0) {
            return (
              <Button
                key={index}
                onClick={() => handleDisplay(item.name)}
                display={active === item.name}
                disabled={active === item.name}
              >
                {item.name}
              </Button>
            );
          }
        })}
      </Tabs>

      {tabs.map((collection, index) => {
        if (
          data[collection.collection].edges.length > 0 &&
          active === collection.name
        ) {
          return (
            <ResultContainer key={index}>
              <Title>{collection.name}</Title>
              <ProductContainer>
                {data[collection.collection].edges.map(({ node }, index) => (
                  <RelatedItem
                    key={node.Id}
                    StyleNumber={node.StyleNumber}
                    Name={node.Name}
                    ImageUrl={node.ImageUrl}
                    Id={node.Id}
                    Type={node.__typename}
                  />
                ))}
              </ProductContainer>
              <Button onClick={() => handleMore(collection.collection)}>
                More
              </Button>
            </ResultContainer>
          );
        }
      })}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  opacity: ${(props) => (props.loading ? 0.5 : 1)};
`;

const Tabs = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2.5vw;
`;
const ResultContainer = styled.div`
  display: grid;
  grid-gap: 2em;
`;
const Title = styled.h2``;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 20vw);
  grid-gap: 2.5vw;
`;

const Fixed = styled.div`
  position: fixed;
  bottom: 20px;
  padding: 20px;
`;

export default SearchResult;