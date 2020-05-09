import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ProductItem from "../UI/ProductItem";
import appContext from "../../../context/context";
import Selector from "../UI/Selector";
import Spinner from "../UI/Spinner";
import Button from "../UI/Button";

const PRODUCT_QUERY = gql`
  query door(
    $location: ID
    $size: String
    $sizeCategory: String
    $texture: String
    $first: Int
    $after: String
  ) {
    doorsConnection(
      where: {
        OR: {
          AvailableSizes_some: { Size_contains: $size }
          LocationOnHouse_some: { Id_contains: $location }
          GlassSizeCategory_contains: $sizeCategory
          DoorCollection: { Surface_contains: $texture }
        }
      }
      first: $first
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      aggregate {
        count
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

    fullCount: doorsConnection(
      where: {
        OR: {
          AvailableSizes_some: { Size_contains: $size }
          LocationOnHouse_some: { Id_contains: $location }
          GlassSizeCategory_contains: $sizeCategory
          DoorCollection: { Surface_contains: $texture }
        }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const Success = ({ nextStep, prevStep, beginning }, props) => {
  const { store, dispatch } = useContext(appContext);

  const { data, loading, fetchMore } = useQuery(PRODUCT_QUERY, {
    variables: {
      location: store.steps.location.value,
      size: store.steps.size.value,
      sizeCategory: store.steps.glassSize.value,
      texture: store.steps.texture.value,
      first: 12,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (data === undefined || !data) {
    return <Spinner />;
  }

  const handleMore = (e) => {
    fetchMore({
      query: PRODUCT_QUERY,
      variables: {
        first: 12,
        after: data.doorsConnection.pageInfo.endCursor,
        location: store.steps.location.value,
        size: store.steps.size.value,
        sizeCategory: store.steps.glassSize.value,
        texture: store.steps.texture.value,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }

        return {
          doorsConnection: {
            aggregate: {
              ...fetchMoreResult.doorsConnection.aggregate,
              count:
                previousResult.doorsConnection.aggregate.count +
                fetchMoreResult.doorsConnection.aggregate.count,
            },
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

  return (
    <Container>
      <SubLevel>
        <h2>
          Result: {data.doorsConnection.aggregate.count} Out of{" "}
          {data.fullCount.aggregate.count} options
        </h2>
        <Related>
          {data.doorsConnection.edges.map(({ node }) => (
            <ProductItem
              key={node.Id}
              StyleNumber={node.StyleNumber}
              ImageUrl={node.ImageUrl}
              Id={node.Id}
              Type={node.__typename}
            />
          ))}
        </Related>
      </SubLevel>
      <Button
        onClick={handleMore}
        disabled={!data.doorsConnection.pageInfo.hasNextPage}
      >
        More
      </Button>
      <Selector onClick={beginning}>Start Over</Selector>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 32px;
`;

const Related = styled.div`
  display: grid;
  grid-gap: 2vw;
  width: fit-content;
  grid-template-columns: repeat(4, auto);
  grid-gap: 2vw;

  img {
    max-height: 238px;
  }
`;

const SubLevel = styled.div`
  margin-top: 2.5em;
  h2 {
    margin-bottom: 16px;
  }
`;

export default Success;
