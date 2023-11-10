import { useState, useEffect } from "react";
import "./App.css";

import { io } from "socket.io-client";
import NuevoGame from "./components/NuevoGame";
import Salon from "./components/Salon";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:8080";

export const socket = io(URL);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [players, setPlayers] = useState([]);
  const [jugar, setJugar] = useState(false);
  const [socketId, setSocketId] = useState("");

  const [salones, setSalones] = useState([])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setSocketId(socket.id)
      console.log("SE CARGO ID", socket.id)
      socket.emit("getSesiones");
    }

    function onDisconnect() {
      setIsConnected(false);
      setSocketId("")
    }

    function onAllSesiones(sesiones) {
      console.log("AllSesiones",sesiones)
      setSalones(sesiones)
      
    }


    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("allSesiones", onAllSesiones);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    if (jugar && players.length > 1) {
      socket.emit("game", "new",socket.id)
    } else {
      setJugar(false)
    }
  }, [jugar]); // Only re-run the effect if count changes

//{!jugar && <NuevoGame players={players} setPlayers={setPlayers} setJugar={setJugar}></NuevoGame>}

  return (
    <>
      <h1 className='text-red-500 uppercase font-bold p-3 text-4xl'>FrontEnd UNO!</h1>
      <div className="App">
        <div>{isConnected ? "Conectado OK!!!" : "Falla Conexion"}</div>

        {!jugar && <Salon socket={socket} socketId={socketId} salones={salones}></Salon>}
        
      </div>
    </>
  );
}

export default App;
