import React, { useContext } from "react";

import Layout from "./Layout";

import { editContext } from "../../../context/context";

import ImageContainer from "../UI/ImageContainer";
import Selector from "../UI/Selector";

const Sidelite = ({ data }) => {
  const { editStore, editDispatch } = useContext(editContext);

  const handleClick = (value, id) => {
    editDispatch({
      type: "UPDATE_STEP",
      step: "sidelite",
      value,
      id,
    });
  };

  return (
    <Layout
      title="Other Sidelite families works with this door"
      gridSize={3}
      component="Sidelite"
    >
      {data.map((item, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(item.StyleNumber, item.Id)}
          select={item.StyleNumber === editStore.doorEdit.sidelite.value}
        >
          <ImageContainer
            alt={item.StyleNumber}
            src={item.BigImageUrl ? item.BigImageUrl : item.ImageUrl}
            big
          />
          <p>{item.StyleNumber}</p>
        </Selector>
      ))}
    </Layout>
  );
};

export default Sidelite;
