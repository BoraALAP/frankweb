import React, { useContext } from "react";

import styled from "styled-components";
import Layout from "./Layout";

import { editContext } from "../../../context/context";

import ImageContainer from "../UI/ImageContainer";
import Selector from "../UI/Selector";

const Transom = ({ data }) => {
  const { editStore, editDispatch } = useContext(editContext);

  const handleClick = (value, id) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "transom",
      value,
      id,
    });
  };

  return (
    <Layout
      title="Other Transom families works with this door"
      gridSize={3}
      component="Transom"
    >
      {data.map((item, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(item.StyleNumber, item.Id)}
          select={item.StyleNumber === editStore.doorEdit.transom.value}
        >
          <ImageContainer
            alt={item.StyleNumber}
            src={item.BigImageUrl ? item.BigImageUrl : item.ImageUrl}
            med
          />
          <p>{item.StyleNumber}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default Transom;
