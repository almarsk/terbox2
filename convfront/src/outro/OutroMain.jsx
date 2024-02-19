import PropTypes from "prop-types";
import submitQuestionnare from "./submit-questionnare";
import { useState, useEffect } from "react";

const Outro = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = new FormData(e.target).get("comment");
    const grade = new FormData(e.target).get("grade");
    submitQuestionnare(comment, grade);
  };

  const [aborted, setAborted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/is_aborted");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setAborted(data.aborted);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <p className="content">
        {aborted
          ? "Proč jste konverzaci ukončili?"
          : "Jak konverzace proběhla?"}
        <br></br>Prosím ohodnoťte <b>slovně</b> a <b>známkou</b> jako ve škole:
      </p>
      <div className="outro-form">
        <textarea
          name="comment"
          className="eval-field input-field content"
          type="text"
          required
          placeholder="komentář"
        ></textarea>
        <div className="outro-eval">
          <input
            name="grade"
            required
            min="1"
            max="5"
            className="submit"
            type="number"
            inputMode="numeric"
            onKeyDown={(event) => event.preventDefault()}
          ></input>
          <button className="submit">↵</button>
        </div>
      </div>
    </form>
  );
};

Outro.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default Outro;
