const express = require('express');
const router = express.Router();
const estudianteRepository = require('../repositories/EstudianteRepository');


router.get('/', async (request,response) => {
    
    const lstEstudiantes = await estudianteRepository.obtenerTodosLosEstudiantes();
    console.log('Listado: ', lstEstudiantes);
 
    response.send('Bienvenido al laboratorio de IMPS');
});

module.exports = router;