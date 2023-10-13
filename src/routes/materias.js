const express = require('express');
const router = express.Router();
const queries = require('../repositories/MateriaRepository');

// Endpoint para mostrar todas las materias
router.get('/', async (request, response) => {
  console.log('Entro aqui');
    const materias = await queries.obtenerTodasLasMaterias();
    console.log('Salio aqui');

     response.render('materias/listado', {materias:materias}); // Mostramos el listado de materias
});

// Endpoint que permite mostrar el formulario para agregar una nueva materia
router.get('/agregar', async(request, response) => {

    response.render('materias/agregar');
});



// Endpoint para agregar una materia
router.post('/agregar', async(request, response) => {
  // Falta agregar logica
  const { idmateria, materia } = request.body;
  const nuevaMateria = { idmateria , materia};

  const resultado = await queries.insertarMateria(nuevaMateria);

  response.redirect('/materias');
});


// Endpoint para mostrar el formulario de edición
router.get('/editar/:idmateria', async (request, response) => {
  
        const { idmateria } = request.params;
        const materia = await queries.obtenerMateriaPorid(idmateria);

        if (materia) {
          response.render('materias/editar',{idmateria,materia});
        }else{
          response.redirect('/materias');
        }

});

// Endpoint que permite editar una materia
router.post('/editar/:id', async (request, response) => {
  const { id} = request.params;
  const {idmateria,materia} = request.body;
  const datosModificados = {idmateria,materia};

  const resultado = await queries.actualizarMateria(id, datosModificados);

  if(resultado){
    console.log('Materia modificada con exito');
    response.redirect('/materias');
  }else{
    console.log('Error al modificar materia');
    response.redirect('/materias/editar/'+ idmateria);
  }
});



// Endpoint que permite eliminar una materia
router.get('/eliminar/:idmateria', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idmateria
    const { idmateria } = request.params;
    const resultado = await queries.eliminarMateria(idmateria);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/materias');
});




module.exports = router;