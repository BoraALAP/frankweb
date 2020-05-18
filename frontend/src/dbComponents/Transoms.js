import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const CREATE_TRANSOMS_MUTATION = gql`
  mutation CREATE_TRANSOMS_MUTATION(
    $Brand: String
    $StyleNumber: String
    $ArchitecturalStyle: ArchitecturalStyleUpdateManyWithoutTransomsInput
    $DoorCollection: DoorCollectionUpdateOneWithoutTransomsInput
    $DoorLine: DoorLineUpdateOneWithoutTransomsInput
    $FrameProfiles: FrameProfileUpdateManyWithoutTransomsInput
    $DefaultFrameProfile: FrameProfileUpdateOneInput
    $StyleShape: StyleShapeUpdateOneWithoutTransomsInput
    $StyleLayoutPairs: StyleLayoutPairUpdateOneWithoutTransomsInput
    $ProductLine: String
    $DoorType: String
    $ParentGlassFamilyAbbreviation: GlassFamilyUpdateOneWithoutTransomsInput
    $GlassFamilyAbbreviation: GlassUpdateOneWithoutTransomsInput
    $LiteQuantity: Int
    $LocationOnHouse: LocationOnHouseUpdateManyWithoutTransomsInput
    $AvailableSizeDetails: [String]
    $AvailableSizes: AvailableSizesUpdateManyWithoutTransomsInput
    $DefaultSize: AvailableSizesUpdateOneInput
    $VisualizedHeight: Int
    $VisualizedWidth: Int
    $StyleGroups: [String]
    $RatingEligibility: RatingEligibilityUpdateManyWithoutTransomsInput
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
    $GlassAssociation: GlassAssociationUpdateOneWithoutTransomsInput
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
    createTransom(
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

const UPDATE_TRANSOM_MUTATION = gql`
  mutation UPDATE_TRANSOM_MUTATION(
    $StyleNumber: String
    # $RelatedFamily: GlassFamilyUpdateManyInput
    # $RelatedDoors: DoorUpdateManyInput
    # $ImageUrl: String
    $GlassSizeCategory: GlassSizeUpdateOneWithoutTransomsInput
  ) {
    updateTransom(
      where: { StyleNumber: $StyleNumber }
      data: {
        # RelatedFamily: $RelatedFamily,
        # RelatedDoors: $RelatedDoors
        # ImageUrl: $ImageUrl
        GlassSizeCategory: $GlassSizeCategory
      }
    ) {
      StyleNumber
      ImageUrl
    }
  }
`;

const Transoms = (props) => {
  const [createTransom] = useMutation(CREATE_TRANSOMS_MUTATION);

  const [updateTransom] = useMutation(UPDATE_TRANSOM_MUTATION);
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/dbTransoms.json");

      data.transoms.map(async (item, index) => {
        const update = async () => {
          const res2 = await updateTransom({
            variables: {
              StyleNumber: item.StyleNumber,
              // ImageUrl: item.ImageUrl,
              GlassSizeCategory: {
                connect: {
                  Name: item.GlassSizeCategory,
                },
              },
            },
          });
          console.log(res2);
        };

        const create = async () => {
          const res = await createTransom({
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
            },
          });
        };

        // create()
        update();
        console.log(index, data.transoms.length);
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
      <p>loaded Transoms</p>
    </Container>
  );
};

const Container = styled.div``;

export default Transoms;
