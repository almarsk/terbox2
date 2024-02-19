const updateCStatus = async (userSpeech, cStatus) => {
  const data = JSON.stringify([userSpeech, cStatus]);
  const updatedCStatus = await fetch("/bot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then(async (response) => await response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  console.log(updatedCStatus.bot_turns, updatedCStatus);

  if (updatedCStatus.end) {
    window.location.href = "/";
  }

  return updatedCStatus;
};

export default updateCStatus;
