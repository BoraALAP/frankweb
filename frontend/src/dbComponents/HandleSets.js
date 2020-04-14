import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_HANDLE_SETS_MUTATION = gql`
  mutation CREATE_HANDLE_SETS_MUTATION(
    $Finish: String
    $FinishToken: String
    $Design: String
    $Locking: String
    $Size: String
    $ProductFamily: String
    $FeedDYD: String
    $ShowInDYD: Boolean
    $IsMultiPoint: Boolean
    $ImageUrl: String
    $PartCode: String
    $Brand: Int
    $WebSiteProductCategoryId: Int
    $WebSiteProductCategoryName: String
    $PartType: Int
  ) {
    createHandleSet(
      Finish: $Finish
      FinishToken: $FinishToken
      Design: $Design
      Locking: $Locking
      Size: $Size
      ProductFamily: $ProductFamily
      FeedDYD: $FeedDYD
      ShowInDYD: $ShowInDYD
      IsMultiPoint: $IsMultiPoint
      ImageUrl: $ImageUrl
      PartCode: $PartCode
      Brand: $Brand
      WebSiteProductCategoryId: $WebSiteProductCategoryId
      WebSiteProductCategoryName: $WebSiteProductCategoryName
      PartType: $PartType
    ) {
      Finish
      FinishToken
      Design
      Locking
      Size
      ProductFamily
      FeedDYD
      ShowInDYD
      IsMultiPoint
      ImageUrl
      PartCode
      Brand
      WebSiteProductCategoryId
      WebSiteProductCategoryName
      PartType
    }
  }
`;

const HandleSets = (props) => {
  const [createHandleSet, { data, loading, error }] = useMutation(
    CREATE_HANDLE_SETS_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbHandleSets.json");
      data.handleSets.map(async (item) => {
        const res = await createHandleSet({
          variables: {
            ...item,
          },
        });
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <p>loaded HandleSets</p>
    </Container>
  );
};

const Container = styled.div``;

export default HandleSets;
