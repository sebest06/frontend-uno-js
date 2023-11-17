import { useState, useEffect } from "react";

const Jugadores = ({ socket, code }) => {
  const [jugando, setJugando] = useState(false);
  const [jugadores, setJugadores] = useState([]);
  const [ganadores, setGanadores] = useState([]);
  const [turno, setTurno] = useState({});

  useEffect(() => {
    const getGameStatus = (payload) => {
      setJugadores(payload.players);
      setTurno(payload.turno);
      setGanadores(payload.ganadores);
      setJugando(payload.jugando);
    };

    socket.on("gameStatus", getGameStatus);
  }, []);


  const handleReportarUno = (ix) => {
    socket.emit("reportarUNO", {
      socketId: socket.id,
      jugador: ix,
      code: code,
    });

  }

  const strikes = (n, ix) => {

    const icons = []
    for (let i = 0; i < n; i++) {
      icons.push(
          <svg key={(ix+1)*10+i} className="w-4 h-4 text-red-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
      )
    }
    return icons
  }

  return (
    <> {!jugando && (
      <>
        <h1 className="mt-16 text-red-500 uppercase font-bold p-3 text-4xl"> Listado de Ganadores </h1>
        <ul className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
          {ganadores.map((player, ix) => (
            <li
              key={ix}
              className={`bg-slate-100 border-2 text-left w-full p-2 m-2 placeholder-gray-400 rounded-md`}
            >
              <div className="flex space-x-2">
                <div className={`w-full flex`}>
                  {(ix + 1).toString()} {player.nombre} ({player.strikes})
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )}
      <h1 className="mt-16"> Listado de jugadores </h1>
      <ul className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        {jugadores.map((player, ix) => (
          <li
            key={ix}
            className={`border-2 text-left w-full p-2 m-2 placeholder-gray-400 rounded-md ${player.saidUno == true ? "bg-orange-300" : "bg-slate-100"}`}
          >
            <div className="flex space-x-2">
              <div className={`w-full flex ${ix != turno.turno ? "px-4" : ""}`}>
                {ix == turno.turno && (
                  <>
                    <svg
                      className="w-4 h-4 m-1 text-gray-800  "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 10 16"
                    >
                      <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z" />
                    </svg>
                  </>
                )}
                {player.nombre} ({player.cartas})
                <div className="px-1"
                  onClick={(e) => { handleReportarUno(ix) }}>

                  <svg
                    className="w-4 h-4 m-1 text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 21"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9.046 3.59-.435-2.324m.435 2.324a5.338 5.338 0 0 1 6.033 4.333l.331 1.77c.439 2.344 2.383 2.587 2.599 3.76.11.586.22 1.171-.309 1.271L5 17.101c-.529.1-.639-.488-.749-1.074-.219-1.172 1.506-2.102 1.067-4.447l-.331-1.769a5.338 5.338 0 0 1 4.059-6.22Zm-7.13 4.602a8.472 8.472 0 0 1 2.17-5.048m2.646 13.633A3.472 3.472 0 0 0 13.46 16l.089-.5-6.817 1.277Z"
                    />
                  </svg>
                </div>
                {strikes(player.strikes, ix)}
              </div>
            </div>
          </li>
        ))}
      </ul>

    </>
  );
};

export default Jugadores;
