import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import ImageContainer from "../components/applicationComponents/UI/ImageContainer";
import { appContext } from "../context/context";
import RelatedItem from "../components/applicationComponents/UI/RelatedItem";
import Spinner from "../components/UI/Spinner";

const GLASS_FAMILY_QUERY = gql`
  query GLASS_FAMILY_QUERY($product: ID) {
    glassFamiliesConnection(where: { Id: $product }) {
      aggregate {
        count
      }
      edges {
        cursor
        node {
          __typename
          Id
          Name
          Abbreviation
          GlassType
          BigImageUrl
          ImageUrl
          Doors {
            Id
            StyleNumber
            ImageUrl
          }
          Sidelites {
            Id
            StyleNumber
            ImageUrl
            __typename
          }
          Transoms {
            Id
            StyleNumber
            ImageUrl
            __typename
          }
        }
      }
    }
  }
`;

const ProductGlassFamily = ({ match }) => {
  const { store } = useContext(appContext);
  const [info, setInfo] = useState();
  const { data, loading } = useQuery(GLASS_FAMILY_QUERY, {
    variables: {
      product: match.params.id,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!loading && data.glassFamiliesConnection !== undefined) {
      setInfo({ ...data.glassFamiliesConnection.edges[0].node });
    }
  }, [loading]);

  if (info === undefined) {
    return <Spinner />;
  }

  return (
    <Container>
      <TopBar />
      <Information>
        <ImageContainer alt={info.Name} src={info.ImageUrl} big />
        <h4>Name: {info.Name}</h4>
      </Information>
      <Listing>
        {info.Doors.length > 0 && (
          <SubLevel>
            <h5>Related Doors</h5>
            <Related>
              {info.Doors.map((item) => (
                <RelatedItem
                  key={item.Id}
                  StyleNumber={item.StyleNumber}
                  ImageUrl={item.ImageUrl}
                  Id={item.Id}
                  Type={item.__typename}
                />
              ))}
            </Related>
          </SubLevel>
        )}
        {info.Sidelites.length > 0 && (
          <SubLevel>
            <h5>Related Sidelites</h5>

            <Related>
              {info.Sidelites.map((item, index) => (
                <RelatedItem
                  key={item.Id}
                  StyleNumber={item.StyleNumber}
                  ImageUrl={item.ImageUrl}
                  Id={item.Id}
                  Type={item.__typename}
                />
              ))}
            </Related>
          </SubLevel>
        )}
        {info.Transoms.length > 0 && (
          <SubLevel>
            <h5>Related Transoms</h5>

            <Related>
              {info.Transoms.map((item, index) => (
                <RelatedItem
                  key={item.Id}
                  StyleNumber={item.StyleNumber}
                  ImageUrl={item.ImageUrl}
                  Id={item.Id}
                  Type={item.__typename}
                />
              ))}
            </Related>
          </SubLevel>
        )}
      </Listing>
    </Container>
  );
};

const Container = styled.div``;

const TopBar = styled.div``;

const Information = styled.div``;

const Listing = styled.div``;

const Related = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2vw;
  width: fit-content;
`;

const SubLevel = styled.div`
  margin-top: 2.5em;
  h5 {
    margin-bottom: 16px;
  }
`;

const Horizontal = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(3, auto);
  padding-inline-start: 1em;
  justify-content: start;
  grid-gap: 24px;
  li {
    list-style: none;
  }
`;

export default ProductGlassFamily;
