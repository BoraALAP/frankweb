import React, { useContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import ImageContainer from "../UI/ImageContainer";

import styled from "styled-components";
import Selector from "../UI/Selector";

import Spinner from "../../UI/Spinner";
import { appContext } from "../../../context/context";
import Layout from "./Layout";
import Button from "../../UI/Button";

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
        }
      }
    }
  }
`;

const Size = (props) => {
  const { appDispatch } = useContext(appContext);
  const [width, setWidth] = useState([]);
  const [height, setHeight] = useState([]);
  const [select, setSelect] = useState({ width: undefined, height: undefined });
  const { data, loading } = useQuery(SIZE_QUERY);

  // finds available heights
  const findHeights = (width) => {
    const array = data.availableSizesesConnection.edges
      .map((items) => {
        if (items.node.Width === width && items.node.Place === "Door") {
          return items.node.Height;
        }
      })
      .filter((value, index, self) => {
        if (value !== undefined) {
          return self.indexOf(value) === index;
        }
      });

    setHeight([...array]);
  };

  //gets the data and gives a widths list
  useEffect(() => {
    if (!loading && data.availableSizesesConnection !== undefined) {
      const arr = data.availableSizesesConnection.edges
        .map((item) => {
          if (item.node.Place === "Door") {
            return item.node.Width;
          }
        })
        .filter((v, i, a) => {
          if (v !== undefined) {
            return a.indexOf(v) === i;
          }
        });

      setWidth(arr);
    }
  }, [loading]);

  //finds the height list
  useEffect(() => {
    if (select.width !== undefined) {
      findHeights(select.width);
    }
  }, [select]);

  if (data === undefined) {
    return <Spinner />;
  }

  //when both values are put, finds the id and pushes to the context
  if (select.width !== undefined && select.height !== undefined) {
    data.availableSizesesConnection.edges.filter((v, i, a) => {
      if (v.node.Width === select.width && v.node.Height === select.height) {
        // this is causing the problem on the console
        appDispatch({
          type: "UPDATE_STEP",
          step: "size",
          value: v.node.Size,
          id: v.node.Id,
        });
      }
    });
  }

  return (
    <Layout title="What are the measurement?" component="size">
      <Title>Width</Title>
      {width.map((item, index) => (
        <Selector
          key={index}
          select={item === select.width}
          onClick={() => setSelect({ ...select, width: item })}
        >
          {item}
        </Selector>
      ))}

      {height.length > 0 && (
        <>
          <Title>Height</Title>
          {height.map((item, index) => (
            <Selector
              key={index}
              select={item === select.height}
              onClick={() => setSelect({ ...select, height: item })}
            >
              {item}
            </Selector>
          ))}
        </>
      )}
      {/* 
      <Next
        disabled={select.width === undefined || select.height === undefined}
        onClick={handleClick}
      >
        Next
      </Next> */}
    </Layout>
  );
};

const Next = styled(Button)`
  display: grid;
  grid-column: span 3;
`;

const Title = styled.h5`
  display: grid;
  grid-column: span 3;
  justify-content: center;
`;

export default Size;
