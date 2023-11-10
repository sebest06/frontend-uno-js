import { useState, useEffect } from "react";

let nextId = 0;

const Salon = ({ socket, socketId, salones, setUnidoAlJuego }) => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [jugadores, setJugadores] = useState(0)
  const [salon, setSalon] = useState({})
  const [modal, setModal] = useState(false)
  const [gameId, setGameId] = useState(0)
  const [joinName, setJoinName] = useState("")
  const [joinPass, setJoinPass] = useState("")

  /*useEffect(() => {

  },[modal])*/

  const onUnido = (resp) => {
    if(resp.msg == "ok"){
      setUnidoAlJuego({gameId: resp.gameId, jugador: resp.name, password: resp.password})
    }
  }

  socket.on("unido", onUnido)

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const UnirseAlSalon = (id) => {
    setGameId(id);
    setModal(true);
  };

  const solicitarUnirse = (gameId) => {
    socket.emit("unirse", {
      gameId: gameId, jugador: joinName, password: joinPass
    })
    //setUnidoAlJuego({gameId: gameId, jugador: name, password: password})
  }

  /*
<!-- Main modal -->

  */

  return (
    <>
      <div className={modal ? 'blur-sm' : ''} >
        <h2 className="font-black text-3xl text-center">UNO! Salones</h2>
        <div className="flex space-x-2">
          <div className="md:w-1/2 lg:w-1/2 mx-5">
            <div>
              <h2 className="font-black text-3xl text-center">Crea Salón</h2>
            </div>

            <form
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              onSubmit={handleSubmit}
            >
              <label htmlFor="nombre">Nombre del salón</label>
              <input
                id="nombre"
                className="border-2 w-full text-left justify-between p-2 m-2 placeholder-gray-400 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="password">Password del salón</label>
              <input
                id="password"
                type="password"
                className="border-2 w-full text-left justify-between p-2 m-2 placeholder-gray-400 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="cantidad">Cantidad de jugadores</label>
              <input
                id="cantidad"
                type="number"
                className="border-2 w-full text-left justify-between p-2 m-2 placeholder-gray-400 rounded-md"
                value={jugadores}
                onChange={(e) => setJugadores(e.target.value)}
              />
              <button
                className="bg-indigo-600 rounded-md w-full m-2 p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  if (jugadores > 1) {
                    setSalon({
                      id: nextId++,
                      name,
                      password,
                      jugadores,
                      jugando: 0,
                      socket: socketId,
                    });
                    socket.emit("salon", {
                      id: nextId++,
                      name,
                      password,
                      jugadores,
                      jugando: 0,
                      socket: socketId,
                    });
                    setName("");
                    setPassword("");
                    setJugadores(0);
                  }
                }}
              >
                Crear
              </button>
            </form>
          </div>
          <div className="md:w-1/2 lg:w-1/2 mx-5">
            <div>
              <h2 className="font-black text-3xl text-center">
                Salones disponibles
              </h2>
            </div>
            <ul className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
              {salones.map((salon) => (
                <li
                  key={salon.id}
                  className="bg-slate-100 border-2 text-left w-full p-2 m-2 placeholder-gray-400 rounded-md"
                  onClick={() => UnirseAlSalon(salon.id)}
                >
                  {salon.salon} {`${salon.jugando}/${salon.jugadores}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {modal && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Unirse
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Cerrar</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="player"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tu nombre
                    </label>
                    <input
                      type="text"
                      name="player"
                      id="player"
                      value={joinName}
                      onChange={(e) => setJoinName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="nombre"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password del juego
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={joinPass}
                      onChange={(e) => setJoinPass(e.target.value)}
                      placeholder=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      solicitarUnirse(gameId)
                      setModal(false)
                    }}
                  >
                    Unirse
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Salon;
