import React, { useState, useEffect, useRef} from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";
import io from "socket.io-client";


import "./lobby.css";

const Lobby2 = () => {
const { id_jugador, usuario } = useParams();
const [balotas, setBalotas] = useState([]);
const [columnas, setColumnas] = useState([]);
const [estado,setEstado]=useState("");
const [id_juego,setidJuego]=useState("");
const [cancelarHabilitado, setCancelarHabilitado] = useState(false);
const [balotaActual, setBalotaActual] = useState(0);
const [tablero, setTablero] = useState([])
// const [tablero, setTablero] = useState(0);

const Navigate = useNavigate();
const index = useRef(0)

const verificarGanador = (columnas) => {
  let contador = 0
  for (let i = 0; i < columnas.length; i++) {
      for (let j = 0; j < columnas[i].length; j++) {
          // console.log(columnas[i][j])
          tablero.forEach((balota) => {
              if(Number(columnas[i][j]) === balota) {
                  contador += 1
              }

              if (contador >= 5){
                  socket.emit('ganador', {id_jugador, usuario})
                  // return Navigate(`/lobby/${id_jugador}/${usuario}/ganador`)
              }
          })
      }
  }
}

const verificarBalota = (columnas, balotaActual) => {
  for (let i = 0; i < columnas.length; i++) {
      for (let j = 0; j < columnas[i].length; j++) {
          if (Number(columnas[i][j]) === balotaActual) {
              setTablero([...tablero, balotaActual])
              return verificarGanador(columnas)
          }
      }
  }
}

const getData = () => {
  setTimeout(async () => {

        const resposne = await fetch(`http://localhost:9090/inicio/${id_jugador}/${usuario}/carton`)
        const { data } = await resposne.json()
        // console.log(data);
        
        setBalotas(data.balotas);
        setColumnas(data.columnas);
        // console.log(data.balotas.at(index))
        setBalotaActual(data.balotas.at(index.current -1))
        verificarBalota(data.columnas, data.balotas.at(index.current-1))
        index.current -= 1
        // console.log(index)
        // setEstado(data.estado);
        // setidJuego(data.id_jugador);
}, 1000)
}
    // index += 1

useEffect(() => {

    getData();
    return () => {
      clearTimeout(getData)
    }
// }, [socket])
}, [balotas])

// useInterval(() => {
//   const obtenerDatos = async () => {
//     const response = await fetch(`http://localhost:9090/inicio/${id_jugador}/${usuario}/carton`);
//     const data = await response.json();
//     setBalotas(data.data.balotas);
//     setColumnas(data.data.columnas);
//     setEstado(data.data.estado);
//     setidJuego(data.data.id_juego);
//   };
//   obtenerDatos();
// }, 5000);
// const manejarJugar = () => {
//   setCancelarHabilitado(true);
// };

// const guardarInfo = async () => {
//   try {
//     const response = await fetch(`http://localhost:9090/inicio/${id_jugador}/jugar`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id_jugador
//       }),
//     })
//     if (!response.ok) {
//       throw new Error("No se ha podido unir a la partida")
//     }
//     alert("Se ha unido a la partida")
//   } catch (error) {
//     alert(error.message)
//   }
// }

// const eliminarInfo = async ()=>{
//   const response = await fetch(`http://localhost:9090/inicio/${id_jugador}/info/eliminar`, {
//   method: "DELETE",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     id_jugador
//   }),
// })
// console.log(response);
// if (!response.ok) {
//   return alert("No se ha podido eliminar la partida");

// }
// return alert("Ha salido de  la partida")
// }

return (
      <div>
          <h2 className="loby">Usuario: 
            <span className="usuario">{usuario}</span>
            <span >Estado:</span>
            <span className="usuario">{estado}</span>
            <span >Id Juego:</span>
            <span className="usuario">{id_juego}</span>
          </h2>
          
          <table className="balotas">
            {/* <thead className="balota-t"><tr>Última balota:</tr></thead> */}
            <tbody>
              <tr>
                {balotas.reverse().map((balota, bindex) => {
                // console.log(bindex, index.current)
                return balota === balotaActual ? <td key={bindex} className="nueva-balota">{balota}</td> : <td key={bindex}>{balota}</td>
                })}
              </tr>
            </tbody>
          </table>
          <table className="carton">
            <thead>
              <tr>
                <th>B</th>
                <th>I</th>
                <th>N</th>
                <th>G</th>
                <th>O</th>
              </tr>
            </thead>
            <tbody>
              {columnas.map((columna, index_cs) => {
                return (
                  <tr key={index_cs}>
                    {columna.map((numero, index) => {
                        return tablero.includes(Number(numero)) ? <td key={index} className="nueva-balota">{numero}</td> : <td key={index}>{numero}</td>
                        // return <td key={index}>{numero}</td>
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <form className="hidden">
            <input type="hidden" name="id_usuario" value={id_jugador} />
            <input type="hidden" name="usuario" value={usuario} />
            <button className="jugar" type="submit"  disabled={estado !== 'en espera' || cancelarHabilitado} 
            onClick={(event)=>{event.preventDefault();guardarInfo();manejarJugar()}}  >
              Jugar!
            </button>
          </form>
          <form className="hidden">
            <input type="hidden" name="id_usuario" value={id_jugador} />
            <button className="bingo" type="submit" onClick={()=>{Navigate(`/ganador/${id_jugador}/${usuario}`)}}>
              Bingo!
            </button>
          </form>
          <form className="hidden">
            <input type="hidden" name="id_usuario" value={id_jugador} />
            <button className="cancelar" type="submit" disabled={!cancelarHabilitado}
             onClick={(event) =>{event.preventDefault();eliminarInfo();setCancelarHabilitado(false)}}>
              Cancelar!
            </button>
          </form>
            <button className="cerrar" type="submit" onClick={() => Navigate("/")}  >
              Cerrar Sesion
            </button>
      </div>
);
};

export default Lobby2;