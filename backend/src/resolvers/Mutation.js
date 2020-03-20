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
          DoorCollection: {
            create: args.DoorCollection.create,
            connect: { Abbreviation: args.DoorCollection.create.Abbreviation }
          }
          // DoorCollection: args.DoorCollection,
          // DoorLine: args.DoorLine,
          // StyleShape: args.StyleShape,
          // StyleLayoutPairs: args.StyleLayoutPairs,
          // Sidelites: args.Sidelites,
          // FrameProfiles: args.FrameProfiles,
          // DefaultFrameProfile: args.DefaultFrameProfile
        }
      },
      info
    );
    return door;
  },
  async createDoorCollection(parent, args, ctx, info) {
    const doorCollection = await ctx.db.mutation.createDoorCollection({
      data: {
        ...args
      }
    });
    return doorCollection;
  }
};

module.exports = Mutation;
