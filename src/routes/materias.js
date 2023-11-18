const express = require('express');
const router = express.Router();
const queries = require('../repositories/MateriaRepository');
const { isLoggedIn } = require('../lib/auth');
// Endpoint para mostrar todas las materias
router.get('/',  isLoggedIn, async (request, response) => {
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
router.post('/agregar', isLoggedIn,  async(request, response) => {
  // Falta agregar logica
  const { idmateria, materia } = request.body;
  const nuevaMateria = { idmateria , materia};

  const resultado = await queries.insertarMateria(nuevaMateria);

  if(resultado){
    request.flash('success', 'Registro insertado con exito');
    } else {
    request.flash('error', 'Ocurrio un problema al guardar el registro');
    }
  response.redirect('/materias');
});


// Endpoint para mostrar el formulario de edición
router.get('/editar/:idmateria',  isLoggedIn, async (request, response) => {
  
        const { idmateria } = request.params;
        const materia = await queries.obtenerMateriaPorid(idmateria);

        if (materia) {
          response.render('materias/editar',{idmateria,materia});
        }else{
          response.redirect('/materias');
        }

});

// Endpoint que permite editar una materia
router.post('/editar/:id', isLoggedIn,  async (request, response) => {
  const { id} = request.params;
  const {idmateria,materia} = request.body;
  const datosModificados = {idmateria,materia};

  const resultado = await queries.actualizarMateria(id, datosModificados);

  if(resultado){
    request.flash('success', 'Registro actualizado con exito');
    } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
    }
    response.redirect('/materias/editar/'+ idmateria);
  
});



// Endpoint que permite eliminar una materia
router.get('/eliminar/:idmateria',  isLoggedIn, async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idmateria
    const { idmateria } = request.params;
    const resultado = await queries.eliminarMateria(idmateria);
    if (resultado > 0) {
      request.flash('success', 'Registro eliminado con exito');
  } else {
      request.flash('error', 'Ocurrio un problema al eliminar el registro');
  }
    response.redirect('/materias');
});




module.exports = router;