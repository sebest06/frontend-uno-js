import React from "react";
import Admin from "./Admin";

const Game = ({ socket, typePlayer }) => {
  return (
    <>
      <div className="flex space-x-2">
        {typePlayer != "none" && (
          <div className="md:w-1/2 lg:w-1/2 mx-5">Game Panel</div>
        )}
        {typePlayer == "admin" && <Admin socket={socket} />}
      </div>
    </>
  );
};

export default Game;
