const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();

    response.render('estudiantes/listado', { estudiantes }); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async (request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
    // Renderizamos el formulario
    response.render('estudiantes/agregar', { lstCarreras });
});

// Endpoint para mostrar el formulario de edición
router.get('/editar/:idestudiante', async (request, response) => {
    try {
        const { idestudiante } = request.params;
        const lstCarreras = await carrerasQuery.obtenerTodosLasCarreras();
        const estudiante = await queries.obtenerEstudiantePorId(idestudiante);

        if (!estudiante) {
            return response.status(404).send('Estudiante no encontrado');
        }
        
        console.log("ID " + estudiante.idcarrera);
        response.render('estudiantes/editar', { lstCarreras, estudiante });
    } catch (error) {
        console.error('Error en el formulario de edición', error);
        response.status(500).send('Error del servidor');
    }
});

// Endpoint para agregar un estudiante
router.post('/agregar', async (request, response) => {

    const { idestudiante, nombre, apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };

    const resultado = await queries.insertarEstudiante(nuevoEstudiante);

    response.redirect('/estudiantes');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async (request, response) => {

    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }
    response.redirect('/estudiantes');
});

// Endpoint que permite editar un estudiante
router.post('/editar', async (request, response) => {
    try {
      
      
      const nuevosDatosEstudiante = request.body;
  
      const resultado = await queries.actualizarEstudiante(nuevosDatosEstudiante);
  
      if (resultado) {
        console.log('Actualizacion exitosa');
        response.redirect('/estudiantes');
        response.status(204).send(); // Enviamos una respuesta sin contenido (No Content) en caso de éxito.
      } else {
        console.log('No se pudo actualizar');
        response.status(404).json({ mensaje: 'No se encontró el estudiante para actualizar' });
      }
    } catch (error) {
      console.error('Error al actualizar el estudiante', error);
      response.status(500).json({ error: 'Error del servidor' });
    }
  });

module.exports = router;


