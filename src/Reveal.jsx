/* eslint-disable react/prop-types */
import { socket } from "../socket";

function Reveal({ lobby }) {
  function handleNextRound() {
    socket.emit("next-round", lobby.name);
  }

  return (
    <>
      <h1>
        {lobby.message.author}: {lobby.message.text}
      </h1>
      {lobby.users.map((u, i) => {
        return (
          <p key={i}>
            {u.name}: {u.answer}
          </p>
        );
      })}
      {lobby.ownerId === socket.id && (
        <button className="next-round-but" onClick={handleNextRound}>
          prossimo round
        </button>
      )}
    </>
  );
}

export default Reveal;
