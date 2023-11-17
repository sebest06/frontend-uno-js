import { useState, useEffect } from "react";
import Carta from "./Carta";

const Play = ({ socket, code }) => {
  const [cartas, setCartas] = useState([]);
  const [descartes, setDescartes] = useState([]);
  const [jugando, setJugando] = useState(false);
  const [modal, setModal] = useState(false);
  const [indexCard, setIndexCard] = useState(0);
  const [comodin, setComodin] = useState("")
  const [miturno, setMiTurno] = useState(false);

  useEffect(() => {
    const getGameStatus = (payload) => {
      setCartas(payload.cartas);
      setDescartes(payload.descarte.slice(0, 3).reverse());
      setJugando(payload.jugando);
      setMiTurno(payload.miturno);
      if (payload.descarte[0].color == "negro") {
        switch (payload.comodin) {
          case "rojo":
            setComodin("bg-red-500")
            break;
          case "amarillo":
            setComodin("bg-yellow-500")
            break;
          case "verde":
            setComodin("bg-green-500")
            break;
          case "azul":
            setComodin("bg-blue-500")
            break;
          default:
            setComodin("")
        }
      } else {
        setComodin("")
      }
    };

    socket.on("gameStatus", getGameStatus);
  }, []);

  const handleCart = (ix, color) => {
    if (jugando) {
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
    }
    //console.log("play", objecto);
  };

  const handleCartDorse = () => {
    if (jugando) {
      const objecto = {
        code: code,
      };
      socket.emit("playPick", objecto);
    }
  };

  const handleCartPasar = () => {
    if (jugando) {
      const objecto = {
        code: code,
      };
      socket.emit("playPass", objecto);
    }
  };

  const handleDecirUNO = () => {
    if (jugando) {
      const objecto = {
        code: code,
      };
      socket.emit("playUNO", objecto);
    }
  };

  return (
    <>
      <div className="w-full">

        <div className="flex flex-wrap">
          <div className={`w-32 h-48 p-1.5 rounded-lg ${miturno?'bg-indigo-200':''}`} onClick={() => handleCartDorse()}>
            <Carta color="dorso" valor="dorso"></Carta>
          </div>
          {descartes.map((cartas, ix) => (
            <div key={ix} className="w-12 h-48" onClick={() => { }}>
              <Carta
                key={ix}
                color={cartas.color}
                valor={cartas.valor}
              ></Carta>
            </div>
          ))}
        </div>
        {jugando && (
          <>
            <div className="flex flex-wrap">
              <div className={`h-5 w-5 ${comodin}`}></div>
              <div className="px-0.5">
                <button
                  className="bg-indigo-600 rounded-md w-full m-0.5 p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  onClick={() => handleCartPasar()}
                >
                  Pasar Turno
                </button>
              </div>
              <div className="px-0.5">
                <button
                  className="bg-indigo-600 rounded-md w-full m-0.5 p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
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
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Elija Color
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
