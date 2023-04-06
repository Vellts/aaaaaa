const {Usuario} = require('../models/usuario');
const bcrypt = require('bcrypt');
const axios = require('axios');

const crearUsuario = async (req, res) => {
    try {
      const { nombre, usuario, email, contraseña }=req.body;
      console.log(nombre, usuario, email, contraseña)
      // Buscamos si ya existe una sala con ese nombre
      const usuarioExistente = await Usuario.findOne({ usuario });
      if (usuarioExistente) {
        return res.status(400).json({ message: 'Ya existe un usuario con ese nombre' });
      }

      // await axios.post('http://localhost:8080/guardar-usuario', { usuario });
      // console.log(usuario);
      // Creamos una nueva sala con el nombre proporcionado y estado "iniciado"
      const nuevoUsuario = Usuario.create({ nombre,usuario,email,contraseña });


      // Renderizamos la página para que los jugadores puedan unirse a la sala
      // res.render('exito', { usuario: usuario, idUsuario }); 

      return res.status(200).json({
        msg: "Usuario creado con éxito",
        data: {
          nuevoUsuario,
        }
      })
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Ha ocurrido un error al crear el usuario');
    }
};



const IniciarSesion =async(req,res)=>{
  const {usuario} = req.body;
  const usuarioExistente = await Usuario.findOne({ usuario: usuario });
  if (usuarioExistente) {
      // Obtener la contraseña cifrada almacenada en el documento del usuario
      const hashedPassword = usuarioExistente.contraseña;
    
      // Comparar la contraseña cifrada almacenada con la contraseña proporcionada por el usuario
      const passwordMatch = await bcrypt.compare(req.body.contraseña, hashedPassword);
    
      if (passwordMatch) {
        // La contraseña es correcta, el usuario puede iniciar sesión
        // const response = await axios.post('http://localhost:8080/inicio', { usuario });
        // const jugador = response.data;
        // const id_jugador = jugador.id; // Obtenemos el ID del jugador desde el objeto devuelto
        const id_jugador = 1;
        
        // res.redirect(`/inicio/${id_jugador}/${usuario}/carton`);
        return res.status(200).json({
          msg: "Usuario logueado con éxito",
          data: {
            id_jugador,
            usuario
          }
        })
      } else {
        // La contraseña es incorrecta, el usuario no puede iniciar sesión
        return res.status(400).json({ message: 'contraseña o usuario incorrecto' });
      }
    } else {
      // El usuario no existe en la base de datos
      return res.status(400).json({ message: 'no existe un usuario con ese nombre' });
    }
    

}


let balotas = [];

const Loby = async (req, res) => {
  const usuario=req.params.usuario;
  const id_jugador = req.params.id_jugador;
  const response = await axios.get(`http://localhost:8080/inicio/${id_jugador}/carton`);
  const carton = response.data;
  const numeros = carton[0].split(',');
  const filas = [];
  for (let i = 0; i < numeros.length; i += 5) {
    filas.push(numeros.slice(i, i + 5));
  }
  
  // Transponer la tabla de números
  const columnas = [];
  for (let i = 0; i < 5; i++) {
    columnas.push([]);
    for (let j = 0; j < filas.length; j++) {
      columnas[i].push(filas[j][i]);
    }
  }

  // res.render('loby', { columnas, id_jugador, balotas,usuario });
  return res.status(200).json({
    data: {
      columnas,
      id_jugador,
      balotas,
      usuario
    }
  })
}


setInterval(async () => {
  try {
    const response = await axios.get('http://localhost:8080/juegos/balotas');
    if (!response.data || response.data.length === 0) { // Verificar si la respuesta es null o vacía
      console.log('Aun no hay balotas...');
    } else {
      balotas = response.data;
      console.log('Actualizando balotas...');
      const usuario=req.params.usuario;
      //res.render('loby', { columnas, id_jugador, balotas,usuario });
      res.redirect(`/inicio/${id_jugador}/${usuario}/carton`);
    }
  } catch (error) {
   
  }
}, 5000);




const  Info = async (req, res) => {
  const jugador = req.body;
  const usuario=req.body.usuario;
  console.log(jugador);
  const id_jugador= parseInt(jugador.id_jugador);
  const response = await axios.post(`http://localhost:8080/inicio/${id_jugador}/info`);
  res.redirect(`/inicio/${id_jugador}/${usuario}/carton`); 
}



const  EliminarInfo = async (req, res) => {
  const jugador = req.body;
  console.log(jugador);
  const id_jugador= parseInt(jugador.id_jugador);
  const response = await axios.delete(`http://localhost:8080/inicio/${id_jugador}/info/eliminar`);
  res.redirect(`/inicio/${id_jugador}/carton`);
  
}

const  Ganador = async (req, res) => {
  const jugador = req.body;
  console.log(jugador);
  const id_jugador= parseInt(jugador.id_jugador);
  const response = await axios.post(`http://localhost:8080/inicio/${id_jugador}/ganador`);
  res.redirect(`/inicio/${id_jugador}/carton`);
}





module.exports={crearUsuario,IniciarSesion,Loby,Info,EliminarInfo,Ganador}
