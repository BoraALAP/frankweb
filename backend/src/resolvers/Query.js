const { forwardTo } = require("prisma-binding");

const Query = {
  doors: forwardTo("db"),
  doorCollections: forwardTo("db"),
  doorLines: forwardTo("db"),
  frameProfileses: forwardTo("db"),
  sideliteses: forwardTo("db"),
  styleShapes: forwardTo("db"),
  styleLayoutPairses: forwardTo("db")
};

module.exports = Query;
