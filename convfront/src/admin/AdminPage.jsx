import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import MenuButton from "./MenuButton";

const AdminPage = ({ logOff, setIssues, children }) => {
  const location = useLocation();

  useEffect(() => {
    setIssues("");
  }, [location]);

  return (
    <div className="admin-container">
      <Link className="title" to="/admin">
        <h1 className="admin-header">Admin</h1>
      </Link>
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
