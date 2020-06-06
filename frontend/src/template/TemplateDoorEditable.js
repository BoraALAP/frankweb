import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import ImageContainer from "../components/applicationComponents/UI/ImageContainer";

import { editContext } from "../context/context";
import Spinner from "../components/UI/Spinner";
import Button from "../components/UI/Button";

import DoorConfiguration from "../components/applicationComponents/DoorEdit/DoorConfiguration";
import Finishes from "../components/applicationComponents/DoorEdit/Finishes";
import FrameFinishes from "../components/applicationComponents/DoorEdit/FrameFinishes";
import DoorStyles from "../components/applicationComponents/DoorEdit/DoorStyles";
import GlassFamily from "../components/applicationComponents/DoorEdit/GlassFamily";
import DividedLites from "../components/applicationComponents/DoorEdit/DividedLites";
import HandleSets from "../components/applicationComponents/DoorEdit/HandleSets";
import DoorSurround from "../components/applicationComponents/DoorEdit/DoorSurround";
import Wrong from "../components/applicationComponents/Application/Wrong";
import Sidelite from "../components/applicationComponents/DoorEdit/Sidelite";
import Transom from "../components/applicationComponents/DoorEdit/Transom";
import ImgContainer from "../components/applicationComponents/DoorEdit/ImageContainer";

const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY($productid: ID) {
    doorsConnection(where: { Id: $productid }) {
      edges {
        node {
          __typename
          Id
          StyleNumber
          ImageUrl
          DefaultSize {
            Id
            Size
          }
          Finish {
            Name
            Id
          }
          FrameFinish {
            Name
            Id
          }
          AllowsHandlesets
          DefaultDoorSurroundStyleNumber {
            Id
            StyleNumber
          }
          Finishes {
            Id
            Name
            ImageUrl
          }
          DefaultSidelite {
            StyleNumber
          }
          DefaultTransom {
            StyleNumber
          }
          RelatedDoors {
            Id
          }
          ParentGlassFamilyAbbreviation {
            Name
            Id
          }
          RelatedFamily {
            Id
          }
          GlassFamilyAbbreviation {
            Id
            Name
          }
          GlassSizeCategory {
            Id
            Abbreviation
          }
          GlassAssociation {
            Id
            Association
          }
          RelatedGlasses {
            Name
            Id
          }
          Sidelites {
            Id
          }
          Transoms {
            Id
          }
        }
      }
    }
  }
`;

const CHECK_ID_QUERY = gql`
  query CHECK_ID_QUERY(
    $finish: ID
    $glassFamily: ID
    $glassAssociation: ID
    $defaultSize: ID
    $glassSize: ID
  ) {
    doorsConnection(
      where: {
        AND: {
          Finish: { Id_contains: $finish }
          ParentGlassFamilyAbbreviation: { Id_contains: $glassFamily }
          GlassAssociation: { Id_contains: $glassAssociation }
          DefaultSize: { Id_contains: $defaultSize }
          GlassSizeCategory: { Id_contains: $glassSize }
        }
      }
    ) {
      aggregate {
        count
      }
      edges {
        node {
          Id
        }
      }
    }
  }
`;

const TemplateDoorEditable = ({ match, history }) => {
  const { editStore, editDispatch } = useContext(editContext);
  const [info, setInfo] = useState(undefined);
  const [check, setCheck] = useState(false);

  const tabs = [
    { name: "DoorConfiguration", check: false, lookFor: "", index: 0 },
    { name: "Finishes", check: true, lookFor: "Finishes", index: 1 },
    { name: "FrameFinishes", check: true, lookFor: "Finishes", index: 2 },
    { name: "GlassFamily", check: true, lookFor: "RelatedFamily", index: 3 },
    { name: "DividedLites", check: true, lookFor: "RelatedGlasses", index: 4 },
    { name: "Sidelites", check: true, lookFor: "Sidelites", index: 5 },
    { name: "Transoms", check: true, lookFor: "Transoms", index: 6 },
    { name: "DoorStyles", check: true, lookFor: "RelatedDoors", index: 7 },
    { name: "DoorSurround", check: false, lookFor: "", index: 8 },
    { name: "HandleSets", check: false, lookFor: "", index: 9 },
  ];

  const { data: product, loading } = useQuery(PRODUCT_QUERY, {
    variables: {
      productid: match.params.id,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!loading && product.doorsConnection !== undefined) {
      const item = product.doorsConnection.edges[0].node;
      setInfo({ ...item });

      editDispatch({
        type: "UPDATE_STEP",
        step: "glassFamily",
        value: item.ParentGlassFamilyAbbreviation.Name,
        id: item.ParentGlassFamilyAbbreviation.Id,
      });
      editDispatch({
        type: "UPDATE_STEP",
        step: "glassAssociation",
        value: item.GlassAssociation.Association,
        id: item.GlassAssociation.Id,
      });
      editDispatch({
        type: "UPDATE_STEP",
        step: "dividedLites",
        value: item.GlassFamilyAbbreviation.Name,
        id: item.GlassFamilyAbbreviation.Id,
      });
      editDispatch({
        type: "UPDATE_STEP",
        step: "finish",
        value: item.Finish.Name,
        id: item.Finish.Id,
      });
      editDispatch({
        type: "UPDATE_STEP",
        step: "frameFinish",
        value: item.FrameFinish.Name,
        id: item.FrameFinish.Id,
      });
      editDispatch({
        type: "UPDATE_STEP",
        step: "defaultSize",
        value: item.DefaultSize.Size,
        id: item.DefaultSize.Id,
      });
      editDispatch({
        type: "UPDATE_STEP",
        step: "glassSize",
        value: item.GlassSizeCategory.Abbreviation,
        id: item.GlassSizeCategory.Id,
      });
      editDispatch({
        type: "UPDATE_STEP",
        step: "doorSurround",
        value: item.DefaultDoorSurroundStyleNumber.StyleNumber,
        id: item.DefaultDoorSurroundStyleNumber.Id,
      });
    }

    editDispatch({
      type: "GET_PRODUCT_ID",
      productId: match.params.id,
    });
  }, [loading]);

  const { data: checkedProduct, loading: checkedLoading } = useQuery(
    CHECK_ID_QUERY,
    {
      skip: !check,
      variables: {
        finish: editStore.doorEdit.finish.id,
        glassFamily: editStore.doorEdit.glassFamily.id,
        glassAssociation: editStore.doorEdit.glassAssociation.id,
        defaultSize: editStore.doorEdit.defaultSize.id,
        glassSize: editStore.doorEdit.glassSize.id,
      },
      notifyOnNetworkStatusChange: true,
      onCompleted: (checkedProduct) => {
        if (checkedProduct?.doorsConnection?.edges[0] === undefined) {
          editDispatch({
            type: "UPDATE_STEP",
            step: "glassAssociation",
            value: "",
            id: "ck9nctkrdokca09231h31vznl",
          });
        } else {
          editDispatch({
            type: "NEW_PRODUCT_ID",
            newId: checkedProduct?.doorsConnection?.edges[0].node?.Id,
          });
        }
      },
    }
  );

  useEffect(() => {
    editDispatch({
      type: "NEW_PRODUCT_ID",
      newId: match.params.id,
    });
  }, []);

  useEffect(() => {
    if (
      editStore.newId !== undefined &&
      editStore.newId !== editStore.productId
    ) {
      history.push(`/selected/door/${editStore.newId}`);
    }
  }, [editStore.newId]);

  useEffect(() => {
    if (editStore.doorEdit.finish.id !== "") {
      setCheck(true);
    }
  }, [editStore.doorEdit]);

  useEffect(() => {
    return () => editDispatch({ type: "RESET" });
  }, []);

  console.log(checkedProduct, checkedLoading);
  console.log(check);

  if (loading) {
    return <Spinner />;
  }

  const handleDisplay = (target) => {
    editDispatch({ type: "UPDATE_EDIT_STEP", step: target });
  };

  const Switch = (prop) => {
    switch (editStore.doorEdit.step) {
      case 0:
        return <DoorConfiguration id={match.params.id} />;
      case 1:
        return <Finishes id={match.params.id} />;
      case 2:
        return <FrameFinishes id={match.params.id} />;
      case 3:
        return <GlassFamily id={match.params.id} />;
      case 4:
        return <DividedLites id={match.params.id} />;
      case 5:
        return <Sidelite id={match.params.id} />;
      case 6:
        return <Transom id={match.params.id} />;
      case 7:
        return <DoorStyles id={match.params.id} />;
      case 8:
        return <DoorSurround id={match.params.id} />;
      case 9:
        return <HandleSets id={match.params.id} />;
      default:
        return <Wrong />;
    }
  };

  if (info === undefined) {
    return <Spinner />;
  }

  return (
    <Container>
      <Left>
        <ImgContainer
          alt={info.StyleNumber}
          door={info.ImageUrl}
          sidelite={info.ImageUrl}
          transom={info.ImageUrl}
          name={info.StyleNumber}
          big
        />
      </Left>
      <Right>
        <Tabs>
          {tabs.map((item) => {
            if (item.check) {
              if (
                Array.isArray(info[item.lookFor]) &&
                info[item.lookFor].length > 1
              ) {
                if (
                  !editStore.doorEdit.doorConfiguration.sideliteLeft &&
                  item.lookFor === "Sidelites"
                ) {
                  return;
                } else if (
                  !editStore.doorEdit.doorConfiguration.sideliteRight &&
                  item.lookFor === "Sidelites"
                ) {
                  return;
                } else if (
                  !editStore.doorEdit.doorConfiguration.transom &&
                  item.lookFor === "Transoms"
                ) {
                  return;
                } else {
                  return (
                    <Button
                      key={item.index}
                      onClick={() => handleDisplay(item.index)}
                      display={item.index === editStore.doorEdit.step}
                      disabled={item.index === editStore.doorEdit.step}
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
                  onClick={() => {
                    handleDisplay(item.index);
                  }}
                  display={item.index === editStore.doorEdit.step}
                  disabled={item.index === editStore.doorEdit.step}
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
  grid-template-columns: repeat(auto-fit, minmax(120px, auto));
  grid-gap: 2.5vw;
`;

export default TemplateDoorEditable;