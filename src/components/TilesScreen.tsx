import React, { FC } from "react";
import Tile from "./Tile";
import { Item } from "../components/useItems";

const createPost: Item = {
  _id: "new",
  image: "/labs-server/images/addIcon.jpg",
  price: "",
  title: "Create New Post",
  details: "",
  categories: [],
  author: null,
};

interface TileScreenProps {
  darkmode: boolean;
  items: Item[];
}

const TileScreen: FC<TileScreenProps> = ({ darkmode, items }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 lg:grid-cols-5 lg:gap-6">
      <Tile item={createPost} darkmode={darkmode} />
      {items.map((item) => (
        <Tile key={item._id} item={item} darkmode={darkmode} />
      ))}
    </div>
  );
};

export default TileScreen;
