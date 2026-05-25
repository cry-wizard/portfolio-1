import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Trial from "./pages/Trial";

function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* DEMO */}
      <Route
        path="/app"
        element={<Dashboard />}
      />

      {/* REAL USER */}
      <Route
        path="/trial"
        element={<Trial />}
      />

    </Routes>
  );
}

export default App;