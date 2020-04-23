import React, { useContext } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

import appContext from "../context/context";

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
  const { store, dispatch } = useContext(appContext);

  const { data, loading, error, fetchMore, networkStatus } = useQuery(
    DOOR_QUERY,
    {
      variables: {
        searchQuery: store.search,
        first: 12,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  console.log(error);
  console.log(data);

  const handleMore = (e) => {
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

  if (!data) {
    return <h2>Loading!</h2>;
  }

  return (
    <Container>
      <ProductContainer>
        {data.doorsConnection.edges.map(({ node }, index) => (
          <div key={index}>
            <img src={`${store.imgSrc}${node.ImageUrl.split(".com").pop()}`} />
            <h5>{node.StyleNumber}</h5>
          </div>
        ))}
      </ProductContainer>

      <ProductContainer>
        {data.glassesConnection.edges.map(({ node }, index) => (
          <div key={index}>
            <img src={`${store.imgSrc}${node.ImageUrl.split(".com").pop()}`} />
            <h5>{node.Name}</h5>
          </div>
        ))}
      </ProductContainer>

      <ProductContainer>
        {data.transomsConnection.edges.map(({ node }, index) => (
          <div key={index}>
            <img src={`${store.imgSrc}${node.ImageUrl.split(".com").pop()}`} />
            <h5>{node.StyleNumber}</h5>
          </div>
        ))}
      </ProductContainer>

      <ProductContainer>
        {data.sidelitesConnection.edges.map(({ node }, index) => (
          <div key={index}>
            <img src={`${store.imgSrc}${node.ImageUrl.split(".com").pop()}`} />
            <h5>{node.StyleNumber}</h5>
          </div>
        ))}
      </ProductContainer>

      <button onClick={handleMore}>More</button>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);

  img {
    max-height: 238px;
    max-width: 200px;
  }
`;

export default SearchResult;
