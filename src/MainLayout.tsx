import NavBar from "./components/NavBar.jsx";
import { Outlet } from "react-router";
import React, { FC } from "react";

interface MainLayoutProps {
  darkmode: boolean;
  toggleDarkmode: () => void;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <main
      className={`h-screen ${props.darkmode ? "bg-neutral-800" : "bg-white"}`}
    >
      <NavBar darkmode={props.darkmode} toggleDarkmode={props.toggleDarkmode} />
      <section>
        <Outlet />
      </section>
    </main>
  );
};
