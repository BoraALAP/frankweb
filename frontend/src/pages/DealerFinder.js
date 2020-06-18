import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Capitilize } from "../components/lib/text";

import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker,
} from "@react-google-maps/api";
import Spinner from "../components/UI/Spinner";

const DealerFinder = (props) => {
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState(undefined);
  const [center, setCenter] = useState({});
  const [activeLocation, setActiveLocation] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    const request = async () => {
      const { data } = await axios(
        `${process.env.REACT_APP_FRONT_END_URL}/head/dealer.json`
      );
      setLocations(data);

      setCategories(
        data
          .map((item) => item.city)
          .filter((value, index, self) => self.indexOf(value) === index)
          .sort()
      );
    };
    request();

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
      <h5>{Capitilize(loc.dealer)}</h5>
      <InRow>
        <h6>Address:</h6>{" "}
        <span>
          {Capitilize(loc.address)} {loc.postal} {Capitilize(loc.city)}{" "}
          {loc.province}
        </span>
      </InRow>
      <InRow>
        <h6>Contact Person:</h6> <span>{Capitilize(loc.person)}</span>
      </InRow>
      <InRow>
        <h6>Email:</h6>{" "}
        <a href={`mailto:${loc.email}`}>
          <span>{loc.email}</span>
        </a>
      </InRow>
      <InRow>
        <h6>Phone:</h6>{" "}
        <a href={`tel:${loc.phone}`}>
          <span>{loc.phone}</span>
        </a>
      </InRow>
    </>
  );

  if (!center.lat && categories === undefined) {
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
                locations.map((loc, index) => (
                  <MarkerS
                    key={index}
                    position={loc}
                    clusterer={clusterer}
                    title={loc.name}
                    active={activeLocation === index}
                    // onMouseOver={() => HandleSetup(loc, index)}
                    onClick={() => HandleSetup(loc, index)}
                  />
                ))
              }
            </MarkerClusterer>
          </GoogleMap>
        )}
      </LoadScript>

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
                <h4>{Capitilize(item)}</h4>
                {locations.map((it, index) => {
                  if (it.city === item) {
                    return (
                      <Dealer
                        key={index}
                        active={activeLocation === index}
                        onClick={() => {
                          setCenter({
                            lat: it.lat,
                            lng: it.lng,
                          });
                          HandleSetup(it, index);
                          window.scrollTo(0, 0);
                        }}
                      >
                        {dealer(it)}
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
  grid-template-columns: repeat(auto-fit, minmax(375px, 1fr));
`;

export default DealerFinder;
