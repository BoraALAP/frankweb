import React, { useContext, useEffect, useState } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

import styled from "styled-components";
import { editContext } from "../context/context";

const CHECK_ID_QUERY = gql`
  query CHECK_ID_QUERY(
    $finish: ID
    $glassFamily: ID
    $glassAssociation: ID
    $defaultSize: ID
  ) {
    doorsConnection(
      where: {
        AND: {
          Finish: { Id_contains: $finish }
          ParentGlassFamilyAbbreviation: { Id_contains: $glassFamily }
          GlassAssociation: { Id_contains: $glassAssociation }
          DefaultSize: { Id_contains: $defaultSize }
        }
      }
    ) {
      aggregate {
        count
      }
      edges {
        node {
          Id
          ParentGlassFamilyAbbreviation {
            Id
            Name
            Glasses {
              GlassAssociation {
                Association
              }
            }
          }
          Finish {
            Name
            Id
          }
          GlassAssociation {
            Id
            Association
          }
        }
      }
    }
  }
`;

const QdoorEditable = (props) => {
  const { editStore, editDispatch } = useContext(editContext);

  const queryOptions = {
    options: {
      variables: {
        finish: editStore.finish.id,
        glassFamily: editStore.glassFamily.id,
        glassAssociation: editStore.glassAssociation.id,
        defaultSize: editStore.defaultSize.id,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    },
  };

  const [{ data, loading }] = useLazyQuery(CHECK_ID_QUERY, queryOptions);
  console.log(data);
  return data;
};

const Container = styled.div``;

export default QdoorEditable;
