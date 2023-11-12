import { useState, useEffect } from "react";

let nextId = 0;

const Mesa = ({ socket, setTypePlayer, setCode, code }) => {
  const [name, setName] = useState("");
  const [iniciado, setIniciado] = useState(0);

  const crearMesa = () => {
    if (name.length == 0) {
    } else {
      socket.emit("addMesa", {
        socketId: socket.id,
        nombre: name,
      });
      setCode(
        `${socket.id
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .toLowerCase()
          .slice(0, 3)}-${socket.id
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .toLowerCase()
          .slice(3, 6)}-${socket.id
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .toLowerCase()
          .slice(6, 9)}`
      );
    }
  };

  const unirseMesa = () => {
    socket.emit("joinMesa", {
      socketId: socket.id,
      nombre: name,
      code: code,
    });
  };

  socket.on("addMesa", () => {
    setIniciado(true);
    setTypePlayer("admin");
  });

  socket.on("joinMesa", () => {
    setIniciado(true);
    setTypePlayer("guest");
  });

  return (
    <>
      {!iniciado ? (
        <div className="mx-5">
          <form
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <input
              id="nombre"
              className="border-2 w-full text-left justify-between p-2 m-2 placeholder-gray-400 rounded-md"
              value={name}
              placeholder="Nombre"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex space-x-2">
              <div className="w-full">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    crearMesa();
                  }}
                  className="bg-indigo-600 rounded-md w-full m-2 p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                >
                  Crear
                </button>
              </div>
              <div className="w-full">
                <div className="flex space-x-2">
                  <div className="w-full">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        unirseMesa();
                      }}
                      className="bg-indigo-600 rounded-md w-full m-2 p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    >
                      Unirse
                    </button>
                  </div>
                  <div className="w-full">
                    <input
                      id="code"
                      className="border-2 w-full text-left justify-between p-2 m-2 placeholder-gray-400 rounded-md"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Code"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <p>
            Tu código de mesa es: {code} {""}
            <button
              onClick={() => {
                navigator.clipboard.writeText(code);
              }}
            >
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7.708 2.292.706-.706A2 2 0 0 1 9.828 1h6.239A.97.97 0 0 1 17 2v12a.97.97 0 0 1-.933 1H15M6 5v4a1 1 0 0 1-1 1H1m11-4v12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 5h5.239A.97.97 0 0 1 12 6Z"
                />
              </svg>
            </button>
          </p>
        </div>
      )}
    </>
  );
};

export default Mesa;
