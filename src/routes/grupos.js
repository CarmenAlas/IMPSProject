const express = require('express');
const router = express.Router();
const queries = require('../repositories/GrupoRepository');
const materiasQuery = require('../repositories/MateriaRepository');
const profesoresQuery = require('../repositories/ProfesorRepository');

// Endpoint para mostrar todos los grupos 
router.get('/', async (request, response) => {
  console.log('Entro aqui');
    const grupos = await queries.obtenerTodosLosGrupos();
    console.log('Salio aqui');

     response.render('grupos/listado', {grupos}); // Mostramos el listado de grupos
});

// Endpoint que permite mostrar el formulario para agregar un nuebo grupo
router.get('/agregar', async(request, response) => {

    const lstMaterias = await materiasQuery.obtenerTodasLasMaterias();
    const lstProfesores = await profesoresQuery.obtenerTodosLosProfesores();
  
    response.render('grupos/agregar',{lstMaterias,lstProfesores});
});


// Endpoint para agregar un grupo 
router.post('/agregar', async(request, response) => {
  // Falta agregar logica
  const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
  const nuevoGrupo = { num_grupo, anio, ciclo, idmateria, idprofesor };

  const resultado = await queries.insertarGrupo(nuevoGrupo);

  response.redirect('/grupos');
});


// Endpoint para mostrar el formulario de edición
router.get('/editar/:idgrupo', async (request, response) => {
  
  const { idgrupo} = request.params;
  const grupo = await queries.obtenerGrupoPorid(idgrupo);

  if(grupo){
    const lstMaterias = await materiasQuery.obtenerTodasLasMaterias();
    const lstProfesores = await profesoresQuery.obtenerTodosLosProfesores();
    response.render('grupos/editar',[lstMaterias,lstProfesores,idgrupo,grupo]);
  }else{
    response.redirect('/grupos');
  }


});

// Endpoint que permite editar un grupo
router.post('/editar/:id', async (request, response) => {
  const { id} = request.params;
  const {num_grupo, anio,ciclo, idmateria, idprofesor} = request.body;
  const datosModificados = {num_grupo, anio,ciclo, idmateria, idprofesor};

  const resultado = await queries.actualizarGrupo(id, datosModificados);

  if(resultado){
    console.log('Modificado con exito');
    response.redirect('/grupos');
  }else{
    console.log('Error al modificar ');
    response.redirect('/grupos/editar/'+ idgrupo);
  }
});

// Endpoint que permite eliminar un grupo
router.get('/eliminar/:idgrupo', async(request, response) => {
  // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
  const { idgrupo } = request.params;
  const resultado = await queries.eliminarGrupo(idgrupo);
  if(resultado > 0){
      console.log('Eliminado con éxito');
  }
  response.redirect('/grupos');
});


module.exports = router;
