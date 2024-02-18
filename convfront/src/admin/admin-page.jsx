import "./admin.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import MenuButton from "./MenuButton";

const AdminPage = ({ logOff, setIssues, children }) => {
  const location = useLocation();

  useEffect(() => {
    // Reset state when location changes
    setIssues("");
  }, [location]);

  return (
    <div className="admin-container">
      <h1>Admin</h1>
      {children}

      <div className="log-off">
        <MenuButton
          icon={"👋"}
          hoverText={"log off"}
          click={logOff}
          setIssues={setIssues}
        />
      </div>
    </div>
  );
};

export default AdminPage;
