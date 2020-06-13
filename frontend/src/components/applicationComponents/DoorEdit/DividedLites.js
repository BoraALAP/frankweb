import React, { useContext } from "react";

import styled from "styled-components";
import Layout from "./Layout";

import { editContext } from "../../../context/context";

import Selector from "../UI/Selector";

import ImageContainer from "../UI/ImageContainer";

const DividedLites = ({ data }) => {
  const { editStore, editDispatch } = useContext(editContext);

  const handleClick = (value, id, associationValue, associationId) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "dividedLites",
      value,
      id,
    });
    editDispatch({
      type: "UPDATE_STEP",
      step: "glassAssociation",
      value: associationValue,
      id: associationId,
    });
  };

  return (
    <Layout
      title="What kind of Divide Lite would you like to have?"
      gridSize={3}
      component="DividedLites"
    >
      {data.map((selector, index) => (
        <Selector
          key={index}
          onClick={() =>
            handleClick(
              selector.Name,
              selector.Id,
              selector.GlassAssociation.Association,
              selector.GlassAssociation.Id
            )
          }
          select={selector.Name === editStore.doorEdit.dividedLites.value}
        >
          <ImageContainer
            alt={selector.StyleNumber}
            src={selector.ImageUrl}
            big
          />
          <p>{selector.Name}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default DividedLites;
