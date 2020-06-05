const Mutation = {
  async createDoor(parent, args, ctx, info) {
    const door = await ctx.db.mutation.createDoor(
      {
        data: {
          ...args,
          ArchitecturalStyle: args.ArchitecturalStyle,
          AvailableSizeDetails: { set: args.AvailableSizeDetails },
          AvailableSizes: args.AvailableSizes,
          DefaultSize: args.DefaultSize,
          StyleGroups: { set: args.StyleGroups },
          RatingEligibility: args.RatingEligibility,
          SupportedAccessories: { set: args.SupportedAccessories },
          AllowedSidelites: { set: args.AllowedSidelites },
          AllowedTransoms: { set: args.AllowedTransoms },
          GlassFeatures: { set: args.GlassFeatures },
          LimitedAvailabilityCategories: {
            set: args.LimitedAvailabilityCategories,
          },
          CurrentYearTrends: { set: args.CurrentYearTrends },
          LydAvailableFinishIds: { set: args.LydAvailableFinishIds },
          DoorCollection: args.DoorCollection,
          DoorLine: args.DoorLine,
          StyleShape: args.StyleShape,
          LocationOnHouse: args.LocationOnHouse,
          StyleLayoutPairs: args.StyleLayoutPairs,
          Sidelites: args.Sidelites,
          FrameProfiles: args.FrameProfiles,
          DefaultFrameProfile: args.DefaultFrameProfile,
          RelatedFamily: args.RelatedFamily,
          RelatedGlasses: args.RelatedGlasses,
          Finishes: args.Finishes,
          GlassSizeCategory: args.GlassSizeCategory,
          DefaultDoorSurroundStyleNumber: args.DefaultDoorSurroundStyleNumber,
          Finish: args.Finish,
          FrameFinish: args.FrameFinish,
          // RelatedDoors: args.RelatedDoors,
        },
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
  async deleteManyDoors(parent, args, ctx, info) {
    const where = { Id: args.Id };
    const door = await ctx.db.mutation.deleteManyDoors({ where }, info);
    return door;
  },
  async updateDoor(parent, args, ctx, info) {
    console.log(args);
    const door = await ctx.db.mutation.updateDoor(
      {
        ...args,
      },
      info
    );
    return door;
  },
  async deleteManyTransoms(parent, args, ctx, info) {
    const where = { Id: args.Id };
    const door = await ctx.db.mutation.deleteManyTransoms({ where }, info);
    return door;
  },
  async deleteManySidelites(parent, args, ctx, info) {
    const where = { Id: args.Id };
    const door = await ctx.db.mutation.deleteManySidelites({ where }, info);
    return door;
  },
  async deleteManyHandleSets(parent, args, ctx, info) {
    const where = { Id: args.Id };
    const door = await ctx.db.mutation.deleteManyHandleSets({ where }, info);
    return door;
  },
  async createDoorCollection(parent, args, ctx, info) {
    const doorCollection = await ctx.db.mutation.createDoorCollection({
      data: {
        ...args,
      },
    });
    return doorCollection;
  },
  async createDoorLine(parent, args, ctx, info) {
    const doorLine = await ctx.db.mutation.createDoorLine({
      data: {
        ...args,
      },
    });
    return doorLine;
  },
  async createGlassFamily(parent, args, ctx, info) {
    const glassFamily = await ctx.db.mutation.createGlassFamily({
      data: {
        ...args,
        AvailableFeatures: { set: args.AvailableFeatures },
        AvailableDividedLiteTypes: { set: args.AvailableDividedLiteTypes },
      },
    });
    return glassFamily;
  },
  async updateGlassFamily(parent, args, ctx, info) {
    console.log(args);
    const glassFamily = await ctx.db.mutation.updateGlassFamily(
      {
        ...args,
      },
      info
    );
    return glassFamily;
  },
  async deleteManyGlassFamilies(parent, args, ctx, info) {
    const where = { Id: args.Id };
    const door = await ctx.db.mutation.deleteManyGlassFamilies({ where }, info);
    return door;
  },
  async createStyleShape(parent, args, ctx, info) {
    const styleShape = await ctx.db.mutation.createStyleShape({
      data: {
        ...args,
      },
    });
    return styleShape;
  },
  async createFrameProfile(parent, args, ctx, info) {
    const frameProfile = await ctx.db.mutation.createFrameProfile({
      data: {
        ...args,
      },
    });
    return frameProfile;
  },
  async createGlassSize(parent, args, ctx, info) {
    const glassSize = await ctx.db.mutation.createGlassSize({
      data: {
        ...args,
      },
    });
    return glassSize;
  },
  async createDoorSurround(parent, args, ctx, info) {
    const doorSurround = await ctx.db.mutation.createDoorSurround({
      data: {
        ...args,
      },
    });
    return doorSurround;
  },
  async createHandleSet(parent, args, ctx, info) {
    const handleSet = await ctx.db.mutation.createHandleSet({
      data: {
        ...args,
      },
    });
    return handleSet;
  },
  async createFinish(parent, args, ctx, info) {
    const finish = await ctx.db.mutation.createFinish({
      data: {
        ...args,
      },
    });
    return finish;
  },
  async createSidelite(parent, args, ctx, info) {
    const sidelite = await ctx.db.mutation.createSidelite(
      {
        data: {
          ...args,
          ArchitecturalStyle: args.ArchitecturalStyle,
          AvailableSizeDetails: { set: args.AvailableSizeDetails },
          AvailableSizes: args.AvailableSizes,
          DefaultSize: args.DefaultSize,
          StyleGroups: { set: args.StyleGroups },
          RatingEligibility: args.RatingEligibility,
          SupportedAccessories: { set: args.SupportedAccessories },
          AllowedSidelites: { set: args.AllowedSidelites },
          AllowedTransoms: { set: args.AllowedTransoms },
          GlassFeatures: { set: args.GlassFeatures },

          LimitedAvailabilityCategories: {
            set: args.LimitedAvailabilityCategories,
          },
          CurrentYearTrends: { set: args.CurrentYearTrends },
          LydAvailableFinishIds: { set: args.LydAvailableFinishIds },
          DoorCollection: args.DoorCollection,
          LocationOnHouse: args.LocationOnHouse,
          DoorLine: args.DoorLine,
          StyleShape: args.StyleShape,
          StyleLayoutPairs: args.StyleLayoutPairs,
          FrameProfiles: args.FrameProfiles,
          DefaultFrameProfile: args.DefaultFrameProfile,
        },
      },
      info
    );
    return sidelite;
  },
  async updateSidelite(parent, args, ctx, info) {
    console.log(args);
    const sidelite = await ctx.db.mutation.updateSidelite(
      {
        ...args,
      },
      info
    );
    return sidelite;
  },
  async createTransom(parent, args, ctx, info) {
    console.log(args);

    const transom = await ctx.db.mutation.createTransom(
      {
        data: {
          ...args,
          ArchitecturalStyle: args.ArchitecturalStyle,
          AvailableSizeDetails: { set: args.AvailableSizeDetails },
          AvailableSizes: args.AvailableSizes,
          DefaultSize: args.DefaultSize,
          StyleGroups: { set: args.StyleGroups },
          RatingEligibility: args.RatingEligibility,
          SupportedAccessories: { set: args.SupportedAccessories },
          AllowedSidelites: { set: args.AllowedSidelites },
          AllowedTransoms: { set: args.AllowedTransoms },
          GlassFeatures: { set: args.GlassFeatures },

          LimitedAvailabilityCategories: {
            set: args.LimitedAvailabilityCategories,
          },
          CurrentYearTrends: { set: args.CurrentYearTrends },
          LydAvailableFinishIds: { set: args.LydAvailableFinishIds },
          DoorCollection: args.DoorCollection,
          LocationOnHouse: args.LocationOnHouse,
          DoorLine: args.DoorLine,
          StyleShape: args.StyleShape,
          StyleLayoutPairs: args.StyleLayoutPairs,
          FrameProfiles: args.FrameProfiles,
          DefaultFrameProfile: args.DefaultFrameProfile,
        },
      },
      info
    );
    return transom;
  },
  async updateTransom(parent, args, ctx, info) {
    console.log(args);
    const transom = await ctx.db.mutation.updateTransom(
      {
        ...args,
      },
      info
    );
    return transom;
  },
  async createGrilleColor(parent, args, ctx, info) {
    const grilleColor = await ctx.db.mutation.createGrilleColor({
      data: {
        ...args,
      },
    });
    return grilleColor;
  },
  async createDividedLiteType(parent, args, ctx, info) {
    const dividedLiteType = await ctx.db.mutation.createDividedLiteType({
      data: {
        ...args,
      },
    });
    return dividedLiteType;
  },
  async createCamingOption(parent, args, ctx, info) {
    const camingOption = await ctx.db.mutation.createCamingOption({
      data: {
        ...args,
      },
    });
    return camingOption;
  },
  async createGlassFeature(parent, args, ctx, info) {
    const glassFeature = await ctx.db.mutation.createGlassFeature({
      data: {
        ...args,
      },
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
        GlassFeatures: args.GlassFeatures,
      },
    });
    return glass;
  },
  async createGlassAssociation(parent, args, ctx, info) {
    const glassAssociation = await ctx.db.mutation.createGlassAssociation({
      data: {
        ...args,
      },
    });
    return glassAssociation;
  },
  async createRatingEligibility(parent, args, ctx, info) {
    const ratingEligibility = await ctx.db.mutation.createRatingEligibility({
      data: {
        ...args,
      },
    });
    return ratingEligibility;
  },
  async createArchitecturalStyle(parent, args, ctx, info) {
    const architecturalStyle = await ctx.db.mutation.createArchitecturalStyle({
      data: {
        ...args,
      },
    });
    return architecturalStyle;
  },
  async createAvailableSizes(parent, args, ctx, info) {
    console.log(args);

    const availableSizes = await ctx.db.mutation.createAvailableSizes({
      data: {
        ...args,
      },
    });
    return availableSizes;
  },
  async updateAvailableSizes(parent, args, ctx, info) {
    console.log(args);
    const availableSizes = await ctx.db.mutation.updateAvailableSizes(
      {
        ...args,
      },
      info
    );
    return availableSizes;
  },
  async deleteGlassAssociation(parent, args, ctx, info) {
    const where = { GlassAssociation: args.GlassAssociation };
    const door = await ctx.db.mutation.deleteGlassAssociation({ where }, info);
    return door;
  },
  async createLocationOnHouse(parent, args, ctx, info) {
    const location = await ctx.db.mutation.createLocationOnHouse({
      data: {
        ...args,
      },
    });
    return location;
  },
  async deleteManyStyleLayoutPairs(parent, args, ctx, info) {
    const where = { Id: args.Id };
    const door = await ctx.db.mutation.deleteManyStyleLayoutPairs(
      { where },
      info
    );
    return door;
  },
};

module.exports = Mutation;
