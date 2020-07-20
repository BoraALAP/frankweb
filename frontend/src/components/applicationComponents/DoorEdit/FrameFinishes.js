import React, { useContext } from "react";

import styled from "styled-components";
import Layout from "./Layout";
import Selector from "../UI/Selector";
import { editContext } from "../../../context/context";

import ImageContainer from "../UI/ImageContainer";

const FrameFinishes = ({ data }) => {
  const { editStore, editDispatch } = useContext(editContext);
  const handleClick = (value, id) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "frameFinish",
      value,
      id,
    });
  };

  return (
    <Layout
      title="What kind of finish you want to have on the frame covering the door?"
      gridSize={3}
      component="FrameFinishes"
    >
      {data.map((selector, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(selector.Name, selector.Id)}
          select={selector.Name === editStore.doorEdit.frameFinish.value}
        >
          <ImageContainer alt={selector.StyleNumber} src={selector.ImageUrl} />
          <p>{selector.Name}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default FrameFinishes;
