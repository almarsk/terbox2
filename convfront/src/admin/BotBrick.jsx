import React from "react";
import MenuButton from "./MenuButton";
import myRequest from "../myRequest";
import Draggable from "react-draggable";
import { useEffect, useState } from "react";

const BotBrick = ({
  bot,
  status,
  setIssues,
  archived,
  projectId,
  setBotsList,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e, ui) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  };

  const handleStop = (e, data) => {
    const { x, y } = data;

    const draggableElement = e.target;
    const rect = draggableElement.getBoundingClientRect();
    const absoluteX = rect.left + window.pageXOffset;
    const absoluteY = rect.top + window.pageYOffset;

    if (e.target === e.currentTarget) {
      console.log("Dropped on target element itself");
      // Handle dropping on the target element itself
    } else {
      const droppedOnDiv = document.elementFromPoint(absoluteX, absoluteY);
      console.log(droppedOnDiv);
      if (
        droppedOnDiv &&
        droppedOnDiv.classList.contains("folder-brick") &&
        !droppedOnDiv.classList.contains("new-project-form")
      ) {
        const directoryId = droppedOnDiv.getAttribute("project-id");
        console.log("Dropped on", directoryId);
        // Handle dropping on a specific element
      }
    }

    setPosition(originalPosition);
    setIsDragging(false);
  };

  const onStart = (e, ui) => {
    const { x, y } = position;
    setOriginalPosition({ x, y });
    setIsDragging(true);
  };

  useEffect(() => {});

  return (
    <>
      <div className="bot-brick">
        <Draggable
          className={`${isDragging ? "is-dragging" : ""}`}
          position={position}
          onStop={handleStop}
          onDrag={handleDrag}
          onStart={onStart}
        >
          <p
            className={`bot-name ${status.success ? "launchable" : ""}`}
            style={{ cursor: status.success ? "pointer" : "move" }}
          >
            <b
              onMouseEnter={() =>
                setIssues(
                  `${status.success ? "click to launch, " : ""} drag to change project`,
                )
              }
              onMouseLeave={() => setIssues("")}
              style={{ color: status.success ? "black" : "grey" }}
            >
              {bot}
            </b>
          </p>
        </Draggable>
        <MenuButton
          icon={"🚀"}
          hoverText={`redirect to ${bot}`}
          click={() => {
            console.log(`todo - redirect to ${bot}`);
            window.location = `/?flow=${bot}`;
          }}
          setIssues={setIssues}
        />

        <MenuButton
          icon={"📎"}
          hoverText={`link for ${bot}`}
          click={() => {
            const flow_url = `${new URL(window.location.href).origin}/?flow=${bot.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
            navigator.clipboard.writeText(flow_url);
            console.log(`${bot} url copied to clipboard`);
          }}
          setIssues={setIssues}
        />
        <MenuButton
          icon={"🔍"}
          hoverText={`test ${bot}`}
          click={() => console.log(`todo - cstatus interface for ${bot}`)}
          setIssues={setIssues}
          where={`/admin/test/${bot}`}
        />
        <MenuButton
          icon={status.success ? "🏗️" : "🛠️"}
          hoverText={status.message}
          click={() => console.log(`todo - edit interface for ${bot}`)}
          setIssues={setIssues}
          where={`/admin/edit/${bot}`}
        />
        <MenuButton
          icon={"👥"}
          hoverText={`create copy of ${bot}`}
          click={() => console.log(`todo - create copy of ${bot}`)}
          setIssues={setIssues}
        />
        <MenuButton
          icon={"⬆️"}
          hoverText={`move ${bot} to folder`}
          click={() => console.log(`todo - move ${bot}`)}
          setIssues={setIssues}
        />
        <MenuButton
          icon={"⬇️"}
          hoverText={`export ${bot} in json`}
          click={() => console.log(`todo - move ${bot}`)}
          setIssues={setIssues}
        />
        <MenuButton
          icon={archived ? "💡" : "💾"}
          hoverText={"archive bot"}
          click={() => {
            myRequest("/move", {
              item_type: "flow",
              name: bot,
              archived: !archived,
              destination: projectId,
            }).then(() => setBotsList());
          }}
          setIssues={setIssues}
        />
      </div>
    </>
  );
};

export default BotBrick;
