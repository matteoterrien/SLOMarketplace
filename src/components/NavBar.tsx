import React, { useState, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon } from "@fortawesome/free-solid-svg-icons";
import { SettingsModal } from "./Components";
import { Link } from "react-router";

interface NavBarProps {
  darkmode: boolean;
  toggleDarkmode: () => void;
}

const NavBar: FC<NavBarProps> = (props) => {
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = (): void => {
    setModal((prev: boolean) => !prev);
  };

  return (
    <>
      {modal && (
        <SettingsModal
          onCloseRequested={toggleModal}
          darkmode={props.darkmode}
        />
      )}

      <header
        className={`flex flex-col md:flex-row justify-between md:items-center gap-3 md:gap-2 px-6 py-4 sticky top-0 right-0 left-0 z-40 border-b-3 border-black
          ${
            props.darkmode
              ? "bg-neutral-800 text-neutral-200"
              : "bg-[var(--color-accent0)]"
          }
          `}
      >
        <Link to={"/"}>
          <h1 className="text-white text-6xl font-bold hover:text-neutral-300 active:text-neutral-400">
            SLO Marketplace
          </h1>
        </Link>

        <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-start md:items-center">
          <button
            className="text-white text-4xl hover:text-neutral-400 active:text-neutral-500"
            onClick={props.toggleDarkmode}
          >
            <FontAwesomeIcon icon={faMoon} aria-label="Darkmode" />
          </button>

          <button
            className="text-white text-4xl hover:text-neutral-400 active:text-neutral-500"
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faBars} aria-label="Settings" />
          </button>
        </div>
      </header>
    </>
  );
};

export default NavBar;
