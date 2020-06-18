import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title = "Windows and Doors" }) => (
  <Helmet>
    <meta charset="utf-8" />
    <link
      rel="icon"
      href={`${process.env.REACT_APP_FRONT_END_URL}/head/favicon.ico`}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="google-site-verification"
      content="kAqXcbSJF03EMOxfXywJMBBEYBIpyHUQbK3CybZonlE"
    />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link
      rel="apple-touch-icon"
      href={`${process.env.REACT_APP_FRONT_END_URL}/head/logo192.png`}
    />
    <link
      rel="manifest"
      href={`${process.env.REACT_APP_FRONT_END_URL}/head/manifest.json`}
    />
    <title>Frank - {title}</title>
  </Helmet>
);

export default Meta;
