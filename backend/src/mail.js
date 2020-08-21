const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  debug: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text) => `
  <div className="email" style="
    border: 1px solid black;
    padding: 24px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 16px;
    ">
    <h2>Hello!</h2>
    <p>${text}</p>
  </div>
`;


const makeAVerifyEmail = (text) => `
  <div className="email" style="
    border: 1px solid black;
    padding: 24px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 16px;
    ">
    <h2>Hello!</h2>
    <p>${text}</p>
  </div>
`;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
exports.makeAVerifyEmail = makeAVerifyEmail;
