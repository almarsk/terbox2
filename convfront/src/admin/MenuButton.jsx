import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MenuButton = ({ icon, click, hoverText, setIssues, where }) => {
  return (
    <Link
      className="submit admin-button"
      to={where}
      onMouseOver={() => {
        setIssues("");
        setIssues(hoverText.replace(/\n/g, "<br>"));
      }}
      onMouseLeave={() => setIssues("")}
      onClick={click}
    >
      {icon}️
    </Link>
  );
};

MenuButton.propTypes = {
  icon: PropTypes.node.isRequired,
  click: PropTypes.func.isRequired,
  hoverText: PropTypes.string.isRequired,
  setIssues: PropTypes.func.isRequired,
  where: PropTypes.string.isRequired,
};

export default MenuButton;
