/* eslint-disable react/prop-types */
import { socket } from "../socket";

function Over({ lobby }) {
  return (
    <div className="final">
      <h1>classifica finale</h1>
      {lobby.users.map((u, i) => {
        return (
          <h2 key={i}>
            {u.score} {u.name}
          </h2>
        );
      })}
      {lobby.ownerId === socket.id && (
        <>
          <button
            className="new-game"
            onClick={() => socket.emit("new-game", lobby.name)}
          >
            nuova partita
          </button>
          <button
            className="exit"
            onClick={() => socket.emit("end-game", lobby.name)}
          >
            esci
          </button>
        </>
      )}
    </div>
  );
}

export default Over;
