import React, { useContext } from "react";

import styled from "styled-components";
import Layout from "./Layout";

import { editContext } from "../../../context/context";

import ImageContainer from "../UI/ImageContainer";
import Selector from "../UI/Selector";

const GlassFamily = ({ data }) => {
  const { editStore, editDispatch } = useContext(editContext);

  const handleClick = (value, id) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "glassFamily",
      value,
      id,
    });
  };

  return (
    <Layout
      title="Other Glass families works with this door"
      gridSize={3}
      component="GlassFamily"
    >
      {data.map((item, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(item.Name, item.Id)}
          select={item.Name === editStore.doorEdit.glassFamily.value}
        >
          <ImageContainer
            alt={item.StyleNumber}
            src={item.BigImageUrl ? item.BigImageUrl : item.ImageUrl}
            med={item.BigImageUrl}
          />
          <p>{item.Name}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default GlassFamily;
