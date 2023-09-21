const express = require('express');

const app = express();

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'),()=>{ console.log('Servidor iniciando en el puerto: ',app.get('port'));
});