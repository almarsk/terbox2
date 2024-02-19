import { useState, useEffect } from "react";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import myRequest from "../myRequest";
import Flows from "./Flows";
import { Route, Routes } from "react-router-dom";
import EditPage from "./EditPage";
import TestPage from "./TestPage";

const Admin = () => {
  const [issues, setIssues] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unsuccess, setUnsuccess] = useState(false);

  const logOff = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", false);
    setIssues("");
  };

  const handleLogin = async (nick, pass) => {
    const success = await myRequest("/login", [nick, pass]).then((e) => {
      localStorage.setItem("isLoggedIn", e.sucess);
      setIsLoggedIn(e.success);
    });
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <AdminPage logOff={logOff} setIssues={setIssues}>
          <Routes>
            <Route index element={<Flows setIssues={setIssues} />} />
            <Route path="/edit/:flow" element={<EditPage />} />
            <Route path="/test/:flow" element={<TestPage />} />
          </Routes>
        </AdminPage>
      ) : (
        <LoginPage onLogin={handleLogin} unsuccess={unsuccess} />
      )}

      <div
        className="issues-summary"
        style={{
          left: 10,
          top: 10,
        }}
        dangerouslySetInnerHTML={{
          __html: issues,
        }}
      />
    </>
  );
};

export default Admin;
