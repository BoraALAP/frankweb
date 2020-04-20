import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_DOOR_MUTATION = gql`
  mutation CREATE_DOOR_MUTATION(
    $Brand: String
    $StyleNumber: String
    $ArchitecturalStyle: [String]
    $ProductLine: String
    $DoorType: String
    $ParentGlassFamilyAbbreviation: GlassFamilyUpdateOneWithoutDoorsInput
    $GlassFamilyAbbreviation: GlassUpdateOneWithoutDoorsInput
    $LiteQuantity: Int
    $LocationOnHouse: [String]
    $AvailableSizeDetails: [String]
    $AvailableSizes: [String]
    $DefaultSize: String
    $VisualizedHeight: Int
    $VisualizedWidth: Int
    $StyleGroups: [String]
    $RatingEligibility: [String]
    $LaunchYear: Int
    $RecentlyLaunched: Boolean
    $GlassSizeCategory: String
    $SupportedAccessories: [String]
    $AllowedSidelites: [String]
    $AllowedTransoms: [String]
    $DefaultSidelite: String
    $DefaultTransom: String
    $DefaultGlassWidth: String
    $AbstractPrice: Int
    $SOSPrice: Float
    $MDSPrice: Float
    $LowesStocked: Boolean
    $GlassType: String
    $GlassDesign: String
    $GlassFeatures: [String]
    $DefaultImageName: String
    $ImageUrl: String
    $Ordinal: Int
    $GlassAssociation: GlassAssociationUpdateOneWithoutDoorsInput
    $IsLimitedAvailability: Boolean
    $LimitedAvailabilityCategories: [String]
    $ProductTrends: String
    $DefaultDoorSurroundStyleNumber: String
    $GrainProfile: String
    $CurrentYearTrends: [String]
    $LydDisplay: Boolean
    $LydDefaultFinishId: String
    $LydAvailableFinishIds: [String]
    $LydGlassCategory: String
    $LydDisplayOrder: Int
    $LydDisplayCaming: String
    $FacetMaterial: String
    $FacetRecentlyLaunched: String
    $RelatedStyleID: String
    $AllowsHandlesets: Boolean
    $IsFlushGlazed: Boolean
    $DoorCollection: DoorCollectionUpdateOneWithoutDoorsInput
    $DoorLine: DoorLineUpdateOneWithoutDoorsInput
    $FrameProfiles: FrameProfileUpdateManyWithoutDoorsInput
    $DefaultFrameProfile: FrameProfileUpdateOneInput
    $StyleShape: StyleShapeUpdateOneWithoutDoorsInput
    $Sidelites: SideliteUpdateManyWithoutDoorsInput
    $StyleLayoutPairs: StyleLayoutPairCreateOneWithoutDoorsInput
  ) {
    createDoor(
      Brand: $Brand
      StyleNumber: $StyleNumber
      ArchitecturalStyle: $ArchitecturalStyle
      ProductLine: $ProductLine
      DoorType: $DoorType
      ParentGlassFamilyAbbreviation: $ParentGlassFamilyAbbreviation
      GlassFamilyAbbreviation: $GlassFamilyAbbreviation
      LiteQuantity: $LiteQuantity
      LocationOnHouse: $LocationOnHouse
      AvailableSizeDetails: $AvailableSizeDetails
      AvailableSizes: $AvailableSizes
      DefaultSize: $DefaultSize
      VisualizedHeight: $VisualizedHeight
      VisualizedWidth: $VisualizedWidth
      StyleGroups: $StyleGroups
      RatingEligibility: $RatingEligibility
      LaunchYear: $LaunchYear
      RecentlyLaunched: $RecentlyLaunched
      GlassSizeCategory: $GlassSizeCategory
      SupportedAccessories: $SupportedAccessories
      AllowedSidelites: $AllowedSidelites
      AllowedTransoms: $AllowedTransoms
      DefaultSidelite: $DefaultSidelite
      DefaultTransom: $DefaultTransom
      DefaultGlassWidth: $DefaultGlassWidth
      AbstractPrice: $AbstractPrice
      SOSPrice: $SOSPrice
      MDSPrice: $MDSPrice
      LowesStocked: $LowesStocked
      GlassType: $GlassType
      GlassDesign: $GlassDesign
      GlassFeatures: $GlassFeatures
      DefaultImageName: $DefaultImageName
      ImageUrl: $ImageUrl
      Ordinal: $Ordinal
      GlassAssociation: $GlassAssociation
      IsLimitedAvailability: $IsLimitedAvailability
      LimitedAvailabilityCategories: $LimitedAvailabilityCategories
      ProductTrends: $ProductTrends
      DefaultDoorSurroundStyleNumber: $DefaultDoorSurroundStyleNumber
      GrainProfile: $GrainProfile
      CurrentYearTrends: $CurrentYearTrends
      LydDisplay: $LydDisplay
      LydDefaultFinishId: $LydDefaultFinishId
      LydAvailableFinishIds: $LydAvailableFinishIds
      LydGlassCategory: $LydGlassCategory
      LydDisplayOrder: $LydDisplayOrder
      LydDisplayCaming: $LydDisplayCaming
      FacetMaterial: $FacetMaterial
      FacetRecentlyLaunched: $FacetRecentlyLaunched
      RelatedStyleID: $RelatedStyleID
      AllowsHandlesets: $AllowsHandlesets
      IsFlushGlazed: $IsFlushGlazed
      DoorCollection: $DoorCollection
      DoorLine: $DoorLine
      FrameProfiles: $FrameProfiles
      DefaultFrameProfile: $DefaultFrameProfile
      StyleShape: $StyleShape
      Sidelites: $Sidelites
      StyleLayoutPairs: $StyleLayoutPairs
    ) {
      StyleNumber
    }
  }
`;

const Doors = props => {
  const [createDoor, { data, loading, error }] = useMutation(
    CREATE_DOOR_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbDoor.json");
      // const item = data.doors[0];
      data.doors.map(async (item, index) => {
        const res = await createDoor({
          variables: {
            ...item,
            DoorCollection: {
              connect: {
                Abbreviation: item.DoorCollection.Abbreviation
              }
            },
            DoorLine: {
              connect: {
                Abbreviation: item.DoorLine.Abbreviation
              }
            },
            StyleShape: {
              connect: {
                Abbreviation: item.StyleShape.Abbreviation
              }
            },
            ParentGlassFamilyAbbreviation: {
              connect: {
                Abbreviation: item.ParentGlassFamilyAbbreviation
              }
            },
            GlassFamilyAbbreviation: {
              connect: {
                Abbreviation: item.GlassFamilyAbbreviation
              }
            },
            GlassAssociation: {
              connect: {
                GlassAssociation: item.GlassAssociation
              }
            },
            StyleLayoutPairs: {
              create: { ...item.StyleLayoutPairs }
            },
            DefaultFrameProfile: {
              connect: {
                Abbreviation: item.DefaultFrameProfile.Abbreviation
              }
            },
            FrameProfiles: {
              connect: item.FrameProfiles.map(item => ({
                Abbreviation: item.Abbreviation
              }))
            },
            Sidelites: {
              connect: item.Sidelites.map(item => ({
                StyleNumber: item.StyleNumber
              }))
            },
            Transoms: {
              connect: item.Transoms.map(item => ({
                StyleNumber: item.StyleNumber
              }))
            }
          }
        });
        console.log(index, data.doors.length, res.data.createDoor.StyleNumber);
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
      <p>loaded Doors</p>
    </Container>
  );
};

const Container = styled.div``;

export default Doors;
