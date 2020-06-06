import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";

const DealerFinder = (props) => {
  const [location, setLocation] = useState(null);
  const [activeLocation, setActiveLocation] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  // console.log(GoogleMap);
  // const autocomplete = new window.google.maps.places.Autocomplete();

  const containerStyle = {
    width: "100%",
    height: "90vh",
    maxHeight: "50vh",
  };

  const locations = [
    {
      lat: 43.6567004,
      lng: -79.385251,
      name: "asdasd",
      address: "12312 asdasd",
      phone: "6665557777",
    },
    {
      lat: 43.647385,
      lng: -79.3452539,
      name: "asafasfasd",
      address: "1231 asdasd",
      phone: "6665557776",
    },
    {
      lat: 43.6658901,
      lng: -79.3627633,
      name: "asafasafasda",
      address: "121 asdasdasda",
      phone: "6665557778",
    },
    {
      lat: 43.6583149,
      lng: -79.4164933,
      name: "asdasdasdas",
      address: "131 asdasdasdasaf asfasfa",
      phone: "6665557779",
    },
    {
      lat: 44.4111301,
      lng: -80.0243308,
      name: "asdasdasdascvbcx",
      address: "23131 asdasxcvxcvdasdasaf asfasfa",
      phone: "6665667779",
    },
    {
      lat: 44.9482239,
      lng: -79.2123753,
      name: "xcvxc sdasdas",
      address: "12131 asdasdasdasaf asfasfa",
      phone: "6673557779",
    },
    {
      lat: 46.8929954,
      lng: -76.1526829,
      name: "asdaghjg ddfgd ",
      address: "56 asdasdasd  sdfsdfsjkasaf asfyuia",
      phone: "6665887779",
    },
    {
      lat: 51.9873709,
      lng: -86.6116673,
      name: "yuu we sdas",
      address: "131 asasd  asdadrt sdasaf asfasfa",
      phone: "6664457779",
    },
  ];

  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  };

  function createKey(location) {
    return location.lat + location.lng;
  }

  const HandleSetup = (loc, index) => {
    setActiveLocation(index);
    setInfo({ ...loc, index });
    setZoom(17);
  };

  return (
    <Container>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={zoom}
        >
          <MarkerClusterer options={options} averageCenter={true}>
            {(clusterer) =>
              locations.map((loc, index) => (
                <MarkerS
                  key={createKey(loc)}
                  position={loc}
                  clusterer={clusterer}
                  title={loc.name}
                  active={activeLocation === index}
                  onMouseOver={() => HandleSetup(loc, index)}
                  onClick={() => HandleSetup(loc, index)}
                />
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </LoadScript>

      {info !== undefined && (
        <Display
          active={activeLocation === info.index}
          onClick={() => {
            setLocation({
              lat: info.lat,
              lng: info.lng,
            });
            HandleSetup(info, info.index);
          }}
        >
          <h5>{info.name}</h5>
          <p>
            Address: <span>{info.address}</span>
          </p>
          <p>
            Phone: <span>{info.phone}</span>
          </p>
        </Display>
      )}

      <Content>
        {locations.map((loc, index) => {
          if (index !== activeLocation) {
            return (
              <Dealer
                key={createKey(loc)}
                active={activeLocation === index}
                onClick={() => {
                  setLocation({
                    lat: loc.lat,
                    lng: loc.lng,
                  });
                  HandleSetup(loc, index);
                }}
              >
                <h5>{loc.name}</h5>
                <p>
                  Address: <span>{loc.address}</span>
                </p>
                <p>
                  Phone: <span>{loc.phone}</span>
                </p>
              </Dealer>
            );
          }
        })}
      </Content>
    </Container>
  );
};

const Container = styled.div``;
const Display = styled.div``;
const Content = styled.ul`
  list-style: none;
  padding-inline-start: 0px;
`;

const Dealer = styled.li``;

const MarkerS = styled(Marker)`
  transform: scale(1.1);
`;

export default DealerFinder;
