import { useState, useEffect } from "react";
import AdminPage from "./admin-page";
import LoginPage from "./login-page";
import login from "./login";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unsuccess, setUnsuccess] = useState(false);

  const handleLogin = async (nick, pass) => {
    const success = await login(nick, pass);
    !success ? setUnsuccess(true) : "";
    setIsLoggedIn(success);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      // Call your logout function here
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <AdminPage />
      ) : (
        <LoginPage onLogin={handleLogin} unsuccess={unsuccess} />
      )}
    </div>
  );
};

export default Admin;
