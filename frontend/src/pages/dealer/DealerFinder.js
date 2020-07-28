import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

import { motion, AnimatePresence } from "framer-motion";

import {
  GoogleMap,
  useLoadScript,
  MarkerClusterer,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Spinner from "../../components/UI/Spinner";

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

  const opacity = {
    initial: { x: -10, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 10, opacity: 0 },
  };

  if (!center.lat || categories === undefined || !isLoaded) {
    return <AnimatePresence exitBeforeEnter><SpinnerS initial="initial"
    animate="animate"
    exit="exit"
    variants={opacity} /></AnimatePresence>;
  }

  
  return (
    <AnimatePresence exitBeforeEnter>
      
    <Container>
      <Left  initial="initial"
            animate="animate"
            exit="exit"
            variants={opacity}>
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
      </Left>
      <Right  initial="initial"
            animate="animate"
            exit="exit"
            variants={opacity}>
        <Fixed>
          <H2>
            Ostaco Windows and Doors products are proudly distributed by many
            retailers across Ontario. Please fill out this form and our team
            will quickly get back to you with information on your nearest
            dealer.
          </H2>
          <Form>
            <InputS
              type="search"
              name="search"
              placeholder="Which city are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
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

              {(activeLocation && locations) &&
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
        </Fixed>
      </Right>
    </Container>
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  display: grid;
  grid-gap: 1.5em;
  @media (min-width: 768px) {
    grid-template-columns: 2fr 3fr;
  }
`;

const SpinnerS = motion.custom(styled(Spinner)``)


const Left = styled(motion.div)`
  display: grid;
  grid-row: 2;
  @media (min-width: 768px) {
    grid-row: 1;
  }
`;

const Right = styled(motion.div)`
  display: grid;
  @media (min-width: 768px) {
    position: relative;
  }
`;

const H2 = styled.h2`
  font-size: 0.875rem;
  font-weight: 400;
  max-width: 450px;
`;

const Fixed = styled.div`
  display: grid;
  grid-gap: 2vh;
  @media (min-width: 768px) {
    position: fixed;
    width: 52.5vw;
  }
`;

const InputS = styled.input`
  max-width: 450px;
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

const Dealer = styled.div`
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
`;

const Form = styled.form`
  display: grid;
`;

export default DealerFinder;
