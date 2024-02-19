import { useState, useEffect } from "react";
import myRequest from "../myRequest";
import BotBrick from "./BotBrick";
import MenuButton from "./MenuButton";

const Flows = ({ setIssues }) => {
  const [botsList, setBotsList] = useState([]);
  const [projects, setProjectsList] = useState([]);
  const [archived, setArchived] = useState(false);

  const [newProjectValue, setNewProjectValue] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setNewProjectValue("");
    await myRequest("/create", {
      item_type: "project",
      name: newProjectValue,
      flow: {},
    });
    setProjectsList(await myRequest("/list-projects", {}));
  };
  const handleChange = (event) => {
    setNewProjectValue(event.target.value);
  };

  const fetchProjects = async () => {
    try {
      const result = await myRequest("/list-projects", {});
      setProjectsList(result);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const result = await myRequest("/list-bots", {});
        setBotsList(result);
      } catch (error) {
        console.error("Error fetching bots:", error);
      }
    };
    fetchBots();
    fetchProjects();
  }, []);

  return (
    <div className="flow-container">
      <div className="folder-container">
        <div>
          <MenuButton
            icon={archived ? "📂" : "📁"}
            click={() => {
              setArchived((prevArchived) => !prevArchived);
            }}
            setIssues={setIssues}
            hoverText={`${archived ? "hide" : "view"} archived`}
          />
        </div>
        <ul className="folder-list">
          {projects
            .filter((p) => (archived ? true : !p[3]))
            .map(([id, name, , isArchived]) => (
              <div className="folder-brick">
                <span className="project-name">{name}</span>
                <MenuButton
                  icon={isArchived ? "💡" : "💾"}
                  click={async () => {
                    await myRequest("/move", {
                      item_type: "project",
                      name: name,
                      archived: !isArchived,
                      destination: "",
                    }).then(() => fetchProjects());
                  }}
                  setIssues={setIssues}
                  hoverText={`${archived ? "unarchive" : "archive"} project ${name}`}
                />
              </div>
            ))}
          <div>
            <div className="folder-brick">
              <input
                required
                className="new-project"
                placeholder="new project"
                value={newProjectValue}
                onChange={handleChange}
                type="text"
              />
              <button className="submit" onClick={handleSubmit}>
                ↵
              </button>
            </div>
          </div>
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
