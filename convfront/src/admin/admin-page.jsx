import { useState, useEffect } from "react";
import "./admin.css";
import listBots from "./list_bots";
import BotBrick from "./bot-brick.jsx";

const AdminPage = () => {
  const [botsList, setBotsList] = useState([]);

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
        {botsList.map((b) => (
          <BotBrick bot={b} />
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
