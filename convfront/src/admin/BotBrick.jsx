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
  const [dropPosition, setDropPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e, ui) => {
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  };

  const handleStop = (e) => {
    const rect = e.target.getBoundingClientRect();
    const absoluteX = rect.left + window.pageXOffset;
    const absoluteY = rect.top + window.pageYOffset;
    setPosition(originalPosition);
    setIsDragging(false);
    setDropPosition({ x: absoluteX, y: absoluteY });
  };

  const onStart = (e, ui) => {
    const { x, y } = position;
    setOriginalPosition({ x, y });
    setIsDragging(true);
  };

  const findElementUnderTopmost = (element, selector) => {
    while (element) {
      if (element.classList.contains(selector)) {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  };

  useEffect(() => {
    if (dropPosition.x == 0 && dropPosition.y == 0) {
      return;
    }

    let droppedOnDiv = document.elementFromPoint(
      dropPosition.x,
      dropPosition.y,
    );

    console.log(droppedOnDiv);

    droppedOnDiv = findElementUnderTopmost(droppedOnDiv, "folder-brick");

    console.log(droppedOnDiv);

    if (
      droppedOnDiv &&
      !droppedOnDiv.classList.contains("new-project-form") &&
      !droppedOnDiv.classList.contains("all-flows")
    ) {
      const directoryId = droppedOnDiv.getAttribute("project-id");
      myRequest("/move", {
        item_type: "flow",
        name: bot,
        destination: directoryId,
      }).then(() => setBotsList());
    }
  }, [dropPosition]);

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
          <p className={`bot-name`}>
            <b
              onMouseEnter={() => setIssues(`drag to change project`)}
              onMouseLeave={() => setIssues("")}
              style={{ color: status.success ? "black" : "grey" }}
            >
              {bot}
            </b>
          </p>
        </Draggable>

        <div
          style={{
            opacity: status.success ? 100 : 0,
            zIndex: status.success ? 10 : -1,
          }}
        >
          <MenuButton
            icon={"🚀"}
            hoverText={`redirect to ${bot}`}
            click={() => {
              console.log(`todo - redirect to ${bot}`);
              status.success ? (window.location = `/?flow=${bot}`) : ``;
            }}
            setIssues={setIssues}
          />
        </div>

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
              destination: archived ? 1 : 2,
            }).then(() => setBotsList());
          }}
          setIssues={setIssues}
        />
      </div>
    </>
  );
};

export default BotBrick;
