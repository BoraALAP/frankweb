import React, { useContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { LazyLoadImage } from "react-lazy-load-image-component";

import styled from "styled-components";
import Selector from "../UI/Selector";

import Spinner from "../../applicationComponents/UI/Spinner";
import appContext from "../../../context/context";

const SIZE_QUERY = gql`
  query SIZE_QUERY {
    availableSizesesConnection(orderBy: Size_DESC) {
      edges {
        node {
          __typename
          Id
          Size
          Width
          Height
          Place
          Doors {
            StyleNumber
          }
        }
      }
    }
  }
`;

const Size = ({ nextStep, prevStep }, props) => {
  const { dispatch } = useContext(appContext);
  const [select, setSelect] = useState({ Width: "", Height: "" });
  const [widths, setWidths] = useState([]);
  const [heights, setHeights] = useState([]);
  const { data, loading } = useQuery(SIZE_QUERY);

  const findHeights = (width) => {
    const array = data.availableSizesesConnection.edges.map((items) => {
      if (items.node.Width === width && items.node.Place === "Door") {
        return items.node.Height;
      }
    });

    const newArray = array.filter((value, index, self) => {
      if (value !== undefined) {
        return array.indexOf(value) === index;
      }
    });

    setHeights([...newArray]);
  };

  useEffect(() => {
    if (!loading && data.availableSizesesConnection !== undefined) {
      const array = data.availableSizesesConnection.edges.map((items) => {
        if (items.node.Place === "Door") {
          return items.node.Width;
        }
      });

      const newArray = array.filter((value, index, self) => {
        if (value !== undefined) {
          return array.indexOf(value) === index;
        }
      });
      setWidths([...newArray]);
    }
  }, [loading]);

  useEffect(() => {
    if (select.Width !== "") {
      findHeights(select.Width);
    }
  }, [select]);

  if (
    data === undefined ||
    data.availableSizesesConnection === undefined ||
    data.availableSizesesConnection.edges === undefined
  ) {
    return <Spinner />;
  }

  const handleClick = (text) => {
    dispatch({
      type: "UPDATE_STEP",
      step: "size",
      payload: text,
    });
    nextStep();
  };

  return (
    <Container>
      <h3>What are the measurement?</h3>

      <h5>Width</h5>
      <SelectorContainer>
        <Selector skip onClick={() => nextStep()}>
          Skip
        </Selector>
        {widths.map((selector, index) => (
          <Selector
            key={index}
            onClick={() => {
              setSelect({ Width: `${selector}` });
            }}
          >
            {selector}
          </Selector>
        ))}
      </SelectorContainer>

      {select.Width !== "" && (
        <div>
          <h5>Height</h5>
          <SelectorContainer>
            {heights.map((selector, index) => (
              <Selector
                key={index}
                onClick={() => {
                  handleClick(`${select.Width} x ${selector}`);
                }}
              >
                {selector}
              </Selector>
            ))}
          </SelectorContainer>
        </div>
      )}

      <Selector back onClick={() => prevStep()}>
        Back
      </Selector>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-gap: 80px;
`;

const SelectorContainer = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-columns: repeat(3, 1fr);
`;

export default Size;
