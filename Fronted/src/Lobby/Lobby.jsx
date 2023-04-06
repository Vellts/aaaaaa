import React, { useState, useEffect } from "react";
import "./Lobby.css";

const Lobby = () => {
    const [id_jugador, setIdJugador] = useState(0);
    const [usuario, setUsuario] = useState("No usuario");
    const [balotas, setBalotas] = useState([]);
    const [columnas, setColumnas] = useState([]);
    const [carton, setCarton] = useState("");

    useEffect(async () => {
        const data = await fetch("http://localhost:9090/datos")
        const datos = await data.json()

        console.log(datos)
    })

    return <>
        <h2>Usuario: {usuario}</h2>

        <table>
            <tr>
                {balotas.map((balota) => {
                    return <p key={balota}>{balota}</p>
                })}
            </tr>
        </table>

        <table>
            <thead>
                <tr>
                    <th>B</th>
                    <th>I</th>
                    <th>N</th>
                    <th>G</th>
                    <th>O</th>
                </tr>
            </thead>
            {
                columnas.map((columna) => {
                    <tr>
                        {
                            columna.map((numero) => {
                                return <td key={numero}>{numero}</td>
                            })
                        }
                    </tr>
                })
            }
        </table>

        <form >
            <input type="hidden" name="id_usuario" value={id_jugador} />
            <input type="hidden" name="usuario" value={usuario} />
            <button className="jugar" type="submit">Jugar!</button>
        </form>

        <form>
            <input type="hidden" name="id_usuario" value={id_jugador} />
            <button className="bingo" type="submit">Bingo!</button>
        </form>

        <form>
            <input type="hidden" name="id_usuario" value={id_jugador} />
            <button className="cancelar" type="submit">Cancelar!</button>
        </form>
    </>
};

export default Lobby