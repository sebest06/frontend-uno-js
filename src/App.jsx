import { useState, useEffect } from "react";
import "./App.css";

import { io } from "socket.io-client";
import NuevoGame from "./components/NuevoGame";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:8080";

export const socket = io(URL);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [players, setPlayers] = useState([]);
  const [jugar, setJugar] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }


    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  function handleButton() {
    //console.log(socket.emit("HOLA", "DESDE LA FRONTEND"))
    //socket.emit("Hello", "word")
    //console.log("GOLA")
  }

  useEffect(() => {
    if (jugar && players.length > 1) {
      socket.emit("game", "new",socket.id)
    } else {
      setJugar(false)
    }
  }, [jugar]); // Only re-run the effect if count changes

  return (
    <>
      <h1 className='text-red-500 uppercase font-bold p-3 text-4xl'>FrontEnd UNO!</h1>
      <div className="App">
        <div>{isConnected ? "Conectado OK!!!" : "Falla Conexion"}</div>

        {!jugar && <NuevoGame players={players} setPlayers={setPlayers} setJugar={setJugar}></NuevoGame>}

        <button className="bg-indigo-600 w-full p-3
         text-white uppercase font-bold
          hover:bg-indigo-700 cursor-pointer 
          transition-colors rounded-md" onClick={handleButton}>ENVIAR HOLA</button>
      </div>
    </>
  );
}

export default App;
