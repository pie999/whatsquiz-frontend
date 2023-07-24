import { useEffect, useState } from "react";
import { socket } from "../socket";

function Login() {
  const [username, setUsername] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (username === "") return;
    socket.emit("new-user", username);
  }

  function handleChange(e) {
    setUsername(e.target.value);
    setUsernameExists(false);
  }

  useEffect(() => {
    socket.on("username-exists", () => {
      setUsernameExists(true);
    });
  }, []);

  return (
    <div className="login-div">
      <h1 className="login-title">Chi la detto?</h1>
      <p className="sub-title">
        <i>il primo quiz sulle chat di whatsapp (forse)</i>
      </p>
      <p className="sub-sub-title">
        v 0.1 by <a href="https://github.com/pie999">pie999</a>
      </p>
      <img src="images/salvini-ride.png" alt="salvini ride" />
      <form className="name-form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">NICKNAME</label>
        <input
          id="username"
          autoComplete="off"
          maxLength={12}
          value={username}
          onChange={(e) => handleChange(e)}
        />
        {usernameExists && (
          <p className="username-error">nickname già in uso</p>
        )}
        <button type="submit">ENTRA</button>
      </form>
    </div>
  );
}

export default Login;
