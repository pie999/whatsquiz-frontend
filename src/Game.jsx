/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { socket } from "../socket";
import Answer from "./Answer";
import Reveal from "./Reveal";
import Over from "./Over";

function Game({ startLobby }) {
  const [lobby, setLobby] = useState(startLobby);
  const [phase, setPhase] = useState("answer"); // answer - reveal - over

  useEffect(() => {
    socket.on("submit-answer", (upLobby) => {
      setLobby(upLobby);
      setPhase("reveal");
    });
    socket.on("next-round", (upLobby) => {
      setLobby(upLobby);
      setPhase("answer");
    });
    socket.on("game-over", (upLobby) => {
      setLobby(upLobby);
      setPhase("over");
    });
    socket.on("new-game", (upLobby) => {
      setLobby(upLobby);
      setPhase("answer");
    });
  }, []);

  let content;
  if (phase === "answer") {
    content = <Answer lobby={lobby} />;
  } else if (phase === "reveal") {
    content = <Reveal lobby={lobby} />;
  } else if (phase === "over") {
    content = <Over lobby={lobby} />;
  }

  return <div className="game-content-div">{content}</div>;
}

export default Game;
