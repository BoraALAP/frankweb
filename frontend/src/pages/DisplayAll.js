import React from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
// import appContext from "../context/context";
import RelatedItem from "../components/applicationComponents/UI/RelatedItem";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";

const DOOR_QUERY = gql`
  query DOOR_QUERY($first: Int, $after: String) {
    doorsConnection(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          Id
          ImageUrl
          StyleNumber
          __typename
        }
      }
    }
  }
`;

const DisplayAll = (props) => {
  // const { store } = useContext(appContext);

  const { data, loading, fetchMore, networkStatus } = useQuery(DOOR_QUERY, {
    variables: {
      first: 12,
    },
    notifyOnNetworkStatusChange: true,
  });

  const handleMore = (e) => {
    fetchMore({
      query: DOOR_QUERY,
      variables: {
        first: 12,
        after: data.doorsConnection.pageInfo.endCursor,
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
        };
      },
    });
  };

  if (!data) {
    return <Spinner />;
  }

  return (
    <Container>
      <ProductContainer>
        {data.doorsConnection.edges.map(({ node }, index) => (
          <RelatedItem
            key={index}
            StyleNumber={node.StyleNumber}
            Name={node.Name}
            ImageUrl={node.ImageUrl}
            Id={node.Id}
            Type={node.__typename}
          />
        ))}
      </ProductContainer>

      <Button
        onClick={handleMore}
        disabled={!data.doorsConnection.pageInfo.hasNextPage}
      >
        More
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-gap: 2em;
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 2vw;
`;

export default DisplayAll;
