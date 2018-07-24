// Este es el archivo de Express/Node js


const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require ('./database');

//configuracion
app.set('port', process.env.PORT || 3000 ) //confifuracuion del puerto, solo dice que tome el puerto de donde esta configurado



//middlewares(funciones que se ejecutan antes de que lleguen a las rutas )
app.use(morgan('dev') );
app.use(express.json());



//routes
app.use('/api/tareas' , require('./routes/tarea.routes'));

//archivos estaticos

 app.use(express.static(path.join(__dirname, 'public')))

//empezando el servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')} `);
});