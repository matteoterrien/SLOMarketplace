import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon } from "@fortawesome/free-solid-svg-icons";
import { SettingsModal } from "./Components";
import { Link } from "react-router";

function NavBar(props) {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal((prev) => !prev);
  }

  return (
    <>
      {modal && (
        <SettingsModal
          onCloseRequested={toggleModal}
          darkmode={props.darkmode}
        />
      )}

      <header
        className={`flex flex-row justify-between items-center gap-2 px-6 py-4 sticky top-0 right-0 left-0 z-40 border-b-3 border-black
          ${
            props.darkmode
              ? "bg-neutral-800 text-neutral-200"
              : "bg-[var(--color-accent0)]"
          }`}
      >
        <button
          className="text-white text-4xl hover:text-neutral-400 active:text-neutral-500"
          onClick={toggleModal}
        >
          <FontAwesomeIcon icon={faBars} alt="Settings" />
        </button>

        <Link to={"/"}>
          <h1 className="text-white text-6xl font-bold hover:text-neutral-300 active:text-neutral-400">
            SLO Marketplace
          </h1>
        </Link>

        <button
          className="text-white text-4xl hover:text-neutral-400 active:text-neutral-500"
          onClick={props.toggleDarkmode}
        >
          <FontAwesomeIcon icon={faMoon} alt="Darkmode" />
        </button>
      </header>
    </>
  );
}

export default NavBar;
