import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { useFormik } from "formik";

import {
  GoogleMap,
  useLoadScript,
  MarkerClusterer,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Spinner from "../components/UI/Spinner";

const DEALER_QUERY = gql`
  query DEALER_QUERY($search: String) {
    dealersConnection(where: { city_contains: $search }) {
      aggregate {
        count
      }
      edges {
        node {
          id
          dealer
          address
          city
          province
          postal
          lat
          lng
        }
      }
    }
  }
`;

const DealerFinder = (props) => {
  const { data, loading, fetchMore } = useQuery(DEALER_QUERY);

  const [locations, setLocations] = useState(data);
  const [categories, setCategories] = useState(undefined);
  const [center, setCenter] = useState({});
  const [activeLocation, setActiveLocation] = useState(undefined);
  const [search, setSearch] = useState("");
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      } else {
        setCenter({
          lat: 43.6539697,
          lng: -79.4338794,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      setLocations(data.dealersConnection.edges);

      setCategories(
        data?.dealersConnection?.edges
          .map(({ node }) => node.city)
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort()
      );
    }
  }, [data]);

  const containerStyle = {
    width: "100%",
    height: "90vh",
    maxHeight: "50vh",
  };

  const mapOptions = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  };

  const HandleSetup = (loc, index) => {
    // setInfo({ ...loc, index });
    setActiveLocation(index);
    setCenter({ lat: loc.lat, lng: loc.lng });
    setZoom(16);
  };

  useEffect(() => {
    fetchMore({
      query: DEALER_QUERY,
      variables: {
        search,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }

        console.log(previousResult, fetchMoreResult);

        setCategories(
          fetchMoreResult.dealersConnection.edges
            .map(({ node }) => node.city)
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort()
        );
        setLocations(fetchMoreResult.dealersConnection.edges);
      },
    });
  }, [search]);

  const dealer = (loc) => (
    <>
      <h5>{loc.dealer}</h5>
      <InRow>
        <h6>Address:</h6>{" "}
        <span>
          {loc.address} {loc.postal} {loc.city} {loc.province}
        </span>
      </InRow>

      {/* <InRow>
  //       <h6>Contact Person:</h6> <span>{loc.person}</span>
  //     </InRow>
  //     <InRow>
  //       <h6>Email:</h6>{" "}
  //       <a href={`mailto:${loc.email}`}>
  //         <span>{loc.email}</span>
  //       </a>
  //     </InRow>
  //     {loc.phone && (
  //       <InRow>
  //         <h6>Phone:</h6>{" "}
  //         <a href={`tel:${loc.phone}`}>
  //           <span>{loc.phone}</span>
  //         </a>
  //       </InRow>
  //     )} */}
    </>
  );

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["places"], // ,
    // ...otherOptions
  });

  if (!center.lat || categories === undefined || !isLoaded) {
    return <Spinner />;
  }

  return (
    <Container>
      {center.lat && (
        <GoogleMap
          center={center}
          mapContainerStyle={containerStyle}
          zoom={zoom}
        >
          <MarkerClusterer options={mapOptions} averageCenter={true}>
            {(clusterer) =>
              locations.map(({ node }) => (
                <MarkerS
                  key={node.id}
                  position={node}
                  clusterer={clusterer}
                  title={node.name}
                  active={activeLocation === node.id}
                  onClick={() => HandleSetup(node, node.id)}
                />
              ))
            }
          </MarkerClusterer>

          {activeLocation &&
            locations.map(({ node }) => {
              return (
                node.id === activeLocation && (
                  <InfoWindow
                    onCloseClick={() => setActiveLocation(undefined)}
                    position={{ lat: node.lat, lng: node.lng }}
                    key={node.id}
                  >
                    <>
                      <h5>{node.dealer}</h5>

                      <InRow>
                        <h6>Address:</h6>
                        <span>
                          {node.address} {node.postal} {node.city}{" "}
                          {node.province}
                        </span>
                      </InRow>
                    </>
                  </InfoWindow>
                )
              );
            })}
        </GoogleMap>
      )}

      <Form>
        <div>
          <input
            type="search"
            name="search"
            placeholder="Which city are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Form>

      <Content>
        {categories !== undefined && categories.length > 0 ? (
          categories.map((item, index) => {
            return (
              <City key={index}>
                <h4>{item}</h4>
                {locations.map(({ node }) => {
                  if (node.city === item) {
                    return (
                      <Dealer
                        key={node.id}
                        active={activeLocation === node.id}
                        onClick={() => {
                          setCenter({
                            lat: node.lat,
                            lng: node.lng,
                          });
                          HandleSetup(node, node.id);
                          window.scrollTo(0, 0);
                        }}
                      >
                        {dealer(node)}
                      </Dealer>
                    );
                  }
                })}
              </City>
            );
          })
        ) : (
          <h3>There is no city with those letters</h3>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div``;
const Display = styled.div`
  display: grid;
  grid-gap: 0.5em;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey};
  padding-bottom: 1em;
  h6 {
    margin: 0;
  }
`;
const Content = styled.ul`
  list-style: none;
  padding-inline-start: 0px;
  display: grid;
  grid-gap: 1.5em;
  h4 {
    margin: 16px 0 0;
  }
`;

const Dealer = styled.li`
  display: grid;
  grid-gap: 0.5em;
  h6 {
    margin: 0;
  }
`;

const MarkerS = styled(Marker)`
  transform: scale(1.1);
`;

const InRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: baseline;
  grid-gap: 1em;
`;

const City = styled.div`
  h4 {
    grid-column: 1/-1;
  }
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

const Form = styled.form`
  display: grid;
`;

export default DealerFinder;
