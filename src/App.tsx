import React, { useState, ChangeEvent } from "react";
import { Route, Routes, useNavigate } from "react-router";
import Homepage from "./pages/HomePage.jsx";
import { MainLayout } from "./MainLayout.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AddItemPage from "./pages/AddItemPage.jsx";
import RegisterPage from "./auth/RegisterPage.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import { ProtectedRoute } from "./auth/ProtectedRoute.jsx";

const App: React.FC = () => {
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("Matteo");
  const [darkmode, setDarkMode] = useState<boolean>(false);

  function handleLogin(token: string): void {
    setAuthToken(token);
    navigate("/");
  }

  const toggleDarkMode = (): void => {
    setDarkMode((prev: boolean) => !prev);
  };

  const changeUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  return (
    <Routes>
      <Route
        element={
          <MainLayout darkmode={darkmode} toggleDarkmode={toggleDarkMode} />
        }
      >
        <Route
          path="/register"
          element={<RegisterPage onLogin={handleLogin} darkmode={darkmode} />}
        />
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} darkmode={darkmode} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute authToken={authToken}>
              <Homepage darkmode={darkmode} authToken={authToken} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:itemId"
          element={
            <ProtectedRoute authToken={authToken}>
              <ItemPage darkmode={darkmode} authToken={authToken} />{" "}
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute authToken={authToken}>
              <ProfilePage
                username={username}
                changeUsername={changeUsername}
                darkmode={darkmode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new"
          element={<AddItemPage darkmode={darkmode} authToken={authToken} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
