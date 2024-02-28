const ListItems = ({ tags, editTags }) => {
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "row",
        width: "20vw",
        overflow: "auto",
      }}
    >
      {tags.map((t, i) => (
        <div
          style={{
            cursor: "pointer",
            backgroundColor: "rgb(189,189,189)",
            borderRadius: "10px",
            padding: "1px 5px",
            margin: "2px",
            display: "flex",
            alignItems: "center",
            height: "25px",
          }}
          onClick={() => {
            console.log(tags);
            const newTags = [...tags];
            newTags.splice(i, 1);
            editTags(newTags);
          }}
          key={i}
        >
          {`${t}`}
        </div>
      ))}
    </ul>
  );
};

export default ListItems;