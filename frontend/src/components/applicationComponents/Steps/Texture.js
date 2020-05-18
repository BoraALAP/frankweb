import React, { useContext } from "react";

import styled from "styled-components";
import Selector from "../UI/Selector";
import appContext from "../../../context/context";
import Layout from "./Layout";

const Texture = (props) => {
  const { store, dispatch } = useContext(appContext);

  const handleClick = (value) => {
    dispatch({
      type: "UPDATE_STEP",
      step: "texture",
      value,
    });
  };

  const options = [
    { name: "Wood Grain", value: "Woodgrain" },
    { name: "Smooth", value: "Smooth" },
  ];

  return (
    <Layout
      title="What kind of texture you would like your door to be?"
      gridSize={2}
      component="texture"
    >
      {options.map((selector, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(selector.value)}
          select={selector.value === store.steps.texture.value}
        >
          {selector.name}
        </Selector>
      ))}
    </Layout>
  );
};

export default Texture;
