const Mutation = {
  async createDoor(parent, args, ctx, info) {
    const door = await ctx.db.mutation.createDoor(
      {
        data: {
          ...args,
          ArchitecturalStyle: { set: args.ArchitecturalStyle },
          LocationOnHouse: { set: args.LocationOnHouse },
          AvailableSizeDetails: { set: args.AvailableSizeDetails },
          AvailableSizes: { set: args.AvailableSizes },
          StyleGroups: { set: args.StyleGroups },
          RatingEligibility: { set: args.RatingEligibility },
          SupportedAccessories: { set: args.SupportedAccessories },
          AllowedSidelites: { set: args.AllowedSidelites },
          AllowedTransoms: { set: args.AllowedTransoms },
          GlassFeatures: { set: args.GlassFeatures },
          LimitedAvailabilityCategories: {
            set: args.LimitedAvailabilityCategories
          },
          CurrentYearTrends: { set: args.CurrentYearTrends },
          LydAvailableFinishIds: { set: args.LydAvailableFinishIds },
          DoorCollection: args.DoorCollection,
          DoorLine: args.DoorLine,
          StyleShape: args.StyleShape,
          StyleLayoutPairs: args.StyleLayoutPairs,
          Sidelites: args.Sidelites,
          FrameProfiles: args.FrameProfiles,
          DefaultFrameProfile: args.DefaultFrameProfile
        }
      },
      info
    );
    return door;
  },
  async deleteDoor(parent, args, ctx, info) {
    const where = { Id: args.Id };
    const door = await ctx.db.mutation.deleteDoor({ where }, info);
    return door;
  },
  async deleteGlassAssociation(parent, args, ctx, info) {
    const where = { GlassAssociation: args.GlassAssociation };
    const door = await ctx.db.mutation.deleteGlassAssociation({ where }, info);
    return door;
  },

  async deleteGlassFamily(parent, args, ctx, info) {
    const where = { GlassFamily: args.GlassFamily };
    const door = await ctx.db.mutation.deleteGlassFamily({ where }, info);
    return door;
  },
  async createDoorCollection(parent, args, ctx, info) {
    const doorCollection = await ctx.db.mutation.createDoorCollection({
      data: {
        ...args
      }
    });
    return doorCollection;
  },
  async createDoorLine(parent, args, ctx, info) {
    const doorLine = await ctx.db.mutation.createDoorLine({
      data: {
        ...args
      }
    });
    return doorLine;
  },
  async createGlassFamily(parent, args, ctx, info) {
    const glassFamily = await ctx.db.mutation.createGlassFamily({
      data: {
        ...args,
        availableFeatures: { set: args.availableFeatures },
        availableDividedLiteTypes: { set: args.availableDividedLiteTypes }
      }
    });
    return glassFamily;
  },
  async createStyleShape(parent, args, ctx, info) {
    const styleShape = await ctx.db.mutation.createStyleShape({
      data: {
        ...args
      }
    });
    return styleShape;
  },
  async createFrameProfile(parent, args, ctx, info) {
    const frameProfile = await ctx.db.mutation.createFrameProfile({
      data: {
        ...args
      }
    });
    return frameProfile;
  },
  async createHandleSet(parent, args, ctx, info) {
    const handleSet = await ctx.db.mutation.createHandleSet({
      data: {
        ...args
      }
    });
    return handleSet;
  },
  async createFinish(parent, args, ctx, info) {
    const finish = await ctx.db.mutation.createFinish({
      data: {
        ...args
      }
    });
    return finish;
  },
  async createSidelite(parent, args, ctx, info) {
    const sidelite = await ctx.db.mutation.createSidelite(
      {
        data: {
          ...args,
          ArchitecturalStyle: { set: args.ArchitecturalStyle },
          LocationOnHouse: { set: args.LocationOnHouse },
          AvailableSizeDetails: { set: args.AvailableSizeDetails },
          AvailableSizes: { set: args.AvailableSizes },
          StyleGroups: { set: args.StyleGroups },
          RatingEligibility: { set: args.RatingEligibility },
          SupportedAccessories: { set: args.SupportedAccessories },
          AllowedSidelites: { set: args.AllowedSidelites },
          AllowedTransoms: { set: args.AllowedTransoms },
          GlassFeatures: { set: args.GlassFeatures },
          DefaultSize: { set: args.DefaultSize },
          LimitedAvailabilityCategories: {
            set: args.LimitedAvailabilityCategories
          },
          CurrentYearTrends: { set: args.CurrentYearTrends },
          LydAvailableFinishIds: { set: args.LydAvailableFinishIds },
          DoorCollection: args.DoorCollection,
          DoorLine: args.DoorLine,
          StyleShape: args.StyleShape,
          StyleLayoutPairs: args.StyleLayoutPairs,
          FrameProfiles: args.FrameProfiles,
          DefaultFrameProfile: args.DefaultFrameProfile
        }
      },
      info
    );
    return sidelite;
  },
  async createTransom(parent, args, ctx, info) {
    const transom = await ctx.db.mutation.createTransom(
      {
        data: {
          ...args,
          ArchitecturalStyle: { set: args.ArchitecturalStyle },
          LocationOnHouse: { set: args.LocationOnHouse },
          AvailableSizeDetails: { set: args.AvailableSizeDetails },
          AvailableSizes: { set: args.AvailableSizes },
          StyleGroups: { set: args.StyleGroups },
          RatingEligibility: { set: args.RatingEligibility },
          SupportedAccessories: { set: args.SupportedAccessories },
          AllowedSidelites: { set: args.AllowedSidelites },
          AllowedTransoms: { set: args.AllowedTransoms },
          GlassFeatures: { set: args.GlassFeatures },
          DefaultSize: { set: args.DefaultSize },
          LimitedAvailabilityCategories: {
            set: args.LimitedAvailabilityCategories
          },
          CurrentYearTrends: { set: args.CurrentYearTrends },
          LydAvailableFinishIds: { set: args.LydAvailableFinishIds },
          DoorCollection: args.DoorCollection,
          DoorLine: args.DoorLine,
          StyleShape: args.StyleShape,
          StyleLayoutPairs: args.StyleLayoutPairs,
          FrameProfiles: args.FrameProfiles,
          DefaultFrameProfile: args.DefaultFrameProfile
        }
      },
      info
    );
    return transom;
  },
  async createGrilleColor(parent, args, ctx, info) {
    const grilleColor = await ctx.db.mutation.createGrilleColor({
      data: {
        ...args
      }
    });
    return grilleColor;
  },
  async createDividedLiteType(parent, args, ctx, info) {
    const dividedLiteType = await ctx.db.mutation.createDividedLiteType({
      data: {
        ...args
      }
    });
    return dividedLiteType;
  },
  async createCamingOption(parent, args, ctx, info) {
    const camingOption = await ctx.db.mutation.createCamingOption({
      data: {
        ...args
      }
    });
    return camingOption;
  },
  async createGlassFeature(parent, args, ctx, info) {
    const glassFeature = await ctx.db.mutation.createGlassFeature({
      data: {
        ...args
      }
    });
    return glassFeature;
  },
  async createGlass(parent, args, ctx, info) {
    const glass = await ctx.db.mutation.createGlass({
      data: {
        ...args,
        Summaries: { set: args.Summaries },
        ParentGlassFamilyAbbreviation: args.ParentGlassFamilyAbbreviation,
        DividedLiteType: args.DividedLiteType,
        CamingOptionsByFrameProfile: args.CamingOptionsByFrameProfile,
        AllCamingOptions: args.AllCamingOptions,
        GrilleColors: args.GrilleColors,
        GlassFeatures: args.GlassFeatures
      }
    });
    return glass;
  },
  async createGlassAssociation(parent, args, ctx, info) {
    const glassAssociation = await ctx.db.mutation.createGlassAssociation({
      data: {
        ...args
      }
    });
    return glassAssociation;
  }
};

module.exports = Mutation;
