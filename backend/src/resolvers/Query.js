const { forwardTo } = require("prisma-binding");

const Query = {
  users: forwardTo("db"),
  posts: forwardTo("db")
};

module.exports = Query;
