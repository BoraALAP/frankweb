import React from "react";
import styled from "styled-components";

// import Transoms from "../dbComponents/Transoms";
// import Sidelites from "../dbComponents/Sidelites";
import Doors from "../dbComponents/Doors";
import Transoms from "../dbComponents/Transoms";
import Sidelites from "../dbComponents/Sidelites";

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
import GlassSize from "../dbComponents/GlassSize";
import GlassFeature from "../dbComponents/GlassFeature";
import FrameProfile from "../dbComponents/FrameProfile";
import DoorSurrounds from "../dbComponents/DoorSurrounds";
import GlassAssociation from "../dbComponents/GlassAssociation";
import LocationOnHouse from "../dbComponents/LocationOnHouse";
import AvailableSizes from "../dbComponents/AvailableSizes";
import ArchitecturalStyle from "../dbComponents/ArchitecturalStyle";
import RatingEligibility from "../dbComponents/RatingEligibility";
import Dealers from "../dbComponents/Dealers";

const Push = (props) => {
  return (
    <Container>
      {/* 1. **Level 1** */}
      {/* <Doors /> */}
      <Dealers />
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
      {/* <GlassSize /> */}
      {/* <GlassFamily /> */}
      {/* <GlassFeature /> */}
      {/* <FrameProfile /> */}
      {/* <DoorSurrounds /> */}
      {/* <GlassAssociation /> */}
      {/* <LocationOnHouse /> */}
      {/* <AvailableSizes /> */}
      {/* <ArchitecturalStyle /> */}
      {/* <RatingEligibility /> */}
    </Container>
  );
};

const Container = styled.div``;

export default Push;
