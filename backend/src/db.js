// this file connects to the remote prisma DB and gives us ability to quesry it with JS

const { Prisma } = require("prisma-binding");

const db = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_PRODENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true,
});

module.exports = db;
