const express = require('express');
const router = express.Router();
const queries = require('../repositories/ProfesorRepository');

// Endpoint para mostrar todos los profesores
router.get('/', async (request, response) => {
  console.log('Entro aqui');
    const profesores = await queries.obtenerTodosLosProfesores();

     response.render('profesores/listado', {profesores}); // Mostramos el listado de profesores
});

// Endpoint para agregar un profesor
router.post('/agregar', async(request, response) => {
    
  const {idprofesor, nombre,apellido,fecha_nacimiento, profesion, genero, email } = request.body;
  const nuevoProfesor = { idprofesor, nombre, apellido, fecha_nacimiento,profesion,genero,email };

  const resultado = await queries.insertarProfesor(nuevoProfesor);

  response.redirect('/profesores');
});

// Endpoint que permite mostrar el formulario para agregar un nuevo profesor
router.get('/agregar', async(request, response) => {

    // Renderizamos el formulario
    response.render('profesores/agregar');
});




// Endpoint que permite editar un profesor
router.post('/editar/:id', async (request, response) => {
  const { id } = request.params;
  const {idprofesor,nombre,apellido,fecha_nacimiento,profesion,genero,email} = request.body;
  const datosModificados = {idprofesor,nombre,apellido,fecha_nacimiento,profesion,genero,email};

  const resultado = await queries.actualizarProfesor(id, datosModificados);

  if(resultado){
    console.log('Profesor modificado con exito');
    response.redirect('/profesores');
  }else{
    console.log('Error al modificar ');
    response.redirect('/profesores/editar/'+ idprofesor);
  }
});


// Endpoint para mostrar el formulario de edición
router.get('/editar/:idprofesor', async (request, response) => {
    
    
        const {idprofesor } = request.params;
        const profesor = await queries.obtenerProfesorPorid(idprofesor);

        if (profesor) {
          response.render('profesores/editar', { idprofesor, profesor });
        }else{
          response.redirect('/profesores')
        }
        
  

});


// Endpoint que permite eliminar un profesor
router.get('/eliminar/:idprofesor', async(request, response) => {
  // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idprofesor
  const { idprofesor } = request.params;
  const resultado = await queries.eliminarProfesor(idprofesor);
  if(resultado > 0){
      console.log('Eliminado con éxito');
  }
  response.redirect('/profesores');
});


module.exports = router;
