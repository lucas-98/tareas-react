//este archivo me permite conectar a la base de datos
const mongoose = require('mongoose');

const  URI ='mongodb://localhost/tareas';

mongoose.connect(URI)
    .then(db => console.log('DB esta conectado'))
    .catch(error => console.log (error));

module.exports = mongoose;