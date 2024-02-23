import MenuButton from "../MenuButton";

import { useEffect, useState } from "react";
import myRequest from "../../myRequest";

const Listing = ({ elementType, flow }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const sending = {
        flow: flow,
        func: "list",
        item_type: elementType,
      };

      console.log(sending);

      console.log(await myRequest("/convform", sending));
    };
    fetchItems();
  }, [elementType]);

  return (
    <>
      <h5>{elementType}s</h5>
      <ul>
        {elements.map((f) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              height: "25px",
            }}
          >
            <div style={{ textAlign: "right", width: "40%" }}>{f}:</div>
          </div>
        ))}
      </ul>
    </>
  );
};

export default Listing;
