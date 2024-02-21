import { useState } from "react";
import MenuButton from "./MenuButton";

const ProjectList = ({
  setProjectsList,
  archived,
  projects,
  setActiveProject,
  activeProject,
  setIssues,
}) => {
  const [newProjectValue, setNewProjectValue] = useState("");

  const handleSubmitProject = async (event) => {
    event.preventDefault();
    setNewProjectValue("");
    await myRequest("/create", {
      item_type: "project",
      name: newProjectValue,
      destination: activeProject,
    });
    setProjectsList(await myRequest("/list-projects", {}));
  };

  return (
    <>
      <div className="folder-container">
        <ul className="folder-list">
          {projects
            .filter(([id, , , isArchived]) =>
              archived ? true : !isArchived && id != 2,
            )
            .map(([id, name, , isArchived]) => {
              return (
                <div
                  project-id={id}
                  className={`folder-brick ${id == 3 ? "all-flows" : ""}`}
                  onClick={() => setActiveProject(id)}
                >
                  <span
                    className={`project-name ${activeProject == id ? "bold-text" : ""}`}
                  >
                    {name}
                  </span>
                  {id > 3 ? (
                    <MenuButton
                      icon={isArchived ? "💡" : "💾"}
                      click={async (e) => {
                        e.stopPropagation();
                        await myRequest("/move", {
                          item_type: "project",
                          name: name,
                          destination: isArchived ? 1 : 2,
                        }).then(() => fetchProjects());
                      }}
                      setIssues={setIssues}
                      hoverText={`${archived ? "unarchive" : "archive"} project ${name}`}
                    />
                  ) : (
                    ""
                  )}
                </div>
              );
            })}

          <form
            className="folder-brick new-project-form"
            onSubmit={handleSubmitProject}
          >
            <input
              required
              className="new-project"
              placeholder="new project"
              value={newProjectValue}
              onChange={(e) => setNewProjectValue(e.target.value)}
              type="text"
            />
            <button className="submit admin-button">↵</button>
          </form>
        </ul>
      </div>
    </>
  );
};

export default ProjectList;
