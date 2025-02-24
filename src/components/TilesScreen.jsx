import React from "react";
import Tile from "./Tile";

function TileScreen(props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap:5 lg:grid-cols-5 lg:gap-6">
      {props.items.map((item, index) => (
        <Tile key={index} item={item} darkmode={props.darkmode} />
      ))}
    </div>
  );
}

export default TileScreen;
