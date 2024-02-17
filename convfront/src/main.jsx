import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./app/App.jsx";
import "./index.css";
import Admin from "./admin/admin.jsx";

// console.log(window.admin);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route
          path="/"
          element={<App bot={window.bot} phase={window.phase} />}
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </React.StrictMode>
  </Router>,
);
