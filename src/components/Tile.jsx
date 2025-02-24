import React from "react";
import { Link } from "react-router";

function Tile(props) {
  return (
    <div className="flex flex-col rounded-lg hover:outline-2">
      <Link to={"/" + props.item.id}>
        <img
          src={props.item.image}
          alt={props.item.title}
          className="object-cover w-full h-48 border-3 rounded-lg hover:rounded-b-none"
        />
        <div
          className={`flex flex-row p-3 ${
            props.darkmode ? "text-neutral-300" : "text-black"
          }`}
        >
          <p className="basis-1/3">${props.item.price}</p>
          <p className="basis-2/3 font-bold">{props.item.title}</p>
        </div>
      </Link>
    </div>
  );
}

export default Tile;
