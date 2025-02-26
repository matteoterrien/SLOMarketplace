import React, { useState } from "react";
import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import { MainLayout } from "./MainLayout.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  const [username, setUsername] = useState("Matteo");
  const [darkmode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Routes>
      <Route
        element={
          <MainLayout darkmode={darkmode} toggleDarkmode={toggleDarkMode} />
        }
      >
        <Route path="/" element={<Homepage darkmode={darkmode} />} />
        <Route path="/:itemId" element={<ItemPage darkmode={darkmode} />} />
        <Route
          path="/profile"
          element={
            <ProfilePage
              username={username}
              changeUsername={changeUsername}
              darkmode={darkmode}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
