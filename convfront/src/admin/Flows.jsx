import { useState, useEffect } from "react";
import myRequest from "../myRequest";
import BotBrick from "./BotBrick";

const Flows = ({ setIssues }) => {
  const [botsList, setBotsList] = useState([]);
  const [projects, setProjectsList] = useState([]);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const result = await myRequest("/list-bots", {});
        setBotsList(result);
      } catch (error) {
        console.error("Error fetching bots:", error);
      }
    };
    const fetchProjects = async () => {
      try {
        const result = await myRequest("/list-projects", {});
        setProjectsList(result);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchBots();
    fetchProjects();
  }, []);

  return (
    <div className="flow-container">
      <div className="folder-container">
        <div>
          archived
          <input
            type="checkbox"
            id="checkbox1"
            name="checkbox1"
            value="option1"
          />
        </div>
        <ul className="folder-list">
          {projects.map(([id, name, date, isArchived]) => {
            const dateTime = new Date(date);
            const formattedDateTime = dateTime.toLocaleString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <p>
                {id} {name} {formattedDateTime} {isArchived}
              </p>
            );
          })}
        </ul>
      </div>

      <ul className="flow-list">
        {botsList.map(([b, s, p, d]) => {
          //console.log(b, p, d);
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
