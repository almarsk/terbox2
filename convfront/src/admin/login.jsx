const login = async (nick, pass) => {
  const data = JSON.stringify([nick, pass]);
  const login = await fetch("/login", {
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

  return login.success;
};

export default login;
