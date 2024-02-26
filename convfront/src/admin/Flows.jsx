import { useState, useEffect } from "react";
import myRequest from "../myRequest";
import MenuButton from "./MenuButton";
import FlowList from "./FlowList";
import ProjectList from "./ProjectList";

const Flows = ({ setIssues }) => {
  const [botsList, setBotsList] = useState([]);
  const [projects, setProjectsList] = useState([]);
  const [archived, setArchived] = useState(false);

  const [activeProject, setActiveProject] = useState(1);
  const [activeFlows, setActiveFlows] = useState(botsList);

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
      const result = await myRequest("/list-bots", {}).then((e) => {
        console.log("new list", e);
        return e;
      });
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
    if (activeProject === 0) {
      setActiveFlows(botsList);
    } else {
      const filteredFlows = botsList.filter(([, , , project_id]) => {
        console.log("pid", project_id, "ap", activeProject);
        return project_id === activeProject;
      });
      setActiveFlows(filteredFlows);
    }
  }, [activeProject, botsList]);

  return (
    <div className="listing_container">
      <MenuButton
        icon={archived ? "📂" : "📁"}
        click={() => {
          setArchived((prevArchived) => !prevArchived);
        }}
        setIssues={setIssues}
        hoverText={`${archived ? "hide" : "view"} archived`}
      />
      <div className="flow-container">
        <ProjectList
          archived={archived}
          setProjectsList={setProjectsList}
          projects={projects}
          setActiveProject={setActiveProject}
          activeProject={activeProject}
          setIssues={setIssues}
          fetchProjects={fetchProjects}
        />

        <FlowList
          activeFlows={activeFlows}
          setIssues={setIssues}
          fetchBots={fetchBots}
          activeProject={activeProject}
          setBotsList={setBotsList}
        />
      </div>
    </div>
  );
};

export default Flows;
