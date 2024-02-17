import UserInput from "../app/user-input";
import BotOutput from "./bot-output";
import updateCStatus from "./update-cstatus";
import abort_convo from "./abort-button";
import { useState, useEffect } from "react";
import "./loader.css";

const Chat = () => {
  const [[loading, minLoading], setLoading] = useState([true, true]);
  const [cStatus, setCStatus] = useState(null);

  useEffect(() => {
    if (cStatus == null) {
      const fetchCStatus = async () => await handleCStatus("");
      fetchCStatus();
    }
    if (!minLoading) setLoading([false, minLoading]);
  }, [cStatus, loading]);

  const handleSubmit = async (e) => {
    setLoading([true, true]);
    await handleCStatus(new FormData(e.target).get("content"));
  };

  const handleCStatus = async (userSpeech) => {
    const newCStatus = await updateCStatus(userSpeech, cStatus);
    setCStatus(newCStatus);
    console.log("chat", cStatus);
    setTimeout(() => setLoading([false, false]), 1500);
  };

  return (
    <>
      <>
        <BotOutput
          botSpeech={cStatus && !loading ? cStatus.say : ""}
          loading={loading}
        />
        <UserInput submit={handleSubmit} loading={loading} />
        <button onClick={async () => await abort_convo()} className="submit">
          🚫
        </button>
      </>
    </>
  );
};

export default Chat;
