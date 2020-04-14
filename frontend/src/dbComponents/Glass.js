import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_GLASS_MUTATION = gql`
  mutation CREATE_GLASS_MUTATION(
    $Brand: String
    $Name: String
    $Abbreviation: String
    $GlassType: String
    $ParentGlassFamilyAbbreviation: GlassFamilyUpdateOneWithoutGlassesInput
    $DividedLiteType: DividedLiteTypeUpdateOneWithoutGlassesInput
    $GlassFeatures: GlassFeatureUpdateManyWithoutGlassesInput
    $CamingOptionsByFrameProfile: FrameProfileUpdateManyWithoutCamingOptionsByFrameProfilesInput
    $AllCamingOptions: CamingOptionUpdateManyWithoutGlassesInput
    $GrilleColors: GrilleColorUpdateManyWithoutGlassesInput
    $ImpactAvailable: Boolean
    $Summaries: [String]
    $GlassAssociation: GlassAssociationUpdateOneWithoutGlassesInput
    $ImageUrl: String
  ) {
    createGlass(
      Brand: $Brand
      Name: $Name
      Abbreviation: $Abbreviation
      GlassType: $GlassType
      ParentGlassFamilyAbbreviation: $ParentGlassFamilyAbbreviation
      DividedLiteType: $DividedLiteType
      GlassFeatures: $GlassFeatures
      CamingOptionsByFrameProfile: $CamingOptionsByFrameProfile
      AllCamingOptions: $AllCamingOptions
      GrilleColors: $GrilleColors
      ImpactAvailable: $ImpactAvailable
      Summaries: $Summaries
      GlassAssociation: $GlassAssociation
      ImageUrl: $ImageUrl
    ) {
      Brand
      Name
      Abbreviation
      GlassFeatures {
        Abbreviation
      }
    }
  }
`;

const Glass = (props) => {
  const [createGlass, { data, loading, error }] = useMutation(
    CREATE_GLASS_MUTATION
  );

  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbGlass.json");
      data.glasses.map(async (item) => {
        const res = await createGlass({
          variables: {
            ...item,
            ParentGlassFamilyAbbreviation: {
              connect: {
                abbreviation: item.ParentGlassFamilyAbbreviation,
              },
            },
            DividedLiteType: {
              connect: {
                Abbreviation: item.DividedLiteType.Abbreviation,
              },
            },
            GlassAssociation: {
              connect: {
                GlassAssociation: item.GlassAssociation,
              },
            },
            CamingOptionsByFrameProfile: {
              connect: item.CamingOptionsByFrameProfile.map((it) => ({
                Abbreviation: it.Frame,
              })),
            },
            AllCamingOptions: {
              connect: item.AllCamingOptions.map((it) => ({
                Abbreviation: it.Abbreviation,
              })),
            },
            GrilleColors: {
              connect: item.GrilleColors.map((it) => ({
                Abbreviation: it.Abbreviation,
              })),
            },
            GlassFeatures: {
              connect: item.GlassFeatures.map((it) => ({
                Abbreviation: it.Abbreviation,
              })),
            },
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
      <p>loaded Glass</p>
    </Container>
  );
};

const Container = styled.div``;

export default Glass;
