import React, { useContext } from "react";

import styled from "styled-components";
import Selector from "../UI/Selector";
import { appContext } from "../../../context/context";
import Layout from "./Layout";

const Customer = (props) => {
  const { appDispatch } = useContext(appContext);

  const options = [
    { name: "Homeowner" },
    { name: "Contractor" },
    { name: "Dealer" },
  ];

  const handleClick = (value) => {
    appDispatch({
      type: "UPDATE_STEP",
      step: "customer",
      value,
    });
  };

  return (
    <Layout title="Are You a ....?" component="customer">
      {options.map((selector, index) => (
        <Selector key={index} onClick={() => handleClick(selector.name)}>
          {selector.name}
        </Selector>
      ))}
    </Layout>
  );
};

export default Customer;
