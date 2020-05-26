import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import ImageContainer from "../components/applicationComponents/UI/ImageContainer";
import { appContext } from "../context/context";
import RelatedItem from "../components/applicationComponents/UI/RelatedItem";
import Spinner from "../components/UI/Spinner";

const GLASS_QUERY = gql`
  query GLASS_QUERY($product: ID) {
    glassesConnection(where: { Id: $product }) {
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
          ParentGlassFamilyAbbreviation {
            Id
            Name
            GlassType
            PrivacyRating
            AvailableFeatures
            AvailableDividedLiteTypes
            Description
            ImageUrl
          }
          DividedLiteType {
            Name
            Abbreviation
            GrilleColorCanBeVisualized
          }
          GlassFeatures {
            Name
          }
          AllCamingOptions {
            Id
            Name
            ImageUrl
          }
          GrilleColors {
            Id
            Name
            ImageUrl
          }
          ImpactAvailable
          GlassAssociation {
            Id
            Association
          }
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

const ProductGlass = ({ match }) => {
  const { store } = useContext(appContext);
  const [info, setInfo] = useState();
  const { data, loading } = useQuery(GLASS_QUERY, {
    variables: {
      product: match.params.id,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!loading && data.glassesConnection !== undefined) {
      setInfo({ ...data.glassesConnection.edges[0].node });
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
        <h6>
          GlassAssociation: <span>{info.GlassAssociation.Association}</span>
        </h6>
        <SubLevel>
          <h5>Glass Family</h5>
          <h6>
            Name: <span> {info.ParentGlassFamilyAbbreviation.Name}</span>
          </h6>
          <h6>
            Glass Type:{" "}
            <span> {info.ParentGlassFamilyAbbreviation.GlassType}</span>
          </h6>
          <h6>
            Privacy Rating:{" "}
            <span> {info.ParentGlassFamilyAbbreviation.PrivacyRating}</span>
          </h6>
          {info.ParentGlassFamilyAbbreviation.AvailableDividedLiteTypes.length >
            0 && (
            <SubLevel>
              <h5>Available Divided Lite Types</h5>
              <Horizontal>
                {info.ParentGlassFamilyAbbreviation.AvailableDividedLiteTypes.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </Horizontal>
            </SubLevel>
          )}
          {info.ParentGlassFamilyAbbreviation.AvailableFeatures.length > 0 && (
            <SubLevel>
              <h5>Available Divided Lite Types</h5>
              <Horizontal>
                {info.ParentGlassFamilyAbbreviation.AvailableFeatures.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </Horizontal>
            </SubLevel>
          )}
        </SubLevel>

        <SubLevel>
          <h5>Divided Lite Type</h5>
          <h6>
            Name: <span> {info.DividedLiteType.Name}</span>
          </h6>
          <h6>
            Grille Color Can Be Visualized:{" "}
            <span>
              {" "}
              {JSON.stringify(info.DividedLiteType.GrilleColorCanBeVisualized)}
            </span>
          </h6>
        </SubLevel>

        {info.GlassFeatures.length > 0 && (
          <SubLevel>
            <h5>Glass Features</h5>
            <Horizontal>
              {info.GlassFeatures.map((item, index) => (
                <div key={index}>
                  <h6>
                    Name: <span> {item.Name}</span>
                  </h6>
                </div>
              ))}
            </Horizontal>
          </SubLevel>
        )}

        {info.AllCamingOptions.length > 0 && (
          <SubLevel>
            <h5>All Caming Options</h5>
            <Horizontal>
              {info.AllCamingOptions.map((item, index) => (
                <div key={index}>
                  {item.ImageUrl && (
                    <ImageContainer alt={item.Name} src={item.ImageUrl} />
                  )}
                  <h6>
                    Name: <span> {item.Name}</span>
                  </h6>
                </div>
              ))}
            </Horizontal>
          </SubLevel>
        )}

        {info.GrilleColors.length > 0 && (
          <SubLevel>
            <h5>Grille Colors</h5>
            <Horizontal>
              {info.GrilleColors.map((item, index) => (
                <div key={index}>
                  {item.ImageUrl && (
                    <ImageContainer alt={item.Name} src={item.ImageUrl} />
                  )}
                  <h6>
                    Name: <span> {item.Name}</span>
                  </h6>
                </div>
              ))}
            </Horizontal>
          </SubLevel>
        )}
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

export default ProductGlass;
