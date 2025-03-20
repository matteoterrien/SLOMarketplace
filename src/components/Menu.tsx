import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "./Spinner";

const CATEGORIES: string[] = [
  "All",
  "School",
  "Mens Clothes",
  "Womens Clothes",
  "Unisex Clothes",
  "Music",
  "Technology",
];

function delayMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface MenuProps {
  filterItems: (category: string) => void;
  search: (query: string) => void;
}

const Menu: FC<MenuProps> = (props) => {
  const [searchBar, setSearchBar] = useState<string>("");
  const [isFocusedSearch, setIsFocusedSearch] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFocusSearch = (): void => {
    setIsFocusedSearch(true);
  };

  const handleBlurSearch = (): void => {
    setIsFocusedSearch(false);
  };

  async function handleSelectChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> {
    let selectedCategory: string = e.target.value;

    setIsLoading(true);
    setSearchBar("");

    await delayMs(1000);

    if (!selectedCategory || selectedCategory === "") {
      selectedCategory = "All";
    }

    setCategory(selectedCategory);
    props.filterItems(selectedCategory);

    setIsLoading(false);
  }

  async function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const selectedCategory: string = e.target.value;

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
        value={category || "All"}
        onChange={handleSelectChange}
        disabled={isLoading}
      >
        <option value="All" disabled hidden>
          Select a category
        </option>
        {CATEGORIES.map((category: string, index: number) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner className={undefined} />
        </div>
      ) : null}
    </div>
  );
};

export default Menu;
