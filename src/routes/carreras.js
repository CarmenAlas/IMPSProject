const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const carreras = await queries.obtenerTodasLasCarreras();

     response.render('carreras/listado', {carreras}); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async(request, response) => {
  
    response.render('carreras/agregar');
});

// Endpoint para mostrar el formulario de edición
router.get('/editar/:idcarrera', async (request, response) => {
    try {
        const { idcarrera } = request.params;
        const carrera = await queries.obtenerCarreraPorId(idcarrera);

        if (!carrera) {
            return response.status(404).send('Carrera no encontrada');
        }

        response.render('carreras/editar', { idcarrera, carrera });
    } catch (error) {
        console.error('Error al cargar el formulario de edición', error);
        response.status(500).send('Error interno del servidor');
    }
});

  

// Endpoint para agregar un estudiante
router.post('/agregar', async(request, response) => {
    // Falta agregar logica
    const { idcarrera, carrera } = request.body;
    const nuevaCarrera = { idcarrera, carrera };

    const resultado = await queries.insertarCarrera(nuevaCarrera);

    response.redirect('/carreras');
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

// Endpoint que permite editar un estudiante
router.post('/editar', async (request, response) => {
    try {
      
      // Obtenemos los nuevos datos del estudiante del cuerpo de la solicitud
      const nuevosDatosCarrera = request.body;
  
      const resultado = await queries.actualizarCarrera(nuevosDatosCarrera);
  
      if (resultado) {
        console.log('Carrera actualizada con éxito');
        response.redirect('/carreras');
        response.status(204).send(); // Enviamos una respuesta sin contenido (No Content) en caso de éxito.
      } else {
        console.log('No se pudo actualizar el carrera');
        response.status(404).json({ mensaje: 'No se encontró la carrera para actualizar' });
      }
    } catch (error) {
      console.error('Error al actualizar el carrera', error);
      response.status(500).json({ error: 'Error interno del servidor' });
    }
  });

module.exports = router;