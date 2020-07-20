import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

import { editContext } from "../context/context";
import Spinner from "../components/UI/Spinner";
import { Primary } from "../components/UI/Button";

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
            ImageUrl
          }
          FrameFinish {
            Name
            Id
            ImageUrl
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
            Id
            StyleNumber
            ImageUrl
          }
          DefaultTransom {
            Id
            StyleNumber
            ImageUrl
          }
          RelatedDoors {
            Id
          }
          ParentGlassFamilyAbbreviation {
            Name
            Id
            ImageUrl
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
            ImageUrl
          }
          RelatedDoors {
            Id
            StyleNumber
            ImageUrl
          }
          RelatedFamily {
            Id
            Name
            ImageUrl
            BigImageUrl
          }
          Sidelites {
            Id
            StyleNumber
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
      editDispatch({
        type: "UPDATE_STEP",
        step: "sidelite",
        url: item.DefaultSidelite?.ImageUrl,
        value: item.DefaultSidelite?.StyleNumber,
        id: item.DefaultSidelite?.Id,
      });
      editDispatch({
        type: "UPDATE_STEP",
        step: "transom",
        url: item.DefaultTransom?.ImageUrl,
        value: item.DefaultTransom?.StyleNumber,
        id: item.DefaultTransom?.Id,
      });
    }

    editDispatch({
      type: "GET_PRODUCT_ID",
      productId: match.params.id,
    });
  }, [loading]);

  // eslint-disable-next-line
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
    return () => editDispatch({ type: "RESET" });
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

  if (loading) {
    return <Spinner />;
  }

  const handleDisplay = (target) => {
    editDispatch({ type: "UPDATE_EDIT_STEP", step: target });
  };

  const Switch = (prop) => {
    switch (editStore.doorEdit.step) {
      case 0:
        return <DoorConfiguration />;
      case 1:
        return <Finishes data={info.Finishes} />;
      case 2:
        return <FrameFinishes data={info.Finishes} />;
      case 3:
        return <GlassFamily data={info.RelatedFamily} />;
      case 4:
        return <DividedLites data={info.RelatedGlasses} />;
      case 5:
        return <Sidelite data={info.Sidelites} />;
      case 6:
        return <Transom data={info.Transoms} />;
      case 7:
        return <DoorStyles data={info.RelatedDoors} />;
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

  console.log(info);
  console.log(editStore.doorEdit);

  return (
    <Container>
      <Left>
        <ImgContainer
          alt={info.StyleNumber}
          src={info.ImageUrl}
          sideSrc={
            (editStore.doorEdit.doorConfiguration.sideliteLeft ||
              (editStore.doorEdit.doorConfiguration.sideliteRight &&
                editStore.doorEdit?.sidelite.url)) &&
            editStore.doorEdit.sidelite.url
          }
          sideAlt={
            (editStore.doorEdit.doorConfiguration.sideliteLeft ||
              (editStore.doorEdit.doorConfiguration.sideliteRight &&
                editStore.doorEdit?.sidelite.value)) &&
            editStore.doorEdit.sidelite.value
          }
          topSrc={
            editStore.doorEdit.doorConfiguration.transom &&
            editStore.doorEdit?.transom.url &&
            editStore.doorEdit.transom.url
          }
          topAlt={
            editStore.doorEdit.doorConfiguration.transom &&
            editStore.doorEdit?.transom.value &&
            editStore.doorEdit.transom.value
          }
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
                    <Primary
                      key={item.index}
                      onClick={() => handleDisplay(item.index)}
                      disabled={item.index === editStore.doorEdit.step}
                    >
                      {item.name}
                    </Primary>
                  );
                }
              }
            } else {
              return (
                <Primary
                  key={item.index}
                  onClick={() => {
                    handleDisplay(item.index);
                  }}
                  disabled={item.index === editStore.doorEdit.step}
                >
                  {item.name}
                </Primary>
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
