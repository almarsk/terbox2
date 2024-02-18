import { useState, useEffect } from "react";
import listBots from "./list-bots";
import BotBrick from "./bot-brick.jsx";

const Flows = ({ setIssues }) => {
  const [botsList, setBotsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listBots();
        setBotsList(result);
      } catch (error) {
        console.error("Error fetching bots:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flow-container">
      <div className="folder-container">
        <div>filter</div>
        <ul className="folder-list">
          <li> workspace </li>
          <li> folder1 </li>
          <li> folder2 </li>
          <li> archived </li>
        </ul>
      </div>

      <ul className="flow-list">
        {botsList.map(([b, s]) => {
          return <BotBrick bot={b} status={s} setIssues={setIssues} />;
        })}
        <BotBrick
          bot=""
          status={{ success: false, message: "not made" }}
          setIssues={setIssues}
          newFlow={true}
        />
      </ul>
    </div>
  );
};

export default Flows;
