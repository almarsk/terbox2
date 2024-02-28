import { useState } from "react";
import NewItem from "./NewItem";
import ListItems from "./ListItems";

const ListInput = ({ label }) => {
  const [tags, setTags] = useState([]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <NewItem
        label={label}
        addTag={(item) => setTags([...tags, item])}
        tags={tags}
      />
      <ListItems editTags={setTags} tags={tags} />
    </div>
  );
};

export default ListInput;
