const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

//TODO use express middleware to handle cookies
server.express.use(cookieParser());

//TODO use express middleware to handle cookies
//Decode the JWT so we can get the user ID on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    console.log(userId);

    req.userId = userId;
    //put the user Id onto the req for future request to access
  }
  next();
});

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
