const pool = require('../config/databaseController');

module.exports = {

    // Consulta para obtener todos las carreras
    obtenerTodosLasCarreras: async() => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de carreras: ', error);
        }
    },

    // Eliminar un estudiante
    eliminarCarrera: async(idCarrera) => {
        try{
          const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idCarrera]);
          return result.affectedRows > 0;
        }catch(error){
          console.error('Error al eliminar el registro', error);
        }
},

// Insertar un estudiante
insertarCarrera: async(nuevaCarrera) => {
    try{
      const result = await pool.query("INSERT INTO carreras SET ? ", nuevaCarrera);
      return result.insertId;

    }catch(error){
      console.error('Error al eliminar el registro', error);
    }
},


// Modificar un estudiante 
actualizarCarrera: async (nuevosDatosCarrera) => {
    try {
    const result = await pool.query(
      'UPDATE carreras SET carrera = ? WHERE idcarrera = ?',
      [nuevosDatosCarrera.carrera, nuevosDatosCarrera.idcarrera]          
    );

    return result.affectedRows > 0;
} catch (error) {
console.error('Error al actualizar el registro', error);
throw error;
   }
}, 

// Eliminar un estudiante
obtenerCarreraPorId: async (idcarrera) => {
    try {
      const result = await pool.query('SELECT * FROM carreras WHERE idcarrera = ?', [idcarrera]);
      if (result.length > 0) { 
        return result[0]; 
      }else{
        return null; 
      }
    } catch (error) {
      console.error('Error al obtener el registro', error);
      throw error; 
    }
  },
  
}
