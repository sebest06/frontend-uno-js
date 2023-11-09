
import { useState, useEffect } from "react";

let nextId = 0;

const NuevoGame = ({players, setPlayers,setJugar}) => {

    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setJugar(true)
    }


    return (
        <div className='md:w-1/2 lg:w-2/5 mx-5'>
            <div>
                <h2 className='font-black text-3xl text-center'>Empezar Juego</h2>
                <p className='text-lg mt-5 text-center mb-10'>
                    Añade a los jugadores del UNO
                </p>
            </div>

            <form className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
                onSubmit={handleSubmit}>

                <div className="flex space-x-2">
                <input
                    className="border-2 w-4/5 text-left justify-between p-2 m-2 placeholder-gray-400 rounded-md"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button 
                className='bg-indigo-600 rounded-md w-1/5 m-2 p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
                onClick={(e) => {
                    e.preventDefault();
                    setPlayers([
                        ...players,
                        { id: nextId++, name: name }
                    ]);
                    setName("")
                }}>Add</button>
                </div>
                <ul>
                    {players.map(player => (
                        <li 
                        onClick={() => {
                            setPlayers(
                                players.filter(a => a.id !== player.id)
                              );
                        }}
                        className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
                        key={player.id}>{player.name}
                        </li>
                    ))}
                </ul>

                <input type='submit'
                    className='bg-indigo-600 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
                    value="Empezar Juego"
                />

            </form>
        </div>
    )
}

export default NuevoGame
