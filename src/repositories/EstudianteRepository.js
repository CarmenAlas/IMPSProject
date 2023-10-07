const pool = require('../config/databaseController');

module.exports = {

    obtenerTodosLosEstudiantes: async () => {
        try {
            const result = await pool.query('SELECT * FROM estudiantes');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de estudiantes: ', error);
        }
    },

    // Eliminar un estudiante
    eliminarEstudiante: async (idestudiante) => {
        try {
            const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el registro', error);
        }
    },

    // Insertar un estudiante
    insertarEstudiante: async (nuevoEstudiante) => {
        try {
            const result = await pool.query("INSERT INTO estudiantes SET ? ", nuevoEstudiante);
            return result.insertId;

        } catch (error) {
            console.error('Error al eliminar el registro', error);
        }
    },

    // Modificar un estudiante por ID
     actualizarEstudiante: async (nuevosDatosEstudiante) => {
        try {
        const result = await pool.query(
          'UPDATE estudiantes SET nombre = ?, apellido = ?, email = ?, idcarrera = ?, usuario = ? WHERE idEstudiante = ?',
          [nuevosDatosEstudiante.nombre, nuevosDatosEstudiante.apellido, nuevosDatosEstudiante.email, nuevosDatosEstudiante.idcarrera, nuevosDatosEstudiante.usuario, nuevosDatosEstudiante.idestudiante]          
        );

        return result.affectedRows > 0;
        } catch (error) {
        console.error('Error al actualizar el registro', error);
        throw error;
        }
  }, 


  obtenerEstudiantePorId: async (idestudiante) => {
    try {
      const result = await pool.query('SELECT * FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
      if (result.length > 0) { 
        return result[0]; 
      } else {
        return null; 
      }
    } catch (error) {
      console.error('Error al obtener el registro', error);
      throw error; 
    }
  },

    
}
