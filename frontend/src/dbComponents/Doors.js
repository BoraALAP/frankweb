import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_DOOR_MUTATION = gql`
  mutation CREATE_DOOR_MUTATION(
    $Brand: String
    $StyleNumber: String
    $ArchitecturalStyle: ArchitecturalStyleUpdateManyWithoutDoorsInput
    $ProductLine: String
    $DoorType: String
    $ParentGlassFamilyAbbreviation: GlassFamilyUpdateOneWithoutDoorsInput
    $GlassFamilyAbbreviation: GlassUpdateOneWithoutDoorsInput
    $LiteQuantity: Int
    $LocationOnHouse: LocationOnHouseUpdateManyWithoutDoorsInput
    $AvailableSizeDetails: [String]
    $AvailableSizes: AvailableSizesUpdateManyWithoutDoorsInput
    $DefaultSize: AvailableSizesUpdateOneInput
    $VisualizedHeight: Int
    $VisualizedWidth: Int
    $StyleGroups: [String]
    $RatingEligibility: RatingEligibilityUpdateManyWithoutDoorsInput
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
    $Transoms: TransomUpdateManyWithoutDoorsInput
    $StyleLayoutPairs: StyleLayoutPairCreateOneWithoutDoorsInput
    $RelatedGlasses: GlassUpdateManyInput # $RelatedDoors: DoorUpdateManyInput
    $Finishes: FinishUpdateManyWithoutDoorsInput
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
      Transoms: $Transoms
      StyleLayoutPairs: $StyleLayoutPairs
      RelatedGlasses: $RelatedGlasses # RelatedDoors: $RelatedDoors
      Finishes: $Finishes
    ) {
      StyleNumber
    }
  }
`;

const UPDATE_DOOR_MUTATION = gql`
  mutation UPDATE_DOOR_MUTATION(
    $StyleNumber: String
    $RelatedDoors: DoorUpdateManyInput
  ) {
    updateDoor(
      where: { StyleNumber: $StyleNumber }
      data: { RelatedDoors: $RelatedDoors }
    ) {
      StyleNumber
    }
  }
`;

const Doors = (props) => {
  const [createDoor] = useMutation(CREATE_DOOR_MUTATION);
  const [updateDoor, { error }] = useMutation(UPDATE_DOOR_MUTATION);
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    let num = 0;
    try {
      const { data } = await axios.get("./data/dbDoor.json");

      const timer = setInterval(async () => {
        console.log(num, data.doorStyles.length);
        const item = data.doorStyles[num];
        num++;
        const update = async () => {
          const res2 = await updateDoor({
            variables: {
              StyleNumber: item.StyleNumber,

              // Transoms: {
              //   connect: item.Transoms.map((item) => ({
              //     StyleNumber: item.StyleNumber,
              //   })),
              // },
              RelatedDoors: {
                connect: item.RelatedDoors.map((item) => ({
                  StyleNumber: item.StyleNumber,
                })),
              },
            },
          });
          console.log(res2);
        };

        const create = async () => {
          const res = await createDoor({
            variables: {
              ...item,
              DoorCollection: {
                connect: {
                  Abbreviation: item.DoorCollection.Abbreviation,
                },
              },
              DoorLine: {
                connect: {
                  Abbreviation: item.DoorLine.Abbreviation,
                },
              },
              StyleShape: {
                connect: {
                  Abbreviation: item.StyleShape.Abbreviation,
                },
              },
              LocationOnHouse: {
                connect: item.LocationOnHouse.map((it) => ({ Name: it })),
              },
              AvailableSizes: {
                connect: item.AvailableSizes.map((it) => ({
                  Size: it,
                })),
              },
              DefaultSize: {
                connect: {
                  Size: item.DefaultSize,
                },
              },

              ArchitecturalStyle: {
                connect: item.ArchitecturalStyle.map((it) => ({
                  Style: it,
                })),
              },
              RatingEligibility: {
                connect: item.RatingEligibility.map((it) => ({
                  Name: it,
                })),
              },
              ParentGlassFamilyAbbreviation: {
                connect: {
                  Abbreviation: item.ParentGlassFamilyAbbreviation,
                },
              },
              GlassFamilyAbbreviation: {
                connect: {
                  Abbreviation: item.GlassFamilyAbbreviation,
                },
              },
              GlassAssociation: {
                connect: {
                  Association: item.GlassAssociation,
                },
              },
              StyleLayoutPairs: {
                create: { ...item.StyleLayoutPairs },
              },
              DefaultFrameProfile: {
                connect: {
                  Abbreviation: item.DefaultFrameProfile.Abbreviation,
                },
              },
              Finishes: {
                connect: item.Finishes.map((item) => ({
                  Name: item.Name,
                })),
              },
              FrameProfiles: {
                connect: item.FrameProfiles.map((item) => ({
                  Abbreviation: item.Abbreviation,
                })),
              },
              Sidelites: {
                connect: item.Sidelites.map((item) => ({
                  StyleNumber: item.StyleNumber,
                })),
              },
              Transoms: {
                connect: item.Transoms.map((item) => ({
                  StyleNumber: item.StyleNumber,
                })),
              },
              RelatedGlasses: {
                connect: item.RelatedGlasses.map((item) => ({
                  Abbreviation: item.Abbreviation,
                })),
              },
              // RelatedDoors: {
              //   connect: item.RelatedDoors.map((item) => ({
              //     StyleNumber: item.StyleNumber,
              //   })),
              // },
            },
          });

          console.log(res);
          console.log(error);
        };

        update();
        // create();

        if (num >= data.doorStyles.length) {
          console.log("Done!");
          clearInterval(timer);
        }
      }, 1000);
    } catch (error) {
      console.log(error, num);
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
