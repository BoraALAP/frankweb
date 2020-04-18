import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";

import styled from "styled-components";
import appContext from "../../context/context";

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
        }
      }
    }
  }
`;

const DisplayAll = ({ nextStep, prevStep }, props) => {
  const { store, dispatch } = useContext(appContext);

  const { data, loading, error, fetchMore, networkStatus } = useQuery(
    DOOR_QUERY,
    {
      variables: {
        first: 12
      },
      notifyOnNetworkStatusChange: true
    }
  );
  console.log(error);

  if (!loading) {
    console.log(data.doorsConnection.edges.length);
    console.log(data, networkStatus);
  }

  const handleMore = e => {
    fetchMore({
      query: DOOR_QUERY,
      variables: {
        first: 12,
        after: data.doorsConnection.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }

        return {
          doorsConnection: {
            edges: [
              ...previousResult.doorsConnection.edges,
              ...fetchMoreResult.doorsConnection.edges
            ],
            pageInfo: fetchMoreResult.doorsConnection.pageInfo,
            __typename: "DoorConnection"
          }
        };
      }
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
  }
`;

export default DisplayAll;
