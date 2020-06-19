import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { useFormik } from "formik";

import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker,
} from "@react-google-maps/api";
import Spinner from "../components/UI/Spinner";
import { Primary } from "../components/UI/Button";

const DEALER_QUERY = gql`
  query DEALER_QUERY($search: String) {
    dealersConnection(where: { postal_contains: $search }) {
      aggregate {
        count
      }
      edges {
        node {
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
  const [info, setInfo] = useState(undefined);
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

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values, actions) => {
      actions.resetForm({ values: { search: "" } });
      actions.setSubmitting(false);
      fetchMore({
        query: DEALER_QUERY,
        variables: {
          search: values.search,
        },
        // updateQuery: (previousResult, )
      });
    },
  });

  const containerStyle = {
    width: "100%",
    height: "90vh",
    maxHeight: "50vh",
  };

  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  };

  const HandleSetup = (loc, index) => {
    setInfo({ ...loc, index });
    setActiveLocation(index);
    setCenter({ lat: loc.lat, lng: loc.lng });
    setZoom(19);
  };

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
        <h6>Contact Person:</h6> <span>{loc.person}</span>
      </InRow>
      <InRow>
        <h6>Email:</h6>{" "}
        <a href={`mailto:${loc.email}`}>
          <span>{loc.email}</span>
        </a>
      </InRow>
      {loc.phone && (
        <InRow>
          <h6>Phone:</h6>{" "}
          <a href={`tel:${loc.phone}`}>
            <span>{loc.phone}</span>
          </a>
        </InRow>
      )} */}
    </>
  );

  if (!center.lat || categories === undefined) {
    return <Spinner />;
  }

  return (
    <Container>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}>
        {center.lat && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
          >
            <MarkerClusterer options={options} averageCenter={true}>
              {(clusterer) =>
                locations.map(({ node }, index) => (
                  <MarkerS
                    key={index}
                    position={node}
                    clusterer={clusterer}
                    title={node.name}
                    active={activeLocation === index}
                    onClick={() => HandleSetup(node, index)}
                  />
                ))
              }
            </MarkerClusterer>
          </GoogleMap>
        )}
      </LoadScript>

      <Form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="search"
            name="search"
            placeholder="Search"
            value={formik.values.search}
            onChange={formik.handleChange}
          />
        </div>

        <Primary
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {" "}
          {formik.isSubmitting ? "Checking..." : "Search"}
        </Primary>
      </Form>

      {info !== undefined && (
        <>
          <h5>You have selected</h5>
          <Display
            active={activeLocation === info.index}
            onClick={() => {
              setCenter({
                lat: info.lat,
                lng: info.lng,
              });
              HandleSetup(info, info.index);
            }}
          >
            {dealer(info)}
          </Display>
        </>
      )}

      <Content>
        {categories !== undefined &&
          categories.map((item, index) => {
            return (
              <City key={index}>
                <h4>{item}</h4>
                {locations.map(({ node }, index) => {
                  if (node.city === item) {
                    return (
                      <Dealer
                        key={index}
                        active={activeLocation === index}
                        onClick={() => {
                          setCenter({
                            lat: node.lat,
                            lng: node.lng,
                          });
                          HandleSetup(node, index);
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
          })}
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

const Form = styled.div`
  display: grid;
`;

export default DealerFinder;
