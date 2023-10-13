const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');
const carrerasQuery = require('../repositories/CarreraRepository');

// Endpoint para mostrar todas las carreras 
router.get('/', async (request, response) => {
  console.log('Entro aqui');
    const carreras = await queries.obtenerTodasLasCarreras();
    console.log('Salio aqui');

     response.render('carreras/listado', {carreras:carreras}); // Mostramos el listado de carreras
});

// Endpoint que permite mostrar el formulario para agregar una nueva carrera
router.get('/agregar', async(request, response) => {
  
    response.render('carreras/agregar');
});


// Endpoint para agregar una carrera
router.post('/agregar', async(request, response) => {
  // Falta agregar logica
  const { idcarrera, carrera } = request.body;
  const nuevaCarrera = { idcarrera , carrera};

  const resultado = await queries.insertarCarrera(nuevaCarrera);

  response.redirect('/carreras');
});


// Endpoint para mostrar el formulario de edición
router.get('/editar/:idcarrera', async (request, response) => {
  
  const { idcarrera } = request.params;
  const carrera = await queries.obtenerCarreraPorid(idcarrera);

  if (carrera) {
    response.render('carreras/editar',{idcarrera,carrera});
  }else{
    response.redirect('/carreras');
  }

});

// Endpoint que permite editar una carrera
router.post('/editar/:id', async (request, response) => {
  const { id} = request.params;
  const {idcarrera,carrera} = request.body;
  const datosModificados = {idcarrera,carrera};

  const resultado = await queries.actualizarCarrera(id, datosModificados);

  if(resultado){
    console.log('Estudiante modificado con exito');
    response.redirect('/carreras');
  }else{
    console.log('Error al modificar estudiante');
    response.redirect('/carreras/editar/'+ idcarrera);
  }
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idcarrera', async(request, response) => {
  // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
  const { idcarrera } = request.params;
  const resultado = await queries.eliminarCarrera(idcarrera);
  if(resultado > 0){
      console.log('Eliminado con éxito');
  }
  response.redirect('/carreras');
});


module.exports = router;

  


