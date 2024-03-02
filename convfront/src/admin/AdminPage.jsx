import { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import MenuButton from "./MenuButton";

const AdminPage = ({ logOff, setIssues, children, propValue }) => {
  const location = useLocation();

  useEffect(() => {
    setIssues("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div>{propValue}</div>
    </div>
  );
};

AdminPage.propTypes = {
  logOff: PropTypes.func.isRequired,
  setIssues: PropTypes.func.isRequired,
  children: PropTypes.node,
  propValue: PropTypes.any.isRequired,
};

export default AdminPage;
