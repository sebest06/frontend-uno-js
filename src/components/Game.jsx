import React from "react";
import Admin from "./Admin";
import Play from "./Play";
import Jugadores from "./Jugadores";

const Game = ({ socket, typePlayer, code }) => {
  return (
    <>
      <div className="flex space-x-2">
        {typePlayer != "none" && <Play socket={socket} code={code} />}
        {typePlayer == "admin" && <Admin socket={socket} />}
      </div>
      <div>{typePlayer != "none" && <Jugadores socket={socket} code={code} />}</div>
    </>
  );
};

export default Game;
