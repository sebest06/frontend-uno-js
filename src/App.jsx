import { useState, useEffect } from "react";
import "./App.css";

import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:8080";

export const socket = io(URL);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);
  function handleButton() {
    //console.log(socket.emit("HOLA", "DESDE LA FRONTEND"))
    socket.emit("Hello","word")
    console.log("GOLA")
  }

  return (
    <>
      <h1>FrontEnd UNO!</h1>
      <div className="App">
        <div>{isConnected?"HOLA!!!":"NADA"}</div>
        <div>{fooEvents} </div>

        <button onClick={handleButton}>ENVIAR HOLA</button>
      </div>
    </>
  );
}

export default App;
