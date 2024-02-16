import start_convo from "./start-button";

const Start = () => {
  return (
    <>
      <p id="intro-text">
        Můžeme začít. Pokud bude robot říkat nesmysly, ukončete ho červeným
        tlačítkem
      </p>
      <form
        className="content-box"
        onSubmit={(e) => {
          e.preventDefault();
          start_convo();
        }}
      >
        <div className="content-box input">
          <button className="submit">↵</button>
        </div>
      </form>
    </>
  );
};

export default Start;
