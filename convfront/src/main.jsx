import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./app/App.jsx";
import "./index.css";
import Admin from "./admin/AdminMain";

const [bot, phase] = [window.bot, window.phase];

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="admin" element={<Admin />}>
          <Route path="edit/:flow" />
          <Route path="test/:flow" />
        </Route>
        <Route path="*" element={<App bot={bot} phase={phase} />} />
      </Routes>
    </React.StrictMode>
  </Router>,
);
