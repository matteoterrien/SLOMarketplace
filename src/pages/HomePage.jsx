import React, { useEffect, useState } from "react";
import TileScreen from "../components/TilesScreen";
import Menu from "../components/Menu";
import ITEMS_DEMO from "../data";
import Fuse from "fuse.js";

const fuseOptions = {
  keys: ["title", "categories", "details"],
};

function Homepage(props) {
  const [items, setItems] = useState(ITEMS_DEMO);
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchedItem, setSearchedItem] = useState("");
  const fuse = new Fuse(items, fuseOptions);

  function handleItemChange(selectedCategories) {
    if (selectedCategories === "All") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item, index) =>
        item.categories.some((category) =>
          selectedCategories.includes(category)
        )
      );
      setFilteredItems(filtered);
    }
  }

  function searchItem(word) {
    setSearchedItem(word);
  }

  useEffect(() => {
    if (searchedItem) {
      const fuseSearch = fuse.search(searchedItem);

      const results = fuseSearch.map((result) => result.item);
      setFilteredItems(results);
    } else {
      setFilteredItems(items);
    }
  }, [searchedItem]);

  return (
    <div
      className={`flex flex-col mx-4 gap-4 md:grid md:grid-cols-[1fr_5fr] md:mt-8
      ${props.darkmode ? "bg-neutral-800" : "bg-white"}`}
    >
      <Menu filterItems={handleItemChange} search={searchItem} />
      <TileScreen items={filteredItems} darkmode={props.darkmode} />
    </div>
  );
}

export default Homepage;
