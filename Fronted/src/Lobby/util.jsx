// const io = require('socket.io-client')
// const socket = io.connect('http://localhost:9090')
// const { useNavigate } = require("react-router-dom")
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import { useState } from 'react'
const socket = io.connect('http://localhost:9090')
const Navigate = useNavigate()


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

// module.exports = {
//     verificarBalota
// }