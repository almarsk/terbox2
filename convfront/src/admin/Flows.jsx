import { useState, useEffect } from "react";
import myRequest from "../myRequest";
import BotBrick from "./BotBrick";
import MenuButton from "./MenuButton";

const Flows = ({ setIssues }) => {
  const [botsList, setBotsList] = useState([]);
  const [projects, setProjectsList] = useState([]);
  const [archived, setArchived] = useState(false);

  const [newProjectValue, setNewProjectValue] = useState("");
  const [newFlowValue, setNewFlowValue] = useState("");

  const [activeProject, setActiveProject] = useState(1);
  const [activeFlows, setActiveFlows] = useState(botsList);

  const handleSubmitProject = async (event) => {
    event.preventDefault();
    setNewProjectValue("");
    await myRequest("/create", {
      item_type: "project",
      name: newProjectValue,
    });
    setProjectsList(await myRequest("/list-projects", {}));
  };

  const handleSubmitFlow = async (event) => {
    event.preventDefault();
    setNewFlowValue("");
    await myRequest("/create", {
      item_type: "flow",
      name: newFlowValue,
    });
    setBotsList(await myRequest("/list-bots", {}));
  };

  const fetchProjects = async () => {
    try {
      const result = await myRequest("/list-projects", {});
      setProjectsList(result);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchBots = async () => {
    try {
      const result = await myRequest("/list-bots", {});
      setBotsList(result);
    } catch (error) {
      console.error("Error fetching bots:", error);
    }
  };

  useEffect(() => {
    fetchBots();
    fetchProjects();
  }, []);

  useEffect(() => {
    setActiveFlows(
      botsList.filter((b) => {
        console.log(b);
        console.log(activeProject);
        return b[3] == activeProject;
      }),
    );
    console.log(activeFlows);
  }, [activeProject, botsList]);

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
              <div
                className="folder-brick"
                onClick={() => setActiveProject(id)}
              >
                <span className="project-name">{name}</span>
                {id > 2 ? (
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
                ) : (
                  ""
                )}
              </div>
            ))}
          <div>
            <div className="folder-brick">
              <input
                required
                className="new-project"
                placeholder="new project"
                value={newProjectValue}
                onChange={(e) => setNewProjectValue(e.target.value)}
                type="text"
              />
              <button className="submit" onClick={handleSubmitProject}>
                ↵
              </button>
            </div>
          </div>
        </ul>
      </div>

      <ul className="flow-list">
        {activeFlows.map(([b, s, p, project, a]) => {
          // console.log(b, p, d);

          return (
            <BotBrick
              bot={b}
              status={s}
              setIssues={setIssues}
              archived={a}
              projectId={project}
              setBotsList={fetchBots}
            />
          );
        })}
        <div className="bot-brick">
          <input
            required
            className="new-project"
            placeholder="new flow"
            value={newFlowValue}
            onChange={(e) => setNewFlowValue(e.target.value)}
            type="text"
          />
          <button className="submit" onClick={handleSubmitFlow}>
            ↵
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Flows;
