import React, { useState, useContext } from "react";
import styled from "styled-components";
import { editContext } from "../../../context/context";
import Selector from "../UI/Selector";
import Layout from "./Layout";

const DoorConfiguration = () => {
  const { editStore, editDispatch } = useContext(editContext);

  const handleClick = (item) => {
    editDispatch({
      type: "UPDATE_DOOR_CONFIGURATION",
      step: "doorConfiguration",
      payload: { ...item },
    });
  };

  const options = [
    {
      value: "Single",
      sideliteLeft: false,
      sideliteRight: false,
      transom: false,
      double: false,
      triple: false,
      quadruple: false,
    },
    {
      value: "Single With Transom",
      sideliteLeft: false,
      sideliteRight: false,
      transom: true,
      double: false,
      triple: false,
      quadruple: false,
    },
    {
      value: "Single With Left Sidelite",
      sideliteLeft: true,
      sideliteRight: false,
      transom: false,
      double: false,
      triple: false,
      quadruple: false,
    },
    {
      value: "Single With Right Sidelite",
      sideliteLeft: false,
      sideliteRight: true,
      transom: false,
      double: false,
      triple: false,
      quadruple: false,
    },
    {
      value: "Single With Sidelites",
      sideliteLeft: true,
      sideliteRight: true,
      transom: false,
      double: false,
      triple: false,
      quadruple: false,
    },
    {
      value: "Single With Sidelites and Transom",
      sideliteLeft: true,
      sideliteRight: true,
      transom: true,
      double: false,
      triple: false,
      quadruple: false,
    },
    {
      value: "Double",
      sideliteLeft: false,
      sideliteRight: false,
      transom: false,
      double: true,
      triple: false,
      quadruple: false,
    },
    {
      value: "Double With Sidelites",
      sideliteLeft: true,
      sideliteRight: true,
      transom: false,
      double: false,
      triple: false,
      quadruple: false,
    },
    {
      value: "Triple",
      sideliteLeft: false,
      sideliteRight: false,
      transom: false,
      double: false,
      triple: true,
      quadruple: false,
    },
    {
      value: "Quadruple",
      sideliteLeft: false,
      sideliteRight: false,
      transom: false,
      double: false,
      triple: false,
      quadruple: true,
    },
  ];

  return (
    <Layout
      title="How do you want to place your door?"
      gridSize={3}
      component="DoorConfiguration"
    >
      {options.map((selector, index) => (
        <Selector
          key={index}
          onClick={() => handleClick(selector)}
          select={selector.value === editStore.doorEdit.doorConfiguration.value}
        >
          {selector.value}
        </Selector>
      ))}
    </Layout>
  );
};

const Container = styled.div``;

export default DoorConfiguration;
