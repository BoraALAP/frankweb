import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_SIDELITES_MUTATION = gql`
  mutation CREATE_SIDELITES_MUTATION(
    $Brand: String
    $StyleNumber: String
    $ArchitecturalStyle: ArchitecturalStyleUpdateManyWithoutSidelitesInput
    $DoorCollection: DoorCollectionUpdateOneWithoutSidelitesInput
    $DoorLine: DoorLineUpdateOneWithoutSidelitesInput
    $FrameProfiles: FrameProfileUpdateManyWithoutSidelitesInput
    $DefaultFrameProfile: FrameProfileUpdateOneInput
    $StyleShape: StyleShapeUpdateOneWithoutSidelitesInput
    $StyleLayoutPairs: StyleLayoutPairUpdateOneWithoutSidelitesInput
    $ProductLine: String
    $DoorType: String
    $ParentGlassFamilyAbbreviation: GlassFamilyUpdateOneWithoutSidelitesInput
    $GlassFamilyAbbreviation: GlassUpdateOneWithoutSidelitesInput
    $LiteQuantity: Int
    $LocationOnHouse: LocationOnHouseUpdateManyWithoutSidelitesInput
    $AvailableSizeDetails: [String]
    $AvailableSizes: AvailableSizesUpdateManyWithoutSidelitesInput
    $DefaultSize: AvailableSizesUpdateOneInput
    $VisualizedHeight: Int
    $VisualizedWidth: Int
    $StyleGroups: [String]
    $RatingEligibility: RatingEligibilityUpdateManyWithoutSidelitesInput
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
    $GlassAssociation: GlassAssociationUpdateOneWithoutSidelitesInput
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
  ) {
    createSidelite(
      Brand: $Brand
      StyleNumber: $StyleNumber
      ArchitecturalStyle: $ArchitecturalStyle
      DoorCollection: $DoorCollection
      DoorLine: $DoorLine
      FrameProfiles: $FrameProfiles
      DefaultFrameProfile: $DefaultFrameProfile
      StyleShape: $StyleShape
      StyleLayoutPairs: $StyleLayoutPairs
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
    ) {
      Id
      Brand
      StyleNumber
    }
  }
`;

const Sidelites = (props) => {
  const [createSidelite, { data, loading, error }] = useMutation(
    CREATE_SIDELITES_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    let num = 0;
    try {
      const { data } = await axios.get("./data/dbSidelites.json");

      const timer = setInterval(async () => {
        console.log(num, data.doorStyles.length);

        const item = data.doorStyles[num];
        console.log(num, item.DoorCollection.Abbreviation);
        num++;
        const res = await createSidelite({
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
            ParentGlassFamilyAbbreviation: {
              connect: {
                Abbreviation: item.ParentGlassFamilyAbbreviation,
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
          },
        });

        console.log(res);

        if (num >= data.doorStyles.length) {
          console.log("Done!");
          clearInterval(timer);
        }
      }, 200);
    } catch (error) {
      console.log(error, num);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <p>loaded Sidelites</p>
    </Container>
  );
};

const Container = styled.div``;

export default Sidelites;
