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
  glassAssociations: forwardTo("db")
};

module.exports = Query;
