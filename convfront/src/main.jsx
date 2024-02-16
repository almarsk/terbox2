import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./index.css";
import Admin from "./admin/admin.jsx";

// console.log(window.admin);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <React.StrictMode>
      {window.admin == "true" ? (
        <Admin />
      ) : (
        <App bot={window.bot} phase={window.phase} />
      )}
    </React.StrictMode>
  </>,
);
