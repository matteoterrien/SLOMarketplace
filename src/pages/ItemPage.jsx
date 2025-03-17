import React from "react";
import { useParams, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import ITEMS_DEMO from "../data";

function ItemPage(props) {
  const navigate = useNavigate();

  const { itemId } = useParams();

  const post = ITEMS_DEMO[itemId];

  const redirectPage = () => {
    navigate("/");
  };

  return (
    <div
      className={`flex flex-col place-content-center items-center p-4
        ${
          props.darkmode
            ? "bg-neutral-800 text-neutral-200"
            : "bg-white text-black"
        }`}
    >
      <button
        className="bg-stone-300 hover:bg-stone-400 active:bg-stone-500 flex gap-1 items-center w-fit px-4 py-2 rounded-xl absolute top-26 left-4 text-black"
        onClick={redirectPage}
      >
        <FontAwesomeIcon icon={faCaretLeft} />
        Back
      </button>

      <img
        src={post.image}
        alt={post.title}
        className="border-1 border-black rounded-lg self-center mb-2 relative z-10 top-0"
      />

      <div className="flex flex-col mx-6 w-1/2 md:w-1/3">
        <div className="flex items-center p-2 gap-2">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p className="font-bold"> - </p>
          <h3 className="text-2xl text-gray-500">${post.price}</h3>
        </div>

        <button className="bg-[var(--color-accent0)] hover:bg-green-900 active:bg-green-950 text-neutral-200 p-3 m-2 w-fit self-center rounded-lg">
          Message Seller
        </button>

        <h4 className="ml-2 mb-1 text-lg font-bold">Seller's Description</h4>
        <p className="ml-2">{post.details}</p>
      </div>
    </div>
  );
}

export default ItemPage;
