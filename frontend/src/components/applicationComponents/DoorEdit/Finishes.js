import React, { useContext } from "react";

import styled from "styled-components";
import Layout from "./Layout";
import Selector from "../UI/Selector";
import { editContext } from "../../../context/context";

import ImageContainer from "../UI/ImageContainer";

const Finishes = ({ data }) => {
  const { editStore, editDispatch } = useContext(editContext);

  const handleClick = (value, id) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "finish",
      value,
      id,
    });
  };

  return (
    <Layout
      title="What kind of finish you want to have on the door?"
      gridSize={3}
      component="Finishes"
    >
      {data.map((selector, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(selector.Name, selector.Id)}
          select={selector.Name === editStore.doorEdit.finish.value}
        >
          <ImageContainer alt={selector.StyleNumber} src={selector.ImageUrl} />
          <p>{selector.Name}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default Finishes;
