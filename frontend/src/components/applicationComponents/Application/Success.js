import React, { useContext } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

import RelatedItem from "../UI/RelatedItem";
import { appContext } from "../../../context/context";
import Selector from "../UI/Selector";
import Spinner from "../../UI/Spinner";
import { Primary } from "../../UI/Button";

const PRODUCT_QUERY = gql`
  query door(
    $location: ID
    $size: ID
    $glassSize: ID
    $texture: String
    $glassFamily: ID
    $first: Int
    $after: String
  ) {
    fullCount: doorsConnection(
      where: {
        OR: {
          AvailableSizes_some: { Id_contains: $size }
          LocationOnHouse_some: { Id_contains: $location }
          DoorCollection: { Surface_contains: $texture }
          ParentGlassFamilyAbbreviation: { Id_contains: $glassFamily }
          GlassSizeCategory: { Id_contains: $glassSize }
        }
      }
    ) {
      aggregate {
        count
      }
    }
    doorsConnection(
      where: {
        OR: {
          AvailableSizes_some: { Id_contains: $size }
          LocationOnHouse_some: { Id_contains: $location }
          DoorCollection: { Surface_contains: $texture }
          ParentGlassFamilyAbbreviation: { Id_contains: $glassFamily }
          GlassSizeCategory: { Id_contains: $glassSize }
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
  }
`;

const Success = (props) => {
  const { appStore, appDispatch } = useContext(appContext);

  const { data, fetchMore } = useQuery(PRODUCT_QUERY, {
    variables: {
      location: appStore.location.id,
      size: appStore.size.id,
      glassSize: appStore.glassSize.id,
      texture:
        appStore.texture.value === "skipped" ? "" : appStore.texture.value,
      glassFamily: appStore.glassFamily.id,
      first: 12,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (data === undefined || !data) {
    return <Spinner />;
  }

  const resetStep = (props) => {
    appDispatch({
      type: "RESET_STEP",
    });
  };

  const handleMore = (e) => {
    fetchMore({
      query: PRODUCT_QUERY,
      variables: {
        first: 12,
        after: data.doorsConnection.pageInfo.endCursor,
        location: appStore.location.id,
        size: appStore.size.id,
        glassSize: appStore.glassSize.id,
        texture:
          appStore.texture.value === "skipped" ? "" : appStore.texture.value,
        glassFamily: appStore.glassFamily.id,
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

  if (data.doorsConnection.aggregate.count === 0) {
    return (
      <Container>
        <h2>
          Unfortunatly there is no door with your inqures. Please change some of
          the attributes
        </h2>
      </Container>
    );
  }

  return (
    <Container>
      <SubLevel>
        <h2>
          Result: {data.doorsConnection.aggregate.count} Out of{" "}
          {data.fullCount.aggregate.count} options
        </h2>
        <Related>
          {data.doorsConnection.edges.map(({ node }) => (
            <RelatedItem
              key={node.Id}
              StyleNumber={node.StyleNumber}
              ImageUrl={node.ImageUrl}
              Id={node.Id}
              Type={node.__typename}
              Link="selected"
            />
          ))}
        </Related>
      </SubLevel>
      <Primary
        onClick={handleMore}
        disabled={!data.doorsConnection.pageInfo.hasNextPage}
      >
        More
      </Primary>
      <Selector onClick={resetStep}>Start Over</Selector>
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
  grid-template-columns: repeat(4, auto);
  grid-gap: 2vw;
`;

const SubLevel = styled.div`
  margin-top: 2.5em;
  h2 {
    margin-bottom: 16px;
  }
`;

export default Success;
