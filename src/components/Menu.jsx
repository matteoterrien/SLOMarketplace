import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "./Spinner";

const CATEGORIES = [
  "All",
  "School",
  "Mens Clothes",
  "Womens Clothes",
  "Unisex Clothes",
  "Music",
];

function delayMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Menu(props) {
  const [searchBar, setSearchBar] = useState("");
  const [isFocusedSearch, setIsFocusedSearch] = useState(false);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFocusSearch = () => {
    setIsFocusedSearch(true);
  };

  const handleBlurSearch = () => {
    setIsFocusedSearch(false);
  };

  async function handleSelectChange(e) {
    const selectedCategory = e.target.value;

    setIsLoading(true);
    setSearchBar("");

    await delayMs(1000);

    setCategory(selectedCategory);
    props.filterItems(selectedCategory);

    setIsLoading(false);
  }

  async function handleInputChange(e) {
    const selectedCategory = e.target.value;

    setCategory("All");
    setSearchBar(selectedCategory);
    props.search(selectedCategory);
  }

  return (
    <div className="flex flex-row w-full justify-between my-4 md:flex-col md:my-0 md:gap-4 md:justify-start">
      <div
        onFocus={handleFocusSearch}
        onBlur={handleBlurSearch}
        className={`flex items-center bg-neutral-300 rounded-lg p-2 transition-all duration-300 ease-in-out hover:bg-stone-300 
          ${isFocusedSearch ? "w-15/31" : "w-24"} 
          ${isLoading ? "opacity-50" : null}
          md:w-full`}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
        <input
          type="text"
          placeholder={"Search"}
          value={searchBar}
          onChange={handleInputChange}
          className="outline-none text-clip"
          disabled={isLoading}
        />
      </div>

      <select
        className={
          "flex bg-neutral-300 rounded-lg p-3 w-fit text-neutral-600 hover:bg-stone-300 disabled:opacity-50 md:w-full"
        }
        placeholder="Categories"
        value={category}
        onChange={handleSelectChange}
        disabled={isLoading}
      >
        {CATEGORIES.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : null}
    </div>
  );
}

export default Menu;
