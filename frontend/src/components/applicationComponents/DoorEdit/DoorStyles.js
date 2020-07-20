import React from "react";

import Layout from "./Layout";

import RelatedItem from "../UI/RelatedItem";

const DoorStyles = ({ data }) => {
  return (
    <Layout
      title="Would you like to checkout similar Doors?"
      gridSize={3}
      component="DoorStyles"
    >
      {data.map((item, index) => (
        <RelatedItem
          key={item.Id}
          StyleNumber={item.StyleNumber}
          ImageUrl={item.ImageUrl}
          Id={item.Id}
          Type={item.__typename}
          Link="selected"
        />
      ))}
    </Layout>
  );
};

export default DoorStyles;
