/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { socket } from "../socket";

const timeSeconds = 8;

function Answer({ lobby }) {
  const [answer, setAnswer] = useState("");
  const [time, setTime] = useState(timeSeconds * 1000);
  const [timeEnd] = useState(Date.now() + timeSeconds * 1000);
  const [hasTimeoutElapsed, setHasTimeoutElapsed] = useState(false);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(timeEnd - Date.now()), 1000);
      return () => clearTimeout(timer);
    } else {
      setHasTimeoutElapsed(true);
    }
  }, [time, timeEnd]);

  useEffect(() => {
    if (hasTimeoutElapsed) {
      socket.emit("submit-answer", answer, lobby.name);
      setHasTimeoutElapsed(false);
    }
  }, [hasTimeoutElapsed, answer, lobby]);

  return (
    <div className="answer-div">
      <p className="time">{Math.round(time / 1000)}</p>
      <h1 className="answer-prompt">{lobby.message.text}</h1>
      <div className="authors-list">
        <button onClick={() => setAnswer("Pietro")}>Pietro</button>
        <button onClick={() => setAnswer("Riccardo")}>Riccardo</button>
        <button onClick={() => setAnswer("Pezz")}>Pezz</button>
        <button onClick={() => setAnswer("Carmine")}>Carmine</button>
        <button onClick={() => setAnswer("Farina")}>Farina</button>
      </div>
    </div>
  );
}

export default Answer;
