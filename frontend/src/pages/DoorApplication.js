import React, { useState, useContext } from "react";
import styled from "styled-components";

import Customer from "../components/applicationComponents/Application/Customer";
import Location from "../components/applicationComponents/Application/Location";
import Texture from "../components/applicationComponents/Application/Texture";
import Size from "../components/applicationComponents/Application/Size";
import GlassSize from "../components/applicationComponents/Application/GlassSize";
import Success from "../components/applicationComponents/Application/Success";
import Wrong from "../components/applicationComponents/Application/Wrong";
import { appContext } from "../context/context";
import GlassFamily from "../components/applicationComponents/Application/GlassFamily";
import SidePanel from "../components/applicationComponents/Application/SidePanel";

// import { appContext } from "../context/context";

const DoorApplication = ({ match }) => {
  const { store } = useContext(appContext);

  const Switch = (prop) => {
    switch (store.steps.step) {
      case 1:
        return <Customer />;
      case 2:
        return <Location />;
      case 3:
        return <Texture />;
      case 4:
        return <Size />;
      case 5:
        return <GlassSize />;
      case 6:
        return <GlassFamily />;
      case 7:
        return <Success />;
      default:
        return <Wrong />;
    }
  };

  return (
    <Container>
      <Left>
        <Switch />
      </Left>
      <Right>
        <SidePanel />
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
`;

const Left = styled.div`
  width: 80%;
`;

const Right = styled.div`
  width: 20%;
`;

export default DoorApplication;
