/* eslint-disable react/prop-types */
import { socket } from "../socket";

function Reveal({ lobby }) {
  function handleNextRound() {
    socket.emit("next-round", lobby.name);
  }

  return (
    <>
      <div className="message-div">
        <p className="message-author">{lobby.message.author}</p>
        <p className="message-text">{lobby.message.text}</p>
        <p className="message-date">{lobby.message.date}</p>
      </div>
      <h2 className="risultati">RISULTATI</h2>
      {lobby.users.map((u, i) => {
        return (
          <p
            key={i}
            className={`user-answer ${
              u.answer === lobby.message.author ? "correct-answer" : ""
            }`}
          >
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
