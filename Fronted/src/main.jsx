import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login/login'
import Registro from './Registro/registro'
import { BrowserRouter as Switch, Routes, Route } from 'react-router-dom'
// import Lobby2 from './Lobby/test'
import Lobby from './Lobby/Lobby'
import Ganador from './Ganador/ganador'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Switch>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="registro" element={<Registro />} />
      <Route path="lobby/:id_jugador/:usuario/carton" element={<Lobby />} />
      <Route path="lobby/:id_jugador/:usuario/ganador" element={<Ganador />} />
    </Routes>
  </Switch>
)
