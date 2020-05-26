import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import ImageContainer from "../components/applicationComponents/UI/ImageContainer";

import RelatedItem from "../components/applicationComponents/UI/RelatedItem";
import { appContext } from "../context/context";
import Spinner from "../components/UI/Spinner";

const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY($productid: ID) {
    sidelitesConnection(where: { Id: $productid }) {
      aggregate {
        count
      }
      edges {
        cursor
        node {
          __typename
          Id
          StyleNumber
          ArchitecturalStyle {
            Style
          }
          DoorCollection {
            Id
            Name
            Abbreviation
            Material
            Surface
            Paintable
            Stainable
          }
          DoorLine {
            Id
            Name
            Abbreviation
          }
          ProductLine
          DoorType
          FrameProfiles {
            Id
            Name
            ImageUrl
            CamingOptions {
              Id
              Name
              GlassFamilyAbbreviation
              ImageUrl
            }
          }
          ParentGlassFamilyAbbreviation {
            Id
            Name
            GlassType
            PrivacyRating
            AvailableFeatures
            AvailableDividedLiteTypes
            Description
            ImageUrl
            BigImageUrl
          }
          GlassFamilyAbbreviation {
            Id
            Name
            GlassType
            DividedLiteType {
              Name
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
          }
          LiteQuantity
          LocationOnHouse {
            Id
            Name
            ImageUrl
            IconUrl
          }
          AvailableSizeDetails
          AvailableSizes {
            Size
          }
          DefaultSize {
            Size
          }
          VisualizedHeight
          VisualizedWidth
          StyleGroups
          StyleShape {
            Id
            Name
            TopCut
          }
          RatingEligibility {
            Name
          }
          LaunchYear
          RecentlyLaunched
          GlassSizeCategory
          SupportedAccessories
          DefaultSidelite
          DefaultTransom
          DefaultGlassWidth
          AbstractPrice
          SOSPrice
          MDSPrice
          LowesStocked
          GlassType
          GlassDesign
          GlassFeatures
          DefaultImageName
          ImageUrl
          Ordinal
          GlassAssociation {
            Id
            Association
          }
          IsLimitedAvailability
          LimitedAvailabilityCategories
          ProductTrends
          DefaultDoorSurroundStyleNumber
          GrainProfile
          CurrentYearTrends
          LydDisplay
          LydDefaultFinishId
          LydAvailableFinishIds
          LydGlassCategory
          LydDisplayOrder
          LydDisplayCaming
          FacetMaterial
          FacetRecentlyLaunched
          RelatedStyleID
          AllowsHandlesets
          IsFlushGlazed

          Doors {
            Id
            StyleNumber
            ImageUrl
            __typename
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

const TemplateSidelite = ({ match, location }, props) => {
  const { store } = useContext(appContext);
  const [info, setInfo] = useState();

  const { data, loading } = useQuery(PRODUCT_QUERY, {
    variables: {
      productid: match.params.id,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!loading && data.sidelitesConnection !== undefined) {
      setInfo({ ...data.sidelitesConnection.edges[0].node });
    }
  }, [loading]);

  if (info === undefined) {
    return <Spinner />;
  }

  const show = (title, show) => {
    return (
      show && (
        <h6>
          {title}: <span>{show}</span>
        </h6>
      )
    );
  };

  return (
    <Container>
      <TopBar />
      <Information>
        <ImageContainer alt={info.Name} src={info.ImageUrl} big />

        <h4>Style Number: {info.StyleNumber}</h4>
        {info.ArchitecturalStyle.length > 0 && (
          <div>
            <h6>Architectural Style:</h6>
            <Horizontal>
              {info.ArchitecturalStyle.map((item, index) => (
                <li key={index}>{item.Style}</li>
              ))}
            </Horizontal>
          </div>
        )}
        {info.LocationOnHouse.length > 0 && (
          <div>
            <h6>Location On House - Name:</h6>
            <Horizontal>
              {info.LocationOnHouse.map((item, index) => (
                <li key={index}>{item.Name}</li>
              ))}
            </Horizontal>
          </div>
        )}
        {show("Default Size", info.DefaultSize.Size)}
        {show("Default Glass Width", info.DefaultGlassWidth)}
        {info.AvailableSizes.length > 0 && (
          <div>
            <h6>Available Sizes:</h6>
            <Horizontal>
              {info.AvailableSizes.map((item, index) => (
                <li key={index}>{item.Size}</li>
              ))}
            </Horizontal>
          </div>
        )}
        {show("Lite Quantity", JSON.stringify(info.LiteQuantity))}
        {show("Visualized Height", info.VisualizedHeight)}
        {show("Visualized Width", info.VisualizedWidth)}
        {show("Launch Year", JSON.stringify(info.LaunchYear))}

        {show("Glass Size Category", info.GlassSizeCategory)}
        {show("Default Sidelite", info.DefaultSidelite)}

        {show("Default Transom", info.DefaultTransom)}

        {show("Abstract Price", info.AbstractPrice)}

        {show("SOS Price", JSON.stringify(info.SOSPrice))}
        {show("MDS Price", JSON.stringify(info.MDSPrice))}

        {show("Lowes Stocked", info.LowesStocked)}

        {show("Glass Type", info.GlassType)}

        {show("Glass Design", info.GlassDesign)}

        {show("Default Image Name", info.DefaultImageName)}

        {show("Is Limited Availability", info.IsLimitedAvailability)}

        {show("Product Trends", info.ProductTrends)}

        {show(
          "Default Door Surround Style Number",
          info.DefaultDoorSurroundStyleNumber
        )}

        {show("Grain Profile", info.GrainProfile)}

        {show("Current Year Trends", info.CurrentYearTrends)}

        {show("Lyd Display", info.LydDisplay)}

        {show("Lyd Default FinishId", info.LydDefaultFinishId)}
        {show("Lyd Glass Category", info.LydGlassCategory)}

        {show("Lyd Display Order", info.LydDisplayOrder)}

        {show("Lyd Display Caming", info.LydDisplayCaming)}

        {show("Facet Material", info.FacetMaterial)}

        {show("Facet Recently Launched", info.FacetRecentlyLaunched)}

        {show("Related Style ID", info.RelatedStyleID)}

        {show("Allows Handle sets", JSON.stringify(info.AllowsHandlesets))}

        {show("Is FlushGlazed", JSON.stringify(info.IsFlushGlazed))}

        {show("Ordinal", info.Ordinal)}

        <Section>
          <h4>Door Collection</h4>
          {show("Name", info.DoorCollection.Name)}
          {show("Material", info.DoorCollection.Material)}
          {show("Surface", info.DoorCollection.Surface)}
          {show("Paintable", JSON.stringify(info.DoorCollection.Paintable))}
          {show("Stainable", JSON.stringify(info.DoorCollection.Stainable))}
        </Section>

        <Section>
          <h4>Door Line</h4>
          {show("Door Line", info.DoorLine.Name)}
        </Section>

        <Section>
          <h4>Glass Parent</h4>
          <ImageContainer
            alt={info.ParentGlassFamilyAbbreviation.Name}
            src={
              info.ParentGlassFamilyAbbreviation.BigImageUrl
                ? info.ParentGlassFamilyAbbreviation.BigImageUrl
                : info.ParentGlassFamilyAbbreviation.ImageUrl
            }
            med={info.ParentGlassFamilyAbbreviation.BigImageUrl}
          />
          {show("Glass Family", info.ParentGlassFamilyAbbreviation.Name)}
          {show("Glass Type", info.ParentGlassFamilyAbbreviation.GlassType)}
          {show(
            "Privacy Rating",
            JSON.stringify(info.ParentGlassFamilyAbbreviation.PrivacyRating)
          )}
        </Section>

        <Section>
          <h4>Glass</h4>
          {info.GlassFamilyAbbreviation.ImageUrl && (
            <ImageContainer
              alt={info.Name}
              src={info.GlassFamilyAbbreviation.ImageUrl}
            />
          )}
          {show("Name", info.GlassFamilyAbbreviation.Name)}
          {show(
            "Impact Available",
            JSON.stringify(info.GlassFamilyAbbreviation.ImpactAvailable)
          )}
          {show("Glass Type", info.GlassFamilyAbbreviation.GlassType)}
          {show(
            "Glass Association Name",
            info.GlassFamilyAbbreviation.GlassAssociation.Association
          )}

          <SubLevel>
            <h5>Divided Lite Type</h5>
            {show("Name", info.GlassFamilyAbbreviation.DividedLiteType.Name)}
          </SubLevel>

          {info.GlassFamilyAbbreviation.GlassFeatures.length > 0 && (
            <SubLevel>
              <h5>Glass Features</h5>
              <Horizontal>
                {info.GlassFamilyAbbreviation.GlassFeatures.map(
                  (item, index) => (
                    <div key={index}>{show("Name", item.Name)}</div>
                  )
                )}
              </Horizontal>
            </SubLevel>
          )}

          {info.GlassFamilyAbbreviation.AllCamingOptions.length > 0 && (
            <SubLevel>
              <h5>All Caming Options</h5>
              <Horizontal>
                {info.GlassFamilyAbbreviation.AllCamingOptions.map(
                  (item, index) => (
                    <div key={index}>
                      <ImageContainer alt={item.Name} src={item.ImageUrl} />

                      {show("Name", item.Name)}
                    </div>
                  )
                )}
              </Horizontal>
            </SubLevel>
          )}
          {info.GlassFamilyAbbreviation.GrilleColors.length > 0 && (
            <SubLevel>
              <h5>Grille Colors</h5>
              {show("Name", info.GlassFamilyAbbreviation.GrilleColors.Name)}
              {info.GlassFamilyAbbreviation.GrilleColors.ImageUrl && (
                <ImageContainer
                  alt={info.Name}
                  src={info.GlassFamilyAbbreviation.GrilleColors.ImageUrl}
                />
              )}
            </SubLevel>
          )}
        </Section>

        {info.AvailableSizeDetails.length > 0 && (
          <SubLevel>
            <h5>Available Size Details:</h5>
            {info.AvailableSizeDetails.map((item, index) => (
              <h6>
                <span>{item}</span>
              </h6>
            ))}
          </SubLevel>
        )}

        {info.StyleGroups.length > 0 && (
          <SubLevel>
            <h5>Style Groups:</h5>
            {info.StyleGroups.map((item, index) => (
              <p key={index}> {item} </p>
            ))}
          </SubLevel>
        )}

        {info.RatingEligibility.length > 0 && (
          <SubLevel>
            <h5>RatingEligibility</h5>
            <Horizontal>
              {info.RatingEligibility.map((item, index) => (
                <li key={index}>{item.Name}</li>
              ))}
            </Horizontal>
          </SubLevel>
        )}

        {info.SupportedAccessories.length > 0 && (
          <SubLevel>
            <h5>Supported Accessories</h5>
            <Horizontal>
              {info.SupportedAccessories.map((item, index) => (
                <li key={index}>{item.Name}</li>
              ))}
            </Horizontal>
          </SubLevel>
        )}

        {info.LydAvailableFinishIds.length > 0 && (
          <SubLevel>
            <h5>Lyd Available Finish Ids</h5>
            <Horizontal>
              {info.info.LydAvailableFinishIds.map((item, index) => (
                <h6 key={index}>
                  <li key={index}>{item.Name}</li>
                </h6>
              ))}
            </Horizontal>
          </SubLevel>
        )}

        <SubLevel>
          <h5>Style Shape</h5>
          <div>
            {show("Name", info.StyleShape.Name)}
            {show("Top Cut", JSON.stringify(info.StyleShape.TopCut))}
          </div>
        </SubLevel>
        {show("GlassAssociation Name", info.GlassAssociation.GlassAssociation)}
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

const Information = styled.div`
  display: grid;
`;

const Listing = styled.div`
  display: grid;
  grid-gap: 16px;
`;

const Related = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2vw;
  width: fit-content;
`;

const Horizontal = styled.ul`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  grid-gap: 24px;
  padding-inline-start: 1em;
  li {
    list-style: none;
  }
`;

const Section = styled.div`
  margin-top: 2.5em;
`;

const SubLevel = styled.div`
  margin-top: 2.5em;
  display: grid;
  grid-gap: 8px;
`;

export default TemplateSidelite;
