import React, { useState, useContext } from "react";
import styled from "styled-components";

import Customer from "../components/applicationComponents/Steps/Customer";
import Location from "../components/applicationComponents/Steps/Location";
import Texture from "../components/applicationComponents/Steps/Texture";
import Size from "../components/applicationComponents/Steps/Size";
import GlassSize from "../components/applicationComponents/Steps/GlassSize";
import Success from "../components/applicationComponents/Steps/Success";
import Wrong from "../components/applicationComponents/Steps/Wrong";
import appContext from "../context/context";
import GlassFamily from "../components/applicationComponents/Steps/GlassFamily";
import SidePanel from "../components/applicationComponents/Steps/SidePanel";

// import appContext from "../context/context";

const DoorApplication = ({ match }) => {
  const { store } = useContext(appContext);

  console.log(store.steps.step);

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
