import React from "react";
import Admin from "./Admin";
import Play from "./Play";
import Jugadores from "./Jugadores";
import Header from "./Header";

const Game = ({ socket, typePlayer, code }) => {
  return (
    <>
      <div className="">
        {typePlayer == "admin" && <Header><Admin socket={socket} /></Header>
        }
        {typePlayer != "none" && <Play socket={socket} code={code} />}
      </div>
      <div>{typePlayer != "none" && <Jugadores socket={socket} code={code} />}</div>
    </>
  );
};

export default Game;
