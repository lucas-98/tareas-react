//este archivp permite diseñar el esquema de nuestros datos
const mongoose = require ('mongoose');
const  { Schema } = mongoose;

const TareaSchema = new Schema({
    titulo : { type: String, required: true},
    descripcion: {type: String, required: true}
});

module.exports = mongoose.model('tarea', TareaSchema);