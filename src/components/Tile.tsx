import React, { FC } from "react";
import { Link } from "react-router";
import { Item } from "./useItems";

interface TileProps {
  item: Item;
  darkmode: boolean;
}

const Tile: FC<TileProps> = (props) => {
  return (
    <div className="flex flex-col rounded-lg hover:outline-2">
      <Link to={"/" + props.item._id}>
        <img
          src={props.item.image ?? "/images/noimage.jpg"}
          alt={props.item.title}
          className="object-cover w-full h-48 border-3 rounded-lg hover:rounded-b-none"
        />
        <div
          className={`flex flex-row p-3 ${
            props.darkmode ? "text-neutral-300" : "text-black"
          }`}
        >
          {props.item.price ? (
            <p className="basis-1/3">${props.item.price}</p>
          ) : null}
          <p
            className={`font-bold ${
              props.item.price ? "basis-2/3" : "flex justify-center w-full"
            }`}
          >
            {props.item.title}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Tile;
