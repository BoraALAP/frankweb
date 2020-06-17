import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker,
} from "@react-google-maps/api";

const DealerFinder = (props) => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const request = async () => {
      const { data } = await axios("./dealer.json");
      setLocations(data);
    };
    request();
  }, []);

  const [location, setLocation] = useState({
    lat: 43.6539697,
    lng: -79.4338794,
  });
  const [activeLocation, setActiveLocation] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const [zoom, setZoom] = useState(10);

  navigator.geolocation.getCurrentPosition((position) => {
    if (position) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }
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

  function createKey(location) {
    return location.lat + location.lng;
  }

  const HandleSetup = (loc, index) => {
    setActiveLocation(index);
    setInfo({ ...loc, index });
    setZoom(19);
  };

  const dealer = (loc) => (
    <DealerS>
      <h5>{loc.dealer}</h5>
      <div>
        <h6>Address:</h6> <span>{loc.address}</span>
        <p>
          {loc.postal} {loc.city}
        </p>
      </div>
      <div>
        <h6>Phone:</h6> <span>{loc.phone}</span>
      </div>
    </DealerS>
  );

  return (
    <Container>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
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
          {dealer(info)}
        </Display>
      )}

      <Content>
        {locations.map((loc, index) => {
          if (index !== activeLocation) {
            return (
              <Dealer
                key={index}
                active={activeLocation === index}
                onClick={() => {
                  setLocation({
                    lat: loc.lat,
                    lng: loc.lng,
                  });
                  HandleSetup(loc, index);
                }}
              >
                {dealer(loc)}
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
const DealerS = styled.div`
  h6 {
    margin: 0;
  }
`;

const MarkerS = styled(Marker)`
  transform: scale(1.1);
`;

export default DealerFinder;
