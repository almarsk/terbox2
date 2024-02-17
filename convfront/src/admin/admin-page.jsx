import { useState, useEffect } from "react";
import "./admin.css";
import listBots from "./list-bots";
import BotBrick from "./bot-brick.jsx";

const AdminPage = () => {
  const [botsList, setBotsList] = useState([]);
  const [issues, setIssues] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listBots("bots");
        setBotsList(result);
      } catch (error) {
        console.error("Error fetching bots:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-container">
      <h1>admin</h1>
      <ul>
        {botsList.map(([b, s]) => {
          return <BotBrick bot={b} status={s} setIssues={setIssues} />;
        })}
      </ul>
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
    </div>
  );
};

export default AdminPage;
