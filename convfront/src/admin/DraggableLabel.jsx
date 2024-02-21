import Draggable from "react-draggable";
import { useEffect, useState } from "react";
import myRequest from "../myRequest";

const DraggableLabel = ({ setIssues, bot, statusSuccess, setBotsList }) => {
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
    <Draggable
      className={`${isDragging ? "is-dragging" : ""}`}
      position={position}
      onStop={handleStop}
      onDrag={handleDrag}
      onStart={onStart}
    >
      <div
        onMouseEnter={() => setIssues(`drag to change project`)}
        onMouseLeave={() => setIssues("")}
        style={{
          color: statusSuccess ? "black" : "grey",
          height: "25px",
          overflow: isDragging ? "visible" : "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <b>{bot}</b>
      </div>
    </Draggable>
  );
};

export default DraggableLabel;
