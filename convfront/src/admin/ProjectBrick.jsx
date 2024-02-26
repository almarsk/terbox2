import MenuButton from "./MenuButton";
import myRequest from "../myRequest";

const ProjectBrick = ({
  name,
  activeProject,
  id,
  setActiveProject,
  isArchived,
  archived,
  index,
  setIssues,
  fetchProjects,
  isDefault,
}) => {
  return (
    <div
      project-id={id}
      className={`folder-brick ${id == 0 ? "all-flows" : ""}`}
      onClick={() => setActiveProject(id)}
    >
      <span
        className={`project-name ${activeProject == id ? "bold-text" : ""}`}
      >
        {name}
      </span>
      {!isDefault ? (
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
};

export default ProjectBrick;
