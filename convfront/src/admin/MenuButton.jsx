import { Link } from "react-router-dom";

const MenuButton = ({ icon, click, hoverText, setIssues, where }) => {
  return (
    <Link
      className="submit admin-button"
      to={where}
      onMouseOver={() => setIssues(hoverText.replace(/\n/g, "<br>"))}
      onMouseLeave={() => setIssues("")}
      onClick={click}
    >
      {icon}️
    </Link>
  );
};

export default MenuButton;
