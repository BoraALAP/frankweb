import React from "react";
import styled from "styled-components";

import Transoms from "../dbComponents/Transoms";
import Sidelites from "../dbComponents/Sidelites";
import Doors from "../dbComponents/Doors";

import DoorCollections from "../dbComponents/DoorCollections";
import DoorLine from "../dbComponents/DoorLine";
import StyleShapes from "../dbComponents/StyleShapes";
import HandleSets from "../dbComponents/HandleSets";
import Finishes from "../dbComponents/Finishes";

import Glass from "../dbComponents/Glass";

import GrilleColor from "../dbComponents/GrilleColor";
import DividedLiteType from "../dbComponents/DividedLiteType";
import CamingOption from "../dbComponents/CamingOption";
import GlassFamily from "../dbComponents/GlassFamily";
import GlassFeature from "../dbComponents/GlassFeature";
import FrameProfile from "../dbComponents/FrameProfile";
import GlassAssociation from "../dbComponents/GlassAssociation";
import LocationOnHouse from "../dbComponents/LocationOnHouse";

const Push = (props) => {
  return (
    <Container>
      {/* 1. **Level 1** */}
      {/* <Doors /> */}
      {/* <Sidelites /> */}
      {/* <Transoms /> */}

      {/* 2. **Level 2** */}
      {/* <Glass /> */}
      {/* <DoorCollections /> */}
      {/* <DoorLine /> */}
      {/* <StyleShapes /> */}
      {/* <HandleSets /> */}
      {/* <Finishes /> */}

      {/* 3. **Level 3** */}
      {/* <GrilleColor /> */}
      {/* <DividedLiteType /> */}
      {/* <CamingOption /> */}
      {/* <GlassFamily /> */}
      {/* <GlassFeature /> */}
      {/* <FrameProfile /> */}
      {/* <GlassAssociation /> */}
      {/* <LocationOnHouse /> */}
    </Container>
  );
};

const Container = styled.div``;

export default Push;
