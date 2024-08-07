import { useState, useEffect } from "react";
import "./App.css";

import { io } from "socket.io-client";
import Mesa from "./components/Mesa";
import Game from "./components/Game";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? "https://backend-uno-js-production.up.railway.app/" : "http://localhost:8080";

//export const socket = io("http://192.168.0.4:8080");

function App() {
  const [socket, setSocket] = useState(io(""));
  const [isConnected, setIsConnected] = useState(false);
  const [typePlayer, setTypePlayer] = useState("none");
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");

  const connectToSocket = () => {
    if (socket) {
      socket.disconnect();
    }

    const newSocket = io(url);

    newSocket.on('connect', () => {
      console.log('connected to server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('disconnected from server');
      setIsConnected(false);
    });

    setSocket(newSocket);
  };

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
          {!isConnected &&
          <div className="flex items-center space-x-2">
            <input
                        id="url"
                        className="text-xs border-2 w-full text-left justify-between p-2 m-2 placeholder-gray-400 rounded-md"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Code"
            />
            <button 
            className="text-xs bg-indigo-600 rounded-md m-2 p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            onClick={connectToSocket}>Connect</button>
          </div>
          }
        </h1>
        <Mesa socket={socket} setTypePlayer={setTypePlayer} setCode={setCode} code={code} />
        <Game socket={socket} typePlayer={typePlayer} code={code} />
      </div>
    </>
  );
}

export default App;
