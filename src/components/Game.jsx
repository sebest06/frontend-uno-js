import React from "react";
import Admin from "./Admin";
import Play from "./Play";
import Jugadores from "./Jugadores";
import Header from "./Header";

const Game = ({ socket, typePlayer, code, rojo, verde, amarillo, azul}) => {
  return (
    <>
      <div className="">
        {typePlayer == "admin" && <Header><Admin socket={socket} /></Header>
        }
        {typePlayer != "none" && <Play socket={socket} code={code} rojo={rojo} verde={verde} amarillo={amarillo} azul={azul}/>}
      </div>
      <div>{typePlayer != "none" && <Jugadores socket={socket} code={code} />}</div>
    </>
  );
};

export default Game;
