import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import ImageContainer from "../components/applicationComponents/UI/ImageContainer";

import RelatedItem from "../components/applicationComponents/UI/RelatedItem";
import RelatedGlassItem from "../components/applicationComponents/UI/RelatedGlassItem";
import { editContext } from "../context/context";
import Spinner from "../components/UI/Spinner";

import DoorConfiguration from "../components/applicationComponents/DoorEdit/DoorConfiguration";
import Finishes from "../components/applicationComponents/DoorEdit/Finishes";
import FrameFinishes from "../components/applicationComponents/DoorEdit/FrameFinishes";
import DoorStyles from "../components/applicationComponents/DoorEdit/DoorStyles";
import Glass from "../components/applicationComponents/DoorEdit/Glass";
import DividedLites from "../components/applicationComponents/DoorEdit/DividedLites";
import HandleSets from "../components/applicationComponents/DoorEdit/HandleSets";
import DoorSurround from "../components/applicationComponents/DoorEdit/DoorSurround";
import Wrong from "../components/applicationComponents/Application/Wrong";
import Button from "../components/UI/Button";
import Sidelite from "../components/applicationComponents/DoorEdit/Sidelite";
import Transom from "../components/applicationComponents/DoorEdit/Transom";

const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY($productid: ID) {
    doorsConnection(where: { Id: $productid }) {
      aggregate {
        count
      }
      edges {
        cursor
        node {
          __typename
          Id
          StyleNumber
          ImageUrl
          AllowsHandlesets
          DefaultDoorSurroundStyleNumber {
            Id
            StyleNumber
            Surface
            ImageUrl
          }
          Finishes {
            Id
            Name
            ImageUrl
          }
          FrameProfiles {
            DoorCollectionAbbreviation
            Abbreviation
            Name
            ImageUrl
            StyleShapeAbbreviation
            CamingOptionsByFrameProfiles {
              Name
              Id
              ImageUrl
              ImpactAvailable
            }
            CamingOptions {
              Name
              Id
              ImageUrl
            }
          }
          RelatedDoors {
            StyleNumber
            Id
            ImageUrl
          }
          ParentGlassFamilyAbbreviation {
            Name
            Id
            PrivacyRating
            ImageUrl
            BigImageUrl
          }
          RelatedFamily {
            Name
            PrivacyRating
            BigImageUrl
            ImageUrl
          }
          GlassFamilyAbbreviation {
            Id
            Name
          }
          RelatedGlasses {
            Name
            Id
            ImageUrl
          }
          Sidelites {
            StyleNumber
            Id
            ImageUrl
          }
          Transoms {
            Id
            StyleNumber
            ImageUrl
          }
        }
      }
    }
  }
`;

const TemplateDoorEditable = ({ match }) => {
  const { editStore, editDispatch } = useContext(editContext);
  const [info, setInfo] = useState();
  const { data, loading } = useQuery(PRODUCT_QUERY, {
    variables: {
      productid: match.params.id,
    },
    notifyOnNetworkStatusChange: true,
  });

  const tabs = [
    { name: "DoorConfiguration", check: false, lookFor: "", index: 0 },
    { name: "Finishes", check: true, lookFor: "Finishes", index: 1 },
    { name: "FrameFinishes", check: true, lookFor: "Finishes", index: 2 },
    { name: "Glass", check: true, lookFor: "RelatedFamily", index: 3 },
    { name: "DividedLites", check: true, lookFor: "RelatedGlasses", index: 4 },
    { name: "Sidelites", check: true, lookFor: "Sidelites", index: 5 },
    { name: "Transoms", check: true, lookFor: "Transoms", index: 6 },
    { name: "DoorStyles", check: true, lookFor: "RelatedDoors", index: 7 },
    { name: "DoorSurround", check: false, lookFor: "", index: 8 },
    { name: "HandleSets", check: false, lookFor: "", index: 9 },
  ];

  useEffect(() => {
    if (!loading && data.doorsConnection !== undefined) {
      setInfo({ ...data.doorsConnection.edges[0].node });
      editDispatch({
        type: "UPDATE_STEP",
        step: "glass",
        value:
          data.doorsConnection.edges[0].node.ParentGlassFamilyAbbreviation.Name,
        id: data.doorsConnection.edges[0].node.ParentGlassFamilyAbbreviation.Id,
      });
      editDispatch({
        type: "UPDATE_STEP",
        step: "dividedLites",
        value: data.doorsConnection.edges[0].node.GlassFamilyAbbreviation.Name,
        id: data.doorsConnection.edges[0].node.GlassFamilyAbbreviation.Id,
      });
    }
    editDispatch({ type: "GET_PRODUCT_ID", productId: match.params.id });
  }, [loading, match.params.id]);

  const handleDisplay = (target) => {
    editDispatch({ type: "UPDATE_EDIT_STEP", step: target });
  };

  const Switch = (prop) => {
    switch (editStore.dooredit.step) {
      case 0:
        return <DoorConfiguration />;
      case 1:
        return <Finishes />;
      case 2:
        return <FrameFinishes />;
      case 3:
        return <Glass />;
      case 4:
        return <DividedLites />;
      case 5:
        return <Sidelite />;
      case 6:
        return <Transom />;
      case 7:
        return <DoorStyles />;
      case 8:
        return <DoorSurround />;
      case 9:
        return <HandleSets />;
      default:
        return <Wrong />;
    }
  };

  if (info === undefined) {
    return <Spinner />;
  }

  console.log(info);

  return (
    <Container>
      <Left>
        <ImageContainer alt={info.StyleNumber} src={info.ImageUrl} big />
        <h4>Style Number: {info.StyleNumber}</h4>
      </Left>
      <Right>
        <Tabs>
          {tabs.map((item, index) => {
            if (item.check) {
              if (
                Array.isArray(info[item.lookFor]) &&
                info[item.lookFor].length > 1
              ) {
                if (
                  !editStore.dooredit.doorConfiguration.sideliteLeft &&
                  item.lookFor === "Sidelites"
                ) {
                  return;
                } else if (
                  !editStore.dooredit.doorConfiguration.sideliteRight &&
                  item.lookFor === "Sidelites"
                ) {
                  return;
                } else if (
                  !editStore.dooredit.doorConfiguration.transom &&
                  item.lookFor === "Transoms"
                ) {
                  return;
                } else {
                  return (
                    <Button
                      key={item.index}
                      onClick={() => handleDisplay(item.index)}
                      display={item.index === editStore.dooredit.step}
                      disabled={item.index === editStore.dooredit.step}
                    >
                      {item.name}
                    </Button>
                  );
                }
              }
            } else {
              return (
                <Button
                  key={item.index}
                  onClick={() => handleDisplay(item.index)}
                  display={item.index === editStore.dooredit.step}
                  disabled={item.index === editStore.dooredit.step}
                >
                  {item.name}
                </Button>
              );
            }
          })}
        </Tabs>
        <Switch />
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 75%;
  grid-gap: 5%;
`;

const Left = styled.div`
  display: grid;
  align-content: start;
`;

const Right = styled.div`
  display: grid;
  align-content: start;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, auto));
  grid-gap: 2.5vw;
`;

const Listing = styled.div`
  display: grid;
  grid-gap: 16px;
`;

const Related = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2vw;
  width: fit-content;
`;

const SubLevel = styled.div`
  margin-top: 2.5em;
  display: grid;
  grid-gap: 8px;
`;

export default TemplateDoorEditable;
