import PropTypes from "prop-types";
import submitQuestionnare from "./submit-questionnare";

const Outro = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = new FormData(e.target).get("comment");
    const grade = new FormData(e.target).get("grade");
    submitQuestionnare(comment, grade);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <p className="content">
        Jak konverzace proběhla?<br></br>Prosím ohodnoťte <b>slovně</b> a{" "}
        <b>známkou</b> jako ve škole:
      </p>
      <div className="outro-form">
        <textarea
          name="comment"
          className="eval-field input-field content"
          type="text"
          required
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
