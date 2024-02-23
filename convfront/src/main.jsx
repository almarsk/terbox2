import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./app/App.jsx";
import "./index.css";
import AdminConfig from "./admin/AdminConfig";

const [bot, phase] = [window.bot, window.phase];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="admin/*" element={<AdminConfig />} />
        <Route path="*" element={<App bot={bot} phase={phase} />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
