require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

//TODO use express middleware to handle cookies

//TODO use express middleware to handle cookies

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_DEV,
    },
  },
  (deets) => {
    console.log(`server is running on port http://localhost:${deets.port}`);
  }
);
