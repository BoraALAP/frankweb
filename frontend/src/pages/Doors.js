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
    $ParentGlassFamilyAbbreviation: String
    $GlassFamilyAbbreviation: String
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
    $GlassAssociation: String
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
    $DoorCollection: DoorCollectionUpdateOneWithoutDoorsInput # $DoorLine: DoorLineUpdateOneWithoutDoorsInput
  ) # $FrameProfiles: FrameProfilesUpdateManyWithoutDoorsInput
  # $DefaultFrameProfile: FrameProfilesUpdateOneInput
  # $StyleShape: StyleShapeUpdateOneWithoutDoorsInput
  # $Sidelites: SidelitesUpdateManyWithoutDoorsInput
  # $StyleLayoutPairs: StyleLayoutPairsUpdateOneWithoutDoorsInput
  {
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
      DoorCollection: $DoorCollection # DoorLine: $DoorLine
    ) # FrameProfiles: $FrameProfiles
    # DefaultFrameProfile: $DefaultFrameProfile
    # StyleShape: $StyleShape
    # Sidelites: $Sidelites
    # StyleLayoutPairs: $StyleLayoutPairs
    {
      Brand
      StyleNumber
      ArchitecturalStyle
      ProductLine
      DoorType
      ParentGlassFamilyAbbreviation
      GlassFamilyAbbreviation
      LiteQuantity
      LocationOnHouse
      AvailableSizeDetails
      AvailableSizes
      DefaultSize
      VisualizedHeight
      VisualizedWidth
      StyleGroups
      RatingEligibility
      LaunchYear
      RecentlyLaunched
      GlassSizeCategory
      SupportedAccessories
      AllowedSidelites
      AllowedTransoms
      DefaultSidelite
      DefaultTransom
      DefaultGlassWidth
      AbstractPrice
      SOSPrice
      MDSPrice
      LowesStocked
      GlassType
      GlassDesign
      GlassFeatures
      DefaultImageName
      ImageUrl
      Ordinal
      GlassAssociation
      IsLimitedAvailability
      LimitedAvailabilityCategories
      ProductTrends
      DefaultDoorSurroundStyleNumber
      GrainProfile
      CurrentYearTrends
      LydDisplay
      LydDefaultFinishId
      LydAvailableFinishIds
      LydGlassCategory
      LydDisplayOrder
      LydDisplayCaming
      FacetMaterial
      FacetRecentlyLaunched
      RelatedStyleID
      AllowsHandlesets
      IsFlushGlazed
      DoorCollection {
        Brand
        Name
        ShortName
        Abbreviation
        Material
        Surface
        Accugrain
        Paintable
        Stainable
      }
      # DoorLine {
      #   Brand
      #   Name
      #   ShortName
      #   Abbreviation
      #   ProductLineId
      #   DetailUrl
      #   SuppressCollectionName
      # }
      # FrameProfiles {
      #   Abbreviation
      #   Name
      #   ImgURL
      #   DoorCollectionAbbreviation
      #   StyleShapeAbbreviation
      # }
      # DefaultFrameProfile {
      #   Abbreviation
      #   Name
      #   ImgURL
      #   DoorCollectionAbbreviation
      #   StyleShapeAbbreviation
      # }
      # StyleShape {
      #   Brand
      #   Name
      #   Abbreviation
      #   TopCut
      # }
      # Sidelites {
      #   DoorType
      #   ReferencedByStyleNumbers
      #   StyleNumber
      #   DefaultImageName
      #   VisualizedWidth
      #   ImageUrl
      # }
      # StyleLayoutPairs {
      #   Double_Left
      #   Double_Right
      #   Triple_Left
      #   Triple_Center
      #   Triple_Right
      #   Quad_Left_Outer
      #   Quad_Left_Inner
      #   Quad_Right_Inner
      #   Quad_Right_Outer
      #   Must_Be_Double
      # }
    }
  }
`;

const Doors = props => {
  const [state, setState] = useState(undefined);
  const [createDoor, { data, loading, error }] = useMutation(
    CREATE_DOOR_MUTATION
  );
  // const { data, loading, error } = useQuery(USERS_QUERY);

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get("./data/db.json");
      setState(data.doorStyles[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const run = async () => {
    if (state !== undefined) {
      console.log(state);
      const res = await createDoor({
        variables: {
          ...state,
          DoorCollection: {
            create: state.DoorCollection
          }
          // DoorLine: {
          //   create: state.DoorLine,
          //   connect: { Abbreviation: state.DoorLine.Abbreviation }
          // },
          // FrameProfiles: state.FrameProfiles.map(item => ({
          //   create: {
          //     Abbreviation: item.Abbreviation,
          //     Name: item.Name,
          //     ImgURL: item.ImgURL,
          //     Abbreviation: item.Abbreviation,
          //     StyleShapeAbbreviation: item.StyleShapeAbbreviation
          //   },
          //   connect: {
          //     Abbreviation: item.Abbreviation
          //   }
          // })),

          // Sidelites: state.Sidelites.map(item => ({
          //   create: {
          //     DoorType: item.DoorType,
          //     ReferencedByStyleNumbers: item.ReferencedByStyleNumbers,
          //     StyleNumber: item.StyleNumber,
          //     DefaultImageName: item.DefaultImageName,
          //     VisualizedWidth: item.VisualizedWidth,
          //     ImageUrl: item.ImageUrl
          //   },
          //   connect: {
          //     StyleNumber: item.StyleNumber
          //   }
          // })),
          // StyleShape: {
          //   create: state.StyleShape,
          //   connect: {
          //     Abbreviation: state.StyleShape.Abbreviation
          //   }
          // },
          // StyleLayoutPairs: {
          //   create: state.StyleLayoutPairs
          // },
          // DefaultFrameProfile: {
          //   connect: {
          //     Abbreviation: state.DefaultFrameProfile.Abbreviation
          //   },
          //   create: state.DefaultFrameProfile
          // }
        }
      });
      console.log(res);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <button onClick={run}>add</button>
    </Container>
  );
};

const Container = styled.div``;

export default Doors;
