import React, { FC, useState, useEffect } from "react";
import TileScreen from "../components/TilesScreen";
import Menu from "../components/Menu";
import { useItems } from "../components/useItems";
import Fuse from "fuse.js";

interface HomepageProps {
  darkmode: boolean;
  authToken: string | null;
}

const fuseOptions = {
  keys: ["title", "categories", "details"],
};

const Homepage: FC<HomepageProps> = ({ darkmode, authToken }) => {
  const { isLoading, items, error } = useItems(authToken);
  const [filteredItems, setFilteredItems] = useState<typeof items>([]);
  const [searchedItem, setSearchedItem] = useState<string>("");
  const fuse = new Fuse(items, fuseOptions);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleItemChange = (category: string) => {
    if (category === "All") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.categories.includes(category)
      );
      setFilteredItems(filtered);
    }
  };

  const searchItem = (word: string) => {
    setSearchedItem(word);
  };

  useEffect(() => {
    if (searchedItem) {
      const fuseSearch = fuse.search(searchedItem);
      const results = fuseSearch.map((result) => result.item);
      setFilteredItems(results);
    } else {
      setFilteredItems(items);
    }
  }, [searchedItem, items]);

  return (
    <div
      className={`flex flex-col mx-4 gap-4 md:grid md:grid-cols-[1fr_5fr] md:mt-8 ${
        darkmode ? "bg-neutral-800" : "bg-white"
      }`}
    >
      {isLoading ? (
        <p>Loading items...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <Menu filterItems={handleItemChange} search={searchItem} />
          <TileScreen items={filteredItems} darkmode={darkmode} />
        </>
      )}
    </div>
  );
};

export default Homepage;
