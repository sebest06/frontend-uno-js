import { useState, useEffect } from "react";
import "./App.css";

import { io } from "socket.io-client";
import Mesa from "./components/Mesa";
import Game from "./components/Game";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? "https://backend-uno-js-production.up.railway.app/" : "http://localhost:8080";

export const socket = io(URL);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [typePlayer, setTypePlayer] = useState("none");
  const [code, setCode] = useState("")

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      setTypePlayer("none")
    }
    function onDisconnected() {
      setTypePlayer("none")
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("disconnected", onDisconnected);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  /*useEffect(() => {
    if (jugar && players.length > 1) {
      socket.emit("game", "new", socket.id);
    } else {
      setJugar(false);
    }
  }, [jugar]); // Only re-run the effect if count changes*/

  //{!jugar && <NuevoGame players={players} setPlayers={setPlayers} setJugar={setJugar}></NuevoGame>}
  //{unidoAlJuego && unidoAlJuego.gameId == 0 && <Salon socket={socket} socketId={socketId} salones={salones} setUnidoAlJuego={setUnidoAlJuego}></Salon>}

  /*
          <Router>
          <Routes>
          <Route path="/" element={} />
          </Routes>
        </Router>

  */
  return (
    <>
      <div className="App" translate="no">
        <h1 className="text-red-500 uppercase font-bold p-3 text-4xl">
          FrontEnd UNO! {isConnected ? "OK" : "ERROR"}
        </h1>
        <Mesa socket={socket} setTypePlayer={setTypePlayer} setCode={setCode} code={code} />
        <Game socket={socket} typePlayer={typePlayer} code={code} />
      </div>
    </>
  );
}

export default App;
