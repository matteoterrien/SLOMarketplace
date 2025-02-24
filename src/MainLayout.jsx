import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router";
import { useState } from "react";

export function MainLayout(props) {
  return (
    <main
      className={`h-screen ${props.darkmode ? "bg-neutral-800" : "bg-white"}`}
    >
      <NavBar darkmode={props.darkmode} toggleDarkmode={props.toggleDarkmode} />
      <section>
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}
