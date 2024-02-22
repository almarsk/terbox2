import MenuButton from "../MenuButton";

const AbstractForm = ({ element }) => {
  return (
    <form className="editor-input">
      {element}
      <MenuButton
        click={() => {
          console.log(`submit ${element}`);
        }}
        setIssues={() => {}}
        hoverText={"submit {element}"}
      />
    </form>
  );
};

export default AbstractForm;
