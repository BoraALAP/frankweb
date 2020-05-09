import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import appContext from "../../../context/context";
import Box from "./Box";

const RelatedGlassItem = ({ item, Type = "glass" }) => {
  const { store } = useContext(appContext);
  return (
    <Box>
      <Container>
        <Link to={`/product/${Type}/${item.Id}`}>
          <SmallImage
            alt={item.Name}
            src={`${store.imgSrc}${item.ImageUrl.split(".com").pop()}`}
          />

          <h4>{item.Name}</h4>
          <SubLevel>
            <h5>Glass Family</h5>
            <h6>
              Name: <span> {item.ParentGlassFamilyAbbreviation.Name}</span>
            </h6>
            <h6>
              Glass Type:{" "}
              <span> {item.ParentGlassFamilyAbbreviation.GlassType}</span>
            </h6>
            <h6>
              Privacy Rating:{" "}
              <span> {item.ParentGlassFamilyAbbreviation.PrivacyRating}</span>
            </h6>
            <h6>
              Glass Type:{" "}
              <span> {item.ParentGlassFamilyAbbreviation.GlassType}</span>
            </h6>
          </SubLevel>

          <SubLevel>
            <h5>Divided Lite Type</h5>
            <h6>
              Name: <span> {item.DividedLiteType.Name}</span>
            </h6>
            <h6>
              Grille Color Can Be Visualized:{" "}
              <span>
                {" "}
                {JSON.stringify(
                  item.DividedLiteType.GrilleColorCanBeVisualized
                )}
              </span>
            </h6>
          </SubLevel>

          {item.GlassFeatures.length > 0 && (
            <SubLevel>
              <h5>Glass Features</h5>
              <Horizontal>
                {item.GlassFeatures.map((item, index) => (
                  <div key={index}>
                    <h6>
                      Name: <span> {item.Name}</span>
                    </h6>
                  </div>
                ))}
              </Horizontal>
            </SubLevel>
          )}

          {item.AllCamingOptions.length > 0 && (
            <SubLevel>
              <h5>All Caming Options</h5>
              <Horizontal>
                {item.AllCamingOptions.map((item, index) => (
                  <div key={index}>
                    {item.ImageUrl && (
                      <SmallImage
                        alt={item.Name}
                        src={`${store.imgSrc}${item.ImageUrl.split(
                          ".com"
                        ).pop()}`}
                      />
                    )}
                    <h6>
                      Name: <span> {item.Name}</span>
                    </h6>
                  </div>
                ))}
              </Horizontal>
            </SubLevel>
          )}

          {item.GrilleColors.length > 0 && (
            <SubLevel>
              <h5>Grille Colors</h5>
              <Horizontal>
                {item.GrilleColors.map((item, index) => (
                  <div key={index}>
                    {item.ImageUrl && (
                      <SmallImage
                        alt={item.Name}
                        src={`${store.imgSrc}${item.ImageUrl.split(
                          ".com"
                        ).pop()}`}
                      />
                    )}
                    <h6>
                      Name: <span> {item.Name}</span>
                    </h6>
                  </div>
                ))}
              </Horizontal>
            </SubLevel>
          )}

          <h6>
            GlassAssociation: <span>{item.GlassAssociation.Association}</span>
          </h6>
        </Link>
      </Container>
    </Box>
  );
};

const Container = styled.div``;

const SmallImage = styled(LazyLoadImage)`
  display: grid;
  width: 3.5em;
  height: 3.5em;
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

const SubLevel = styled.div`
  margin-top: 2.5em;
  h5 {
    margin-bottom: 16px;
  }
`;

export default RelatedGlassItem;
