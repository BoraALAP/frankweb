const { forwardTo } = require("prisma-binding");

const Query = {
  doors: forwardTo("db"),
  doorCollections: forwardTo("db"),
  doorLines: forwardTo("db"),
  frameProfiles: forwardTo("db"),
  sidelites: forwardTo("db"),
  styleShapes: forwardTo("db"),
  styleLayoutPairs: forwardTo("db"),
  glasses: forwardTo("db"),
  handleSets: forwardTo("db"),
  finishes: forwardTo("db"),
  glassFamilies: forwardTo("db"),
  camingOptions: forwardTo("db"),
  glassFeatures: forwardTo("db"),
  dividedLiteTypes: forwardTo("db"),
  grilleColors: forwardTo("db"),
  transoms: forwardTo("db"),
  locationOnHouse: forwardTo("db"),
  glassAssociations: forwardTo("db"),
  availableSizes: forwardTo("db"),
  architecturalStyle: forwardTo("db"),
  ratingEligibility: forwardTo("db"),
  glassSizes: forwardTo("db"),
  doorSurrounds: forwardTo("db"),
  doorsConnection: forwardTo("db"),
  doorCollectionsConnection: forwardTo("db"),
  doorLinesConnection: forwardTo("db"),
  styleShapesConnection: forwardTo("db"),
  sidelitesConnection: forwardTo("db"),
  styleLayoutPairsConnection: forwardTo("db"),
  glassFamiliesConnection: forwardTo("db"),
  handleSetsConnection: forwardTo("db"),
  finishesConnection: forwardTo("db"),
  camingOptionsConnection: forwardTo("db"),
  glassFeaturesConnection: forwardTo("db"),
  dividedLiteTypesConnection: forwardTo("db"),
  grilleColorsConnection: forwardTo("db"),
  transomsConnection: forwardTo("db"),
  glassAssociationsConnection: forwardTo("db"),
  glassesConnection: forwardTo("db"),
  frameProfilesConnection: forwardTo("db"),
  locationOnHousesConnection: forwardTo("db"),
  availableSizesesConnection: forwardTo("db"),
  glassSizesConnection: forwardTo("db"),
  doorSurroundsConnection: forwardTo("db"),

  user: forwardTo("db"),
  usersConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    //check if there is a current user id
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
};

module.exports = Query;
