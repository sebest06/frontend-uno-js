import { useState, useEffect } from "react";
import Carta from "./Carta";

const Play = ({ socket, code }) => {
  const [cartas, setCartas] = useState([]);
  const [descartes, setDescartes] = useState([]);
  const [jugando, setJugando] = useState(false);
  const [modal, setModal] = useState(false);
  const [indexCard, setIndexCard] = useState(0);

  useEffect(() => {
    const getGameStatus = (payload) => {
      console.log(payload);
      setCartas(payload.cartas);
      setDescartes(payload.descarte.slice(0, 3).reverse());
      setJugando(true);
    };

    socket.on("gameStatus", getGameStatus);
  }, []);

  const handleCart = (ix, color) => {
    if (cartas[ix].color == "negro") {
      if (color && color != undefined && color != "") {
        const objecto = {
          cart_index: ix,
          color: color,
          valor: cartas[ix].valor,
          code: code,
        };
        socket.emit("playCard", objecto);
      } else {
        setIndexCard(ix);
        setModal(true);
      }
    } else {
      const objecto = {
        cart_index: ix,
        color: cartas[ix].color,
        valor: cartas[ix].valor,
        code: code,
      };
      socket.emit("playCard", objecto);
    }
    //console.log("play", objecto);
  };

  const handleCartDorse = () => {
    const objecto = {
      code: code,
    };
    socket.emit("playPick", objecto);
  };

  const handleCartPasar = () => {
    const objecto = {
      code: code,
    };
    socket.emit("playPass", objecto);
  };

  const handleDecirUNO = () => {
    const objecto = {
      code: code,
    };
    socket.emit("playUNO", objecto);
  };

  return (
    <>
        <div className="w-full">
          {jugando && (
            <>
              <div className="flex flex-wrap">
                <div className="w-32 h-48" onClick={() => handleCartDorse()}>
                  <Carta color="dorso" valor="dorso"></Carta>
                </div>
                {descartes.map((cartas, ix) => (
                  <div key={ix} className="w-12 h-48" onClick={() => {}}>
                    <Carta
                      key={ix}
                      color={cartas.color}
                      valor={cartas.valor}
                    ></Carta>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap">
                <div className="px-2 py-2">
                  <button
                    className="bg-indigo-600 rounded-md w-full m-2 p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    onClick={() => handleCartPasar()}
                  >
                    Pasar Turno
                  </button>
                </div>
                <div className="px-2 py-2">
                  <button
                    className="bg-indigo-600 rounded-md w-full m-2 p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    onClick={() => handleDecirUNO()}
                  >
                    Decir UNO!!
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap">
                {cartas.map((cartas, ix) => (
                  <div
                    key={ix}
                    className="w-24 h-32"
                    onClick={() => handleCart(ix)}
                  >
                    <Carta
                      key={ix}
                      color={cartas.color}
                      valor={cartas.valor}
                    ></Carta>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {modal && (
          <div
            tabIndex="-1"
            aria-hidden="true"
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Elija Color
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
                    <button
                      className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setModal(false);
                        handleCart(indexCard, "rojo");
                      }}
                    >
                      Rojo
                    </button>
                    <button
                      className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setModal(false);
                        handleCart(indexCard, "amarillo");
                      }}
                    >
                      Amarillo
                    </button>
                    <button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setModal(false);
                        handleCart(indexCard, "verde");
                      }}
                    >
                      Verde
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setModal(false);
                        handleCart(indexCard, "azul");
                      }}
                    >
                      Azul
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

export default Play;
